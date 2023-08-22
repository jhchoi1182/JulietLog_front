"use client";
import type { ChangeEvent } from "react";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import Label from "@/components/commonUI/Label";

const MyInfo = () => {
  const [profileImg, setProfileImg] = React.useState<string>("");
  const [newProfileImg, setNewProfileImg] = React.useState<string>("");
  const imgRef = React.useRef<HTMLInputElement>(null);

  const onChangeImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgSrc = e.target.files && e.target.files[0];
    if (!imgSrc) return;
    const reader = new FileReader();
    reader.readAsDataURL(imgSrc);
    reader.onloadend = () => {
      setNewProfileImg(reader.result as string);
    };
  };
  const removeImgHandler = () => {
    setNewProfileImg("");
    setProfileImg("");
  };
  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => await axios.get("/api/users"),
    onSuccess: (res) => {
      setProfileImg(res.data.profileImg);
    },
  });
  const userInfo = data?.data as myInfo;
  return (
    <React.Fragment>
      <div className="flex flex-col items-center gap-[40px] w-[350px] px-[40px] py-[70px]">
        <Image
          src={newProfileImg !== "" ? newProfileImg : profileImg}
          alt="프로필사진"
          width={200}
          height={200}
          className="h-[200px] !important"
          layout="fixed"
          objectFit="cover"
        />
        <div className="flex items-center gap-[20px]">
          <div className="h-full relative">
            <Label htmlFor="profileImg">이미지 수정</Label>
            <div className="absolute w-[120px] h-full -z-10 top-0 left-0 overflow-hidden opacity-0">
              <input
                id="profileImg"
                type="file"
                onChange={onChangeImgHandler}
                ref={imgRef}
              />
            </div>
          </div>
          <Button size="button" color="white" border onClick={removeImgHandler}>
            이미지 제거
          </Button>
        </div>
      </div>
      <div className="h-[280px] flex flex-col gap-[38px]">
        <div className="flex flex-col gap-[14px]">
          <h1 className={`${TEXT_COLOR.primary} text-[24px] font-bold`}>
            닉네임
          </h1>
          <div className={`flex ${TEXT_COLOR.primary}`}>
            <input
              placeholder={userInfo?.nickname}
              className={`w-[200px] bg-inherit py-[12px] ${BORDER_COLOR.containerBottom}`}
            />
            <Button
              size="button"
              color="white"
              border
              onClick={removeImgHandler}
            >
              수정
            </Button>
          </div>
        </div>
        <div>
          <h1 className={`${TEXT_COLOR.general07rev} mb-[10px]`}>
            *회원 탈퇴 ( 회원 탈퇴 시 모든 데이터는 삭제되어 복구 되지
            않습니다.)
          </h1>
          <Button size="button" color="white" border onClick={removeImgHandler}>
            회원탈퇴
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyInfo;
