export class ChampionFetcherService {
  public language: string;
  public version: string;
  private championsData: any;
  private assetCache: { [key: string]: string } = {};

  constructor(version: string, language?: string) {
    if (!language) {
      this.language = "en_US";
    } else {
      this.language = language;
    }
    this.version = version;
  }

  private async fetchChampionsData(language?: string): Promise<any> {
    if (!language) {
      this.language = "en_US";
    }
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/champion.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  }

  public async fetchChampionSquareAsset(champion: string): Promise<string> {
    var championImage = this.championsData[champion].image.full;
    const assetUrl = `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${championImage}`;
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
