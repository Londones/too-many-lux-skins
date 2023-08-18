import React, { useEffect, useState } from "react";
import { SkinFetcherService } from "../services/skin-fetcher.service";
import { CarouselItem, Carousel, CarouselRef } from "react-round-carousel";
import { ChampionFetcherService } from "../services/champion-fetcher.service";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

interface SkinCarouselProps {
  champion: string;
  championFetcher: ChampionFetcherService;
  className?: string;
}

const SkinCarousel: React.FC<SkinCarouselProps> = ({
  championFetcher,
  champion,
  className,
}) => {
  const skinFetcher = new SkinFetcherService(championFetcher);
  const [skins, setSkins] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [champName, setChampName] = useState<string>("");
  const [carouselClass, setCarouselClass] = useState<string>("");

  useEffect(() => {
    const fetchSkins = async () => {
      const skins = await skinFetcher.returnChampionSkins(champion);
      setChampName(skinFetcher.champName);
      setSkins(skins);
    };

    if (champion) {
      fetchSkins();
    }
  }, [champion, championFetcher]);

  useEffect(() => {
    const setClass = () => {
      setCarouselClass(className!);
    };

    if (!champion) {
      console.log("no champion");
      setClass();
    }
  }, [className, champion]);

  const items: CarouselItem[] = skins.map((skin: any, index: number) => ({
    alt: `${skin.name === "default" ? champion : skin.name}`,
    image: skinFetcher.skinNumToUrl(champion, skin.num),
    content: (
      <div className={champion + index}>
        <span>{skin.name === "default" ? champName : skin.name}</span>
      </div>
    ),
  }));

  const carouselRef = React.createRef<CarouselRef>();

  const spin = () => {
    const randomNum = Math.floor(Math.random() * skins.length);
    let counter = 0;
    let roundsNumber = 300 + randomNum;
    let delay = 1;
    let timeoutId: any;

    const spinAnimation = () => {
      if (randomNum % 2 === 0) {
        carouselRef.current?.next();
      } else {
        carouselRef.current?.prev();
      }

      counter++;

      // delay increases by 1 every 10 rounds
      if (counter % 100 === 0) {
        delay *= 2;
      }

      if (counter === roundsNumber) {
        clearTimeout(timeoutId!);
      } else {
        timeoutId = setTimeout(spinAnimation, delay);
      }
    };

    timeoutId = setTimeout(spinAnimation, delay);
    setTimeout(animateWinner, 2500);
  };

  const animateWinner = () => {
    const winningSpan = carouselRef.current?.getSelectedIndex();
    /*const winner = winningSpan?.closest(".carousel__slide");
    winner?.classList.add("winner");
    // remove winner class after 3 seconds
    setTimeout(() => {
      winner?.classList.remove("winner");
    }, 3000);*/
  };

  return (
    <div className={`${carouselClass} mt-5`}>
      <Carousel
        ref={carouselRef}
        items={items}
        showControls={true}
        slideOnClick
      />
      <div className="flex justify-center">
        <Button
          className="flex items-center bg-white my-3"
          shape="round"
          icon={<SyncOutlined spin />}
          onClick={spin}
          size="large"
          ghost={false}
        >
          Spin!
        </Button>
      </div>
    </div>
  );
};

export default SkinCarousel;
