import React, { useState, useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchProducts, fetchUsers } from '../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Products = () => {
  const [productsData, setProductsData] = useState<any[]>([]);
  const { isLoading, isError, isSuccess, data: products } = useQuery({
    queryKey: ['allproducts'],
    queryFn: fetchProducts,
  });

  const { data: users } = useQuery({
    queryKey: ['allusers'],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (isSuccess && products) {
      setProductsData(products);
    }
  }, [isSuccess, products]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: '순번', width: 70 },
    {
      field: 'user_id',
      headerName: '이름',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const user = users?.find((user: any) => user.id === params.value);
        return <span>{user?.username || 'Unknown'}</span>;
      }
    },
    {
      field: 'isbn',
      headerName: 'ISBN',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'price',
      headerName: '가격',
      width: 100,
    },
    {
      field: 'book_condition',
      headerName: '상태',
      width: 70,
    },
    {
      field: 'published_date',
      headerName: '등록 날짜',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'description',
      headerName: '설명',
      minWidth: 250,
      flex: 1,
      renderCell: (params) => {
        const maxLength = 15;
        const text = params.value || '';
        const truncatedText =
          text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
        return <span title={text}>{truncatedText}</span>;
      },
    },
  ];

  const handleRowDelete = (id: number) => {
    // 삭제된 제품을 제외한 새로운 데이터로 갱신
    const updatedProducts = productsData.filter((product) => product.id !== id);
    setProductsData(updatedProducts); // 상태 업데이트
  };

  useEffect(() => {
    if (isError) {
      toast.error('데이터를 가져오는 데 오류가 발생했습니다!', {
        id: 'promiseProducts',
      });
    }
  }, [isError]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              제품 목록
            </h2>
          </div>
        </div>

        {isLoading ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
            onRowDelete={handleRowDelete}
          />
        ) : isSuccess ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={productsData}
            includeActionColumn={true}
            onRowDelete={handleRowDelete}
          />
        ) : (
          <>
            <DataTable
              slug="products"
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

export default Products;
