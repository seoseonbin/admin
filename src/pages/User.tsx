import React from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleUser } from '../api/ApiCollection';

const User = () => {
  const { id } = useParams();  // URL에서 id 값 추출

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchSingleUser(id),  // 해당 id에 맞는 사용자 정보 요청
  });

  React.useEffect(() => {
    if (isError) {
      toast.error('사용자 데이터를 가져오는 중 오류가 발생했습니다!', {
        id: 'promiseRead',
      });
    }
  }, [isError]);

  return (
    <div id="singleUser" className="w-full p-0 m-0">
      <div className="w-full gap-10 mt-5 xl:mt-0">
        {/* 사용자 정보 표시 */}
        <div className="w-full flex items-center gap-3">
          <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
            <div className="avatar">
              {isLoading ? (
                <div className="w-24 xl:w-36 h-24 xl:h-36 rounded-full skeleton dark:bg-neutral"></div>
              ) : isSuccess ? (
                <div className="w-24 xl:w-36 rounded-full">
                  <img src="/Portrait_Placeholder.png" alt="avatar" />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-col items-start gap-1">
              {isLoading ? (
                <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
              ) : isSuccess ? (
                <h3 className="font-semibold text-xl xl:text-3xl dark:text-white">
                  {data.username}  {/* 사용자 이름 표시 */}
                </h3>
              ) : (
                <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
              )}
              <span className="font-normal text-base">
                사용자
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-8">
          {isLoading ? (
            <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
          ) : isSuccess ? (
            <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
              <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-5">
                <span>이름</span>
                <span>이메일</span>
                <span>상태</span>
              </div>
              <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-5">
                <span className="font-semibold">
                  {data.username}  {/* 사용자 이름 */}
                </span>
                <span className="font-semibold">
                  {data.email}  {/* 사용자 이메일 */}
                </span>
                <span className="font-semibold">
                  {data.is_blocked ? '차단됨' : '활성'}  {/* 사용자 상태 */}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
