import React from "react";
import type { MutableSnapshot } from "recoil";
import { render } from "@testing-library/react";

import Provider from "@/components/provider/Provider";
import Header from "@/components/header/Header";
import { isLoggedInAtom } from "@/components/provider/SettingsProvider";
import MyPageCategory from "@/components/mypage/article/MyPageCategory";

const mockInitializeState =
  (isLoggedInValue: boolean) =>
  ({ set }: MutableSnapshot) => {
    set(isLoggedInAtom, isLoggedInValue);
  };

/**
 * 로그인 상태에 따른 레이아웃 렌더링
 * @example
 * renderLoggedInLayout(<HomePage />);
 */
interface option {
  withHeader?: boolean;
  mypage?: boolean;
}
export const renderLoggedInLayout = (
  component: React.JSX.Element,
  option?: option,
) => {
  render(
    <Provider initializeState={mockInitializeState(true)}>
      {(option?.withHeader || option?.mypage) && <Header />}
      {option?.mypage && <MyPageCategory />}
      {component}
    </Provider>,
  );
};
/**
 * 로그인 상태에 따른 레이아웃 렌더링
 * @example
 * renderLoggedInLayout(<HomePage />);
 */
export const renderLoggedOutLayout = (
  component: React.JSX.Element,
  option?: option,
) => {
  render(
    <Provider initializeState={mockInitializeState(false)}>
      {(option?.withHeader || option?.mypage) && <Header />}
      {option?.mypage && <MyPageCategory />}
      {component}
    </Provider>,
  );
};
