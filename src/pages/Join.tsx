import React, { useState } from 'react';
import ChangeThemes from '../components/ChangesThemes';
import { useNavigate } from 'react-router-dom';
import { fetchSignUp } from '../api/ApiCollection';

const Join = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 모든 정보가 채워졌는지 확인
    if (!username || !email || !phone || !password || !confirmPassword) {
      alert('모든 정보를 입력해 주세요.');
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 백엔드에 보낼 데이터 준비
    const data = {
      username,
      email,
      phone,
      password,
    };

    try {
      const response = await fetchSignUp(data);

      if (response.status === 201) {
        alert('회원가입 성공');
        navigate('/');
      } else {
        alert(`회원가입 실패: ${response.data.message}`);
      }
    } catch (error) {
      alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error(error);
    }
  };

  return (
    <div className="w-full p-0 m-0">
      {/* 화면 중앙에 회원가입 폼 배치 */}
      <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
        {/* 테마 변경 버튼 */}
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>
        
        {/* 회원가입 폼 */}
        <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          <div className="font-bold text-2xl text-base-content dark:text-neutral-200">
            회원가입
          </div>
          {/* 로그인 입력 폼 */}
          <div className="w-full flex flex-col items-stretch gap-3 justify-center">
            {/* row 1 */}
            <div className="w-full">
              <input
                type="string"
                placeholder="이름"
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full col-span-2 2xl:col-span-3"
              />
            </div>
            {/* row 2 */}
            <div className="w-full">
              <input
                type="string"
                placeholder="이메일"
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full col-span-2 2xl:col-span-3"
              />
            </div>
            {/* row 3 */}
            <div className="w-full">
              <input
                type="string"
                placeholder="전화번호"
                onChange={(e) => setPhone(e.target.value)}
                className="input input-bordered w-full col-span-2 2xl:col-span-3"
              />
            </div>
            {/* row 4 */}
            <div className="w-full">
              <input
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full col-span-2 2xl:col-span-3"
              />
            </div>
            {/* row 5 */}
            <div className="w-full">
              <input
                type="password"
                placeholder="비밀번호 확인"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full col-span-2 2xl:col-span-3"
              />
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <div
            onClick={handleSubmit}
            className="btn btn-block btn-primary"
          >
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
