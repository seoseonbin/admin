import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="font-bold text-7xl">
            잘못된 접근입니다
          </h1>
          <button onClick={() => navigate('/profile')} className="btn">
            <HiOutlineHome className="xl:text-2xl" />
            <span>홈으로 돌아가기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
