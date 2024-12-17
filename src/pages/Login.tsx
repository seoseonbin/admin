import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../api/ApiCollection';
import ChangeThemes from '../components/ChangesThemes';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해 주세요.');
      return;
    }

    try {
      const response = await fetchLogin(username, password);

      if (response.status === 201) {
        // 로컬 스토리지에 username 저장
        localStorage.setItem('username', username);
        navigate('/profile');
      } else {
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>

        <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          <div className="w-24 xl:w-36 2xl:w-48">
            <img src="logo.png" alt="logo" />
          </div>

          <div className="w-full flex flex-col items-stretch gap-3">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <label className="input input-bordered min-w-full flex items-center gap-2">
              <input
                type="string"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="이름"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="비밀번호"
              />
            </label>

            <div onClick={handleLogin} className="btn btn-block btn-primary">
              로그인
            </div>

            <div className="divider text-sm">또는</div>
            <div className="flex justify-center font-semibold text-sm">
              <a href='/join'>회원가입</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
