import React, { useEffect, useState } from "react";
import { SkinFetcherService } from "../services/skin-fetcher.service";
import { CarouselItem, Carousel, CarouselRef } from "react-round-carousel";
import { ChampionFetcherService } from "../services/champion-fetcher.service";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

interface SkinCarouselProps {
  champion: string;
  championFetcher: ChampionFetcherService;
}

const SkinCarousel: React.FC<SkinCarouselProps> = ({
  championFetcher,
  champion,
}) => {
  const skinFetcher = new SkinFetcherService(championFetcher);
  const [skins, setSkins] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [champName, setChampName] = useState<string>("");

  useEffect(() => {
    const fetchSkins = async () => {
      const skins = await skinFetcher.returnChampionSkins(champion);
      setChampName(skinFetcher.champName);
      setSkins(skins);
    };

    if (champion) {
      fetchSkins();
    }
  }, [champion]);

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
    let roundsCompleted = 0;
    let totalRounds = 10;
    let delay = 1;
    let timeoutId: any;

    const spinAnimation = () => {
      if (randomNum % 2 === 0) {
        carouselRef.current?.next();
      } else {
        carouselRef.current?.prev();
      }

      let currentCounter = counter ?? 0;
      currentCounter++;

      if (currentCounter === randomNum) {
        roundsCompleted++;
        currentCounter = 0;
      }

      if (roundsCompleted === totalRounds) {
        clearTimeout(timeoutId!);
      } else if (roundsNumber > 0) {
        timeoutId = setTimeout(spinAnimation, delay);
      }

      roundsNumber--;
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
    <div className={`mt-5`}>
      <Carousel
        ref={carouselRef}
        items={items}
        showControls={true}
        slideOnClick
      />
      <div className="flex justify-center">
        <Button
          className="flex items-center bg-white mt-3"
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
