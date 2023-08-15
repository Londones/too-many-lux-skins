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
      setSkins([]);
      const skins = await skinFetcher.returnChampionSkins(champion);
      setChampName(skinFetcher.champName);
      setSkins(skins);
    };

    if (champion) {
      setSkins([]);
      fetchSkins();
    }
  }, [champion]);

  const items: CarouselItem[] = skins.map((skin: any) => ({
    alt: `${skin.name === "default" ? champion : skin.name}`,
    image: skinFetcher.skinNumToUrl(champion, skin.num),
    content: (
      <div>
        <span>{skin.name === "default" ? champName : skin.name}</span>
      </div>
    ),
  }));

  const carouselRef = React.createRef<CarouselRef>();

  const spin = () => {
    const randomNum = Math.floor(Math.random() * skins.length); // 0 to skins.length - 1
    let counter = carouselRef.current?.getSelectedIndex();
    let roundsNumber = 3;
    let roundsCompleted = 0;
    let totalRounds = 5; // repeat the spin animation 5 times
    let delay = 500; // 1 second delay between each slide change
    let timeoutId: any;

    const spinAnimation = () => {
      carouselRef.current?.next();
      console.log(carouselRef.current?.getSelectedIndex());
      console.log("counter: ", counter);
      console.log("randomNum: ", randomNum);
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
  };

  return (
    <div>
      <Carousel
        ref={carouselRef}
        items={items}
        showControls={true}
        slideOnClick
      />
      <Button shape="round" icon={<SyncOutlined spin />} onClick={spin}>
        Spin
      </Button>
    </div>
  );
};

export default SkinCarousel;
