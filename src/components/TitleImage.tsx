import React from "react";

interface TitleImageProps {
  localTime: number;
}

const TitleImage: React.FC<TitleImageProps> = ({ localTime }) => {
  return (
    <div className="flex justify-center mt-2">
      <img
        className="title titleImg w-[15rem]"
        src={
          localTime >= 6 && localTime < 23
            ? "img/TOO-MANY-LUX-SKINS-18-08-2023(1).png"
            : "img/TOO-MANY-LUX-SKINS-18-08-2023.png"
        }
        alt="Title"
      />
    </div>
  );
};

export default TitleImage;
