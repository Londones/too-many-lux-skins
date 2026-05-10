import { ChampionFetcherService } from "./champion-fetcher.service";

export interface ChampionSkinEntry {
  name: string;
  num: number;
  imageNum: number;
  isChroma: boolean;
  parentSkinNum?: number;
  parentSkinName?: string;
}

export class SkinFetcherService {
  public skinData: any;
  public champName: string = "";
  public champService: ChampionFetcherService;

  constructor(champService: ChampionFetcherService) {
    this.champService = champService;
  }

  private async fetchChampion(championName: string): Promise<any> {
    let json: Promise<any>;
    const version = await this.champService.getVersion();

    const promise = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/${this.champService.language}/champion/${championName}.json`
    );

    json = await promise.json();

    return json;
  }

  public async returnChampionObject(champion: string): Promise<Object> {
    return await this.fetchChampion(champion).then((data) => {
      return data.data[champion];
    });
  }

  public async returnChampionSkins(
    champion: string,
    includeChromas: boolean = true
  ): Promise<ChampionSkinEntry[]> {
    return await this.fetchChampion(champion).then((data) => {
      const rawSkins = data.data[champion].skins;
      this.skinData = rawSkins;
      this.champName = data.data[champion].name;

      const baseSkinByNum = new Map<number, any>();
      rawSkins.forEach((skin: any) => {
        if (skin.parentSkin === undefined || skin.parentSkin === null) {
          baseSkinByNum.set(skin.num, skin);
        }
      });

      const normalizedSkins: ChampionSkinEntry[] = rawSkins
        .filter(
          (skin: any) =>
            includeChromas || skin.parentSkin === undefined || skin.parentSkin === null
        )
        .map((skin: any) => {
          const isChroma = skin.parentSkin !== undefined && skin.parentSkin !== null;
          const parentSkin = isChroma ? baseSkinByNum.get(Number(skin.parentSkin)) : undefined;

          return {
          name: skin.name,
          num: skin.num,
          imageNum: isChroma && parentSkin ? Number(parentSkin.num) : skin.num,
          isChroma,
          parentSkinNum: isChroma ? Number(skin.parentSkin) : undefined,
          parentSkinName: isChroma && parentSkin ? parentSkin.name : undefined,
        };
      });

      return normalizedSkins;
    });
  }

  public skinNumToUrl(champion: string, skinNum: number): string {
    var skinUrl: string = "";
    try {
      skinUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_${skinNum}.jpg`;
    } catch (error) {
      console.log("Error: ");
    }
    return skinUrl;
  }
}
