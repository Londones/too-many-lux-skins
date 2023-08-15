import { ChampionFetcherService } from "./champion-fetcher.service";

export class SkinFetcherService {
  public skinData: any;
  public champName: string = "";
  public champService: ChampionFetcherService;

  constructor(champService: ChampionFetcherService) {
    this.champService = champService;
  }

  private async fetchChampion(championName: string): Promise<any> {
    let json: Promise<any>;

    const promise = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${this.champService.version}/data/${this.champService.language}/champion/${championName}.json`
    );

    json = await promise.json();

    return json;
  }

  public async returnChampionObject(champion: string): Promise<Object> {
    return await this.fetchChampion(champion).then((data) => {
      return data.data[champion];
    });
  }

  public async returnChampionSkins(champion: string): Promise<Object> {
    return await this.fetchChampion(champion).then((data) => {
      this.skinData = data.data[champion].skins;
      this.champName = data.data[champion].name;
      return data.data[champion].skins;
    });
  }

  public skinNumToUrl(champion: string, skinNum: number): string {
    var skinUrl: string = "";
    try {
      skinUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_${skinNum}.jpg`;
    } catch (error) {
      console.log("Error: ");
    }
    return skinUrl;
  }
}
