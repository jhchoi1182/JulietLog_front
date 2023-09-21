import { NextResponse } from "next/server";

export const GET = async () => {
  const posts: posts = [
    {
      postId: 1,
      title: "title",
      content: "content",
      categories: ["tags", "tåg2"],
      like: 1,
      count: 1,
      nickname: "hi",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      isBookmarked: true,
      createdAt: "2021-08-10T14:00:00.000Z",
    },
    {
      postId: 2,
      title: "title",
      content: "content",
      categories: ["tags"],
      like: 1,
      count: 1,
      nickname: "hi",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      isBookmarked: false,
      createdAt: "2021-08-10T14:00:00.000Z",
    },
    {
      postId: 3,
      title: "title",
      content: "content",
      categories: ["tags"],
      like: 1,
      count: 1,
      nickname: "hi",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      isBookmarked: true,
      createdAt: "2021-08-10T14:00:00.000Z",
    },
  ];
  return NextResponse.json({ posts });
};
