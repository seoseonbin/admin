import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineEye,
  HiOutlineTrash,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { fetchDeleteUser, fetchDeleteProduct, fetchDeletePost } from '../api/ApiCollection'; // API 호출 함수 임포트

interface DataTableProps {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  includeActionColumn: boolean;
  onRowDelete: (id: number) => void; // 삭제 후 상태 갱신을 위한 콜백 함수
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  slug,
  includeActionColumn,
  onRowDelete, // 부모 컴포넌트로부터 받은 삭제 후 상태 갱신 함수
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    // 삭제 확인 메시지 표시
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirmDelete) return; // 사용자가 취소를 선택하면 종료

    try {
      // slug에 따라 삭제할 API를 다르게 호출
      if (slug === 'users') {
        await fetchDeleteUser(id); // 사용자 삭제
      } else if (slug === 'products') {
        await fetchDeleteProduct(id); // 제품 삭제
      } else if (slug === 'posts') {
        await fetchDeletePost(id); // 게시물 삭제
      }
      onRowDelete(id); // 삭제 후 테이블 갱신
      toast.success('삭제되었습니다.'); // 성공 메시지 표시
    } catch (error) {
      console.error('삭제 실패:', error);
      toast.error('삭제 실패');
    }
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: '',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex items-center">
          <button
            onClick={() => {
              navigate(`/${slug}/${params.row.id}`);
            }}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineEye />
          </button>
          <button
            onClick={() => {
              handleDelete(params.row.id); // 삭제 함수 호출
            }}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineTrash />
          </button>
        </div>
      );
    },
  };

  if (includeActionColumn === true) {
    return (
      <div className="w-full bg-base-100 text-base-content">
        <DataGrid
          className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
          rows={rows}
          columns={[...columns, actionColumn]}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    );
  } else {
    return (
      <div className="w-full bg-base-100 text-base-content">
        <DataGrid
          className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
          rows={rows}
          columns={[...columns]}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    );
  }
};

export default DataTable;
