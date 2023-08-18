import React from "react";

interface TitleImageProps {
  localTime: number;
}

const TitleImage: React.FC<TitleImageProps> = ({ localTime }) => {
  return (
    <div className="flex justify-center">
      <div
        className={
          localTime >= 6 && localTime < 22
            ? "flex justify-center titleImg title day"
            : "flex justify-center titleImg title night"
        }
      ></div>
    </div>
  );
};

export default TitleImage;
