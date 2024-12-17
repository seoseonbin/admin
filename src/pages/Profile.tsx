import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProfileData {
  username: string;
  email: string;
  phone: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('username'); // 로컬 스토리지에서 username 가져오기

        if (username) {
          const response = await axios.get(
            `http://noum.iptime.org:9000/admin/info?username=${username}`
          );
          setProfileData(response.data); // API에서 받은 프로필 데이터 저장
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []); // 빈 배열을 사용하여 컴포넌트가 마운트될 때만 실행

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-10 xl:gap-8">
        <div className="flex items-start justify-between">
          <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
            프로필
          </h2>
        </div>

        <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
          <div className="avatar">
            <div className="w-24 xl:w-36 2xl:w-48 rounded-full">
              <img
                src="/Portrait_Placeholder.png"
                alt="Profile"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="font-semibold text-xl xl:text-3xl">
              {profileData?.username || 'N/A'}
            </h3>
            <span className="font-normal text-base">관리자</span>
          </div>
        </div>

        <div className="w-full flex flex-col items-stretch gap-3 xl:gap-7">
          <div className="flex items-center w-full gap-3 xl:gap-5">
            <h4 className="font-semibold text-lg xl:text-2xl whitespace-nowrap">
              기본 정보
            </h4>
            <div className="w-full h-[2px] bg-base-300 dark:bg-slate-700 mt-1"></div>
          </div>

          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-5 xl:text-base">
            <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
              <div className="col-span-1 flex flex-col items-start xl:gap-5">
                <span>이름</span>
              </div>
              <div className="col-span-2 flex flex-col items-start xl:gap-5">
                <span className="font-semibold">{profileData?.username || 'N/A'}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
              <div className="col-span-1 flex flex-col items-start xl:gap-5">
                <span>이메일</span>
                <span>전화번호</span>
              </div>
              <div className="col-span-2 flex flex-col items-start xl:gap-5">
                <span className="font-semibold">{profileData?.email || 'N/A'}</span>
                <span className="font-semibold">{profileData?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
