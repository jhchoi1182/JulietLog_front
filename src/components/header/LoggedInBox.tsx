import React from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import useIcon from "@/hooks/useIcon";

import Button from "../designSystem/Button";
import { isLoggedInAtom } from "../provider/SettingsProvider";
import Toggle from "../designSystem/Toggle";

const LoggedInBox = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const { getIcon } = useIcon();
  const alarm = getIcon("alarm", 18, 22);
  const profile = getIcon("profile", 40, 40);

  const logoutHandler = async () => {
    try {
      await axios.post("/api/auth");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("logout error : ", error);
    }
  };

  return (
    <>
      <Toggle
        onSuccess={() => console.log("success")}
        onFail={() => console.log("fail")}
        option={{ dark: true }}
      />
      <li data-testid="logout">{alarm}</li>
      <li>
        <Link href="/mypage">{profile}</Link>
      </li>
      <li>
        <Button size="login" color="black" onClick={logoutHandler}>
          Log out
        </Button>
      </li>
    </>
  );
};

export default LoggedInBox;
