import React from "react";

import getTime from "@/utils/util-getTime";

import Button from "../designSystem/Button";

const TimeOfLearning: React.FC<{ category: timeOfLearning }> = ({
  category,
}) => {
  const timeOfLearning = getTime(category.timespent);
  return (
    <div
      key={`mypage${category.category}`}
      className="category flex justify-between items-center gap-[16px] h-[60px] px-[16px] py-[8px] text-[16px]"
    >
      <Button
        size="myCategory"
        color="white"
        rounded
        border
        className="cursor-default"
      >
        # {category.category}
      </Button>
      <span>{timeOfLearning}</span>
    </div>
  );
};

export default TimeOfLearning;
