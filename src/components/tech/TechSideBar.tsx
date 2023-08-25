import React from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

import SideBar from "../commonUI/SideBar";
import Button from "../designSystem/Button";
import { LoggedSideBar } from "../commonUI/LoggedSideBar";
import { NeighborArticleList } from "../commonUI/NeighborArticleList";
import { isLoggedInAtom } from "../provider/SettingsProvider";
import StickyStyle from "../commonUI/StickyStyle";

const TechSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <StickyStyle>
      {isLoggedIn ? (
        <div className="flex flex-col gap-[16px]">
          <Link href="/post/tech">
            <Button
              size="middleCreate"
              color="white"
              border
              className="rounded-[3px] w-[380px]"
            >
              + Create Article
            </Button>
          </Link>
          <LoggedSideBar type="tech" position="top" />
          <NeighborArticleList />
        </div>
      ) : (
        <SideBar />
      )}
    </StickyStyle>
  );
};

export default TechSideBar;
