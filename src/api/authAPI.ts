import { instance } from "./api";

const googleURI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
const kakaoURI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const githubURI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

export const authAPI = {
  // 로컬
  localSignup: (payload: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    return instance.post("/users", payload);
  },
  localLogin: (payload: { email: string; password: string }) => {
    return instance.post("/auth/login", payload);
  },
  emailConfirm: (email: string) => {
    return instance.get(`/users/email?value=${email}`);
  },
  nicknameConfirm: (nickname: string) => {
    return instance.get(`/users/nickname?value=${nickname}`);
  },

  // 소셜
  googleLogin: (code: string) => {
    return instance.post("/auth/google", { code, uri: googleURI });
  },
  githubLogin: (code: string | null) => {
    return instance.post("/auth/github", { code, uri: githubURI });
  },
  kakaoLogin: (code: string | null) => {
    return instance.post("/auth/kakao", { code, uri: kakaoURI });
  },

  userAuth: () => {
    return instance.get(`/users`);
  },
  updateNickname: (nickname: string) => {
    return instance.patch(`/users/name`, { nickname });
  },
  updateprofileImg: (profileImg: FormData) => {
    return instance.patch(`/users/image`, { profileImg });
  },
  isLogin: () => {
    return instance.get("/auth");
  },
};
