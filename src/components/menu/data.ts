import {
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineDocumentChartBar,
  HiOutlinePencilSquare,
  HiOutlineArrowLeftOnRectangle,
} from 'react-icons/hi2';

export const menu = [
  {
    catalog: 'menu',
    listItems: [
      {
        isLink: true,
        url: '/users',
        icon: HiOutlineUsers,
        label: '사용자 관리',
      },
      {
        isLink: true,
        url: '/products',
        icon: HiOutlineCube,
        label: '제품 관리',
      },
      {
        isLink: true,
        url: '/posts',
        icon: HiOutlineDocumentChartBar,
        label: '신고 관리',
      },
      {
        isLink: true,
        url: '/notices',
        icon: HiOutlinePencilSquare,
        label: '공지사항',
      },
    ],
  },
  {
    catalog: 'extra',
    listItems: [
      {
        isLink: true,
        url: '/',
        icon: HiOutlineArrowLeftOnRectangle,
        label: '로그아웃',
      },
    ],
  },
];
