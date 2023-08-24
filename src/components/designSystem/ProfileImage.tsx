import Image from "next/image";
import React from "react";
import { useSetRecoilState } from "recoil";

import { activeModalIdAtom } from "@/hooks/useModalController";

interface profileImage {
  idForModal: string | number;
  profileImage: string;
}

const ProfileImage: React.FC<profileImage> = ({ idForModal, profileImage }) => {
  const setActiveModalId = useSetRecoilState(activeModalIdAtom);

  return (
    <button
      className={`relative w-10 h-10`}
      data-testid={`profile_${idForModal}`}
      onClick={() => setActiveModalId(idForModal)}
    >
      <Image
        className="rounded-full object-cover"
        src={profileImage}
        fill
        sizes="80px"
        alt="프사"
      />
    </button>
  );
};

export default ProfileImage;
