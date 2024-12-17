import React, { useState, useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchPosts, fetchUsers } from '../api/ApiCollection';

const Posts = () => {
  const [postData, setPostData] = useState<any[]>([]); // 상태로 관리
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allorders'],
    queryFn: fetchPosts,
  });

  // 전체 사용자 목록을 한 번만 가져오기
  const { data: usersData, isLoading: usersLoading, isError: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers, // 전체 사용자 목록 가져오기
  });

  // 각 user_id와 target_id에 해당하는 사용자 정보를 매칭하는 함수
  const getUserById = (id: string) => {
    if (!usersData) return null; // 사용자 데이터가 없으면 null 반환
    return usersData.find((user: { id: any }) => user.id === Number(id));
  };

  // 삭제 후 상태 갱신을 위한 함수
  const handleRowDelete = (id: number) => {
    // 데이터에서 해당 ID를 제외한 새로운 리스트로 갱신
    const updatedPosts = postData.filter((post: { id: number }) => post.id !== id);
    setPostData(updatedPosts);  // 상태 업데이트
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: '순번', minWidth: 50 },
    {
      field: 'user_id',
      headerName: '신고자',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const user = getUserById(params.row.user_id); // 신고자 정보 찾기
        return (
          <span className="mb-0 pb-0 leading-none">
            {user ? user.username : usersLoading ? 'Loading...' : 'Unknown'}
          </span>
        );
      },
    },
    {
      field: 'target_id',
      headerName: '피신고자',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const target = getUserById(params.row.target_id); // 피신고자 정보 찾기
        return (
          <div className="flex gap-3 relative items-center py-2">
            <div className="flex flex-col items-start gap-0">
              <div className="relative w-[300px] xl:w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-ellipsis whitespace-nowrap text-base font-medium dark:text-white">
                  {target ? target.username : usersLoading ? 'Loading...' : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      field: 'report_content',
      headerName: '신고 내용',
      minWidth: 400,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 relative items-center py-2">
            <div className="flex flex-col items-start gap-0">
              <div className="relative w-[300px] xl:w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-ellipsis whitespace-nowrap text-base font-medium dark:text-white">
                  {params.row.report_content}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  // 데이터가 성공적으로 로드되면 상태 갱신
  useEffect(() => {
    if (isSuccess && data) {
      setPostData(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promisePosts',
      });
    }
  }, [isError]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              신고 목록
            </h2>
          </div>
        </div>
        {isLoading || usersLoading ? (
          <DataTable
            slug="posts"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
            onRowDelete={handleRowDelete}
          />
        ) : isSuccess ? (
          <DataTable
            slug="posts"
            columns={columns}
            rows={postData}
            includeActionColumn={true}
            onRowDelete={handleRowDelete}
          />
        ) : (
          <>
            <DataTable
              slug="posts"
              columns={columns}
              rows={[]}
              includeActionColumn={true}
              onRowDelete={handleRowDelete}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
