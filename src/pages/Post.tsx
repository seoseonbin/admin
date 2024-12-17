import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchSinglePost, fetchUsers, fetchBlockUser } from '../api/ApiCollection';

const Post = () => {
  const { id } = useParams(); // URL에서 id 값 추출
  const [isBlocked, setIsBlocked] = useState(false); // 차단 상태 관리

  // 게시물 데이터 가져오기
  const { isLoading: postLoading, isError: postError, data: postData, isSuccess: postSuccess } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchSinglePost(id),  // 해당 id에 맞는 게시물 정보 요청
  });

  // 전체 사용자 목록을 한 번만 가져오기 (fetchUsers)
  const { data: usersData, isLoading: usersLoading, isError: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers, // 전체 사용자 목록 가져오기
  });

  // 신고자와 피신고자 이름을 찾는 함수
  const getUserById = (userId: any) => {
    if (!usersData) return null;
    return usersData.find((user: { id: any }) => user.id === Number(userId));
  };

  // 차단 처리 함수
  const blockUserMutation = useMutation({
    mutationFn: (targetId: any) => fetchBlockUser(targetId),
    onSuccess: () => {
      setIsBlocked(true); // 차단 완료 후 상태 업데이트
      toast.success('차단되었습니다.');
    },
    onError: () => {
      toast.error('차단 처리에 실패했습니다.');
    },
  });

  // 차단 버튼 클릭 시 처리
  const handleBlockClick = () => {
    if (postData && postData.target_id) {
      blockUserMutation.mutate(postData.target_id); // 피신고자 차단
    }
  };

  // 오류 처리
  React.useEffect(() => {
    if (postError || usersError) {
      toast.error('데이터를 가져오는 중 오류가 발생했습니다!', {
        id: 'promiseRead',
      });
    }
  }, [postError, usersError]);

  return (
    <div id="singlePost" className="w-full p-0 m-0">
      <div className="w-full gap-10 mt-5 xl:mt-0">
        {/* 피신고자 정보 표시 */}
        <div className="w-full flex items-center gap-3">
          <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
            <div className="avatar">
              {postLoading ? (
                <div className="w-24 xl:w-36 h-24 xl:h-36 rounded-full skeleton dark:bg-neutral"></div>
              ) : postSuccess ? (
                <div className="w-24 xl:w-36 rounded-full">
                  <img src="/Portrait_Placeholder.png" alt="avatar" />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-col items-start gap-1">
              {postLoading ? (
                <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
              ) : postSuccess ? (
                <h3 className="font-semibold text-xl xl:text-3xl dark:text-white">
                  {getUserById(postData.target_id)?.username || 'Unknown'}
                </h3>
              ) : (
                <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
              )}
              <span className="font-normal text-base">
                피신고자
              </span>
            </div>
            <button
              onClick={handleBlockClick}
              disabled={isBlocked}
              className={`btn ${isBlocked ? 'btn-disabled' : 'btn-danger'} btn-error`}
            >
              {isBlocked ? '차단됨' : '차단'}
            </button>
          </div>
        </div>
        <div className="divider text-sm"></div>
        {/* 게시물의 신고자 정보 표시 */}
        <div className="w-full flex gap-8">
          {postLoading || usersLoading ? (
            <div className="w-full xl:w-[50%] h-52 skeleton dark:bg-neutral"></div>
          ) : postSuccess ? (
            <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
              <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-5">
                <span>신고자</span>
                <span>신고 내용</span>
              </div>
              <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-5">
                {/* 신고자 이름 */}
                <span className="font-semibold">
                  {getUserById(postData.user_id)?.username || 'Unknown'}
                </span>
                {/* 신고 내용 */}
                <span className="font-semibold">
                  {postData.report_content || 'No report content available'}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full xl:w-[50%] h-52 skeleton dark:bg-neutral"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
