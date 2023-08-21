"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";

import Button from "../designSystem/Button";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../modal/Modal";

const styles = {
  container: `relative overflow-y-auto w-[1100px] h-[62%] p-4 ${BORDER_COLOR.button}`,
  header: {
    wrapper: `flex justify-between items-center mb-2`,
    titleBox: `flex items-center`,
    titleLabel: `text-xl font-bold py-2 px-8 mr-[30px] ${BG_COLOR.inverse} ${TEXT_COLOR.inverse}`,
    title: `text-2xl font-bold`,
  },
  roomInfoBox: {
    wrapper: `flex justify-between h-[372px]`,
    imageDiv: `relative w-[660.5px] h-full`,
    aside: `flex flex-col justify-between w-[385px] h-full p-6 ${BG_COLOR.general02}`,
    timeInfo: `flex mt-5`,
  },
};

interface chatroom {
  data: {
    chatRoomId: number;
    userId: number;
    socketRoom: [];
    ChatList: [];
    title: string;
    content: string;
    thumbnail: string;
    like: number;
    myParticipationTime: string;
    discussionEndTime: string;
    remainingTime: string;
  };
}

const RoomContents: React.FC<{ chatRoomId: number }> = ({ chatRoomId }) => {
  const [topLeft, setTopLeft] = React.useState({ top: 0, left: 0 });
  const router = useRouter();
  const { modal, openModal, allCloseModal } = useModalController();
  const { data, isLoading } = useQuery<chatroom>({
    queryKey: ["chatRoom", chatRoomId],
    queryFn: () => axios.get(`/api/chatrooms/${chatRoomId}`),
  });

  const { getIcon } = useIcon();
  const like = getIcon("like", 18, 18);
  const more = getIcon("more", 5, 5);
  const defaultClose = getIcon("default_close", 18, 18);

  const moreOptionModalHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTopLeft({
      top: rect.top + 80,
      left: rect.left + 17,
    });
    openModal("discussionMore");
  };

  const discussionExitHandler = () => {
    allCloseModal();
    openModal("discussionExit");
  };

  if (isLoading)
    return (
      <section
        className={`flex justify-center items-center ${styles.container}`}
      >
        <LoadingSpinner />
      </section>
    );

  return (
    <section className={styles.container}>
      <header className={styles.header.wrapper}>
        <div className={styles.header.titleBox}>
          <div className={styles.header.titleLabel}>주제</div>
          <h1 className={styles.header.title}>{data?.data.title}</h1>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <button className="px-4" onClick={moreOptionModalHandler}>
            {more}
          </button>
          {modal.discussionMore && (
            <Modal topLeft={topLeft} nonBackdrop>
              <div className={`flex flex-col ${BORDER_COLOR.button}`}>
                <Link
                  className="text-center"
                  href={"/post/discussion"}
                  onClick={() => allCloseModal()}
                >
                  <Button
                    className={`w-full py-4 px-[30px]`}
                    size="tab"
                    color="white"
                  >
                    수정하기
                  </Button>
                </Link>
                <Button
                  className={`py-4 px-[30px]`}
                  size="tab"
                  color="white"
                  onClick={discussionExitHandler}
                >
                  토의 나가기
                </Button>
              </div>
            </Modal>
          )}
        </div>
      </header>
      <div className={styles.roomInfoBox.wrapper}>
        <figure className={styles.roomInfoBox.imageDiv}>
          <Image
            className="object-contain"
            src={data?.data.thumbnail ?? ""}
            alt="썸네일"
            fill
            sizes="660.5px"
          />
        </figure>
        <aside className={styles.roomInfoBox.aside}>
          <div>
            <Button size="withIcon" color="white" border rounded>
              <div>{like}</div>
              <span>{data?.data.like}</span>
            </Button>
          </div>
          <div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>나의 참가시간</strong>
              <span>{data?.data.myParticipationTime}</span>
            </div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>토의 종료 예정시간</strong>
              <span>{data?.data.discussionEndTime}</span>
            </div>
            <div className={styles.roomInfoBox.timeInfo}>
              <strong className={`mr-4`}>남은시간</strong>
              <span>{data?.data.remainingTime}</span>
            </div>
          </div>
        </aside>
      </div>
      <div className="flex mt-5">
        <div className="flex-shrink-0">
          <div className={`${styles.header.titleLabel}`}>내용</div>
        </div>
        <div
          className="no-tailwind"
          dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
        />
      </div>
      {modal.discussionExit && (
        <Modal isBgColor>
          <div
            className={`flex flex-col items-center w-[780px] h-[400px] ${BG_COLOR.general02}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="self-end m-6" onClick={() => allCloseModal()}>
              {defaultClose}
            </button>
            <h1 className="text-2xl font-bold mt-[34px]">
              이 토의에 대한 알림을 받으시겠습니까?
            </h1>
            <p className="mt-14">
              토의의 끝나는 내용을 공유받으실 수 있습니다.
            </p>
            <div className="flex gap-[105px] mt-[68px]">
              <Button
                className="w-[224px]"
                size="bigLogin"
                color="white"
                onClick={() => router.back()}
              >
                아니오
              </Button>
              <Button
                className="w-[224px]"
                size="bigLogin"
                color="white"
                onClick={() => router.back()}
              >
                예
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default RoomContents;
