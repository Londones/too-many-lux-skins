import { fetchVersion } from "./lastestversion-fetcher.service";

export class ChampionFetcherService {
  public language: string;
  public version: string;
  private championsData: any;
  private assetCache: { [key: string]: string } = {};
  private static latestVersionPromise: Promise<string> | null = null;

  constructor(language: string = "en_US", version?: string) {
    this.language = language;
    this.version = version ?? "";
  }

  private async resolveVersion(): Promise<string> {
    if (this.version) {
      return this.version;
    }

    if (!ChampionFetcherService.latestVersionPromise) {
      ChampionFetcherService.latestVersionPromise = fetchVersion();
    }

    this.version = await ChampionFetcherService.latestVersionPromise;
    return this.version;
  }

  public async getVersion(): Promise<string> {
    return this.resolveVersion();
  }

  private async fetchChampionsData(): Promise<any> {
    const version = await this.resolveVersion();
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${this.language}/champion.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  }

  public async fetchChampionSquareAsset(champion: string): Promise<string> {
    const version = await this.resolveVersion();
    var championImage = this.championsData[champion].image.full;
    const assetUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championImage}`;
    this.assetCache[championImage] = assetUrl;
    return assetUrl;
  }

  public async fetchChampionsSquareAsset(): Promise<
    { championName: string; squareAsset: string; id: string }[]
  > {
    this.championsData = await this.fetchChampionsData();
    const championsSquareAsset: {
      championName: string;
      squareAsset: string;
      id: string;
    }[] = [];
    for (const champion in this.championsData) {
      const squareAsset = await this.fetchChampionSquareAsset(champion);
      championsSquareAsset.push({
        championName: this.championsData[champion].name,
        squareAsset,
        id: this.championsData[champion].id,
      });
    }
    return championsSquareAsset;
  }
}
