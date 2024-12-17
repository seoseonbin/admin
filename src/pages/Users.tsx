import React, { useState, useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchUsers } from '../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Users = () => {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allusers'],
    queryFn: fetchUsers,
  });

  const [usersData, setUsersData] = useState<any[]>([]); // 상태 추가하여 데이터 관리

  useEffect(() => {
    if (isSuccess) {
      setUsersData(data); // 성공적으로 데이터를 받아오면 상태에 저장
    }
  }, [isSuccess, data]);

  const handleRowDelete = (id: number) => {
    // 데이터에서 해당 ID를 제외한 새로운 리스트로 갱신
    const updatedData = usersData.filter((user: { id: number }) => user.id !== id);
    setUsersData(updatedData); // 상태 업데이트
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: '순번', width: 50 },
    {
      field: 'username',
      type: 'string',
      headerName: '이름',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'email',
      type: 'string',
      headerName: '이메일',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'is_blocked',
      type: 'string',
      headerName: '상태',
      minWidth: 100,
      flex: 1,
      valueFormatter: ({ value }) => (value ? '차단됨' : '활성'), // value가 true일 경우 '차단됨', false일 경우 '활성'
    },
  ];

  useEffect(() => {
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseUsers',
      });
    }
  }, [isError]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              사용자 목록
            </h2>
          </div>
        </div>
        {isLoading ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
            onRowDelete={handleRowDelete}
          />
        ) : isSuccess ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={usersData}
            includeActionColumn={true}
            onRowDelete={handleRowDelete}
          />
        ) : (
          <>
            <DataTable
              slug="users"
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

export default Users;
