import React from "react";

import Button from "@/components/designSystem/Button";
import useCreateComment from "@/hooks/commentAPI/useCreateComment";

const CreateCommentBtn: React.ComponentType<createComment> = ({
  postId,
  parentId,
  content,
}) => {
  const { mutate: onSubmitHandler } = useCreateComment({
    postId,
    parentId: parentId ?? null,
    content,
  });
  return (
    <Button
      size="commentCreate"
      color="black"
      className="mt-4 self-end"
      onClick={() => onSubmitHandler()}
    >
      작성완료
    </Button>
  );
};

export default CreateCommentBtn;
