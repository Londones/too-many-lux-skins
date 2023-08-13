export class ChampionFetcherService {
  private language: string;
  private version: string;
  private championsData: any;
  private assetCache: { [key: string]: string } = {};

  constructor(language: string, version: string) {
    this.language = language;
    this.version = version;
  }

  public async fetchChampion(championName: string): Promise<any> {
    let json: Promise<any>;

    const promise = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/champion/${championName}.json`
    );

    json = await promise.json();

    return json;
  }

  public async returnChampionObject(champion: string): Promise<Object> {
    return await this.fetchChampion(champion).then((data) => {
      return data.data[champion];
    });
  }

  private async fetchChampionsName(): Promise<string[]> {
    const championsName: string[] = [];
    this.championsData = await this.fetchChampionsData();
    for (const champion in this.championsData) {
      championsName.push(this.championsData[champion].name);
    }
    return championsName;
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
    let championName = champion;
    var championStringNoSpaces = championName.replace(/\s/g, "");
    championStringNoSpaces = championStringNoSpaces.replace(/['’]/g, "");
    const cachedAssetUrl = this.assetCache[championStringNoSpaces];
    if (cachedAssetUrl) {
      return cachedAssetUrl;
    }
    if (!championName.includes(" ")) {
      championStringNoSpaces =
        championStringNoSpaces.charAt(0).toUpperCase() +
        championStringNoSpaces.slice(1).toLowerCase();
    } else if (champion.includes("Nunu")) {
      championStringNoSpaces = "Nunu";
    }
    const assetUrl = `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${championStringNoSpaces}.png`;
    this.assetCache[championStringNoSpaces] = assetUrl;
    return assetUrl;
  }

  // make a funtion that returns an object with the champuion name and the champion square asset
  public async fetchChampionsSquareAsset(): Promise<
    { championName: string; squareAsset: string }[]
  > {
    const championsSquareAsset: {
      championName: string;
      squareAsset: string;
    }[] = [];
    const championsName = await this.fetchChampionsName();
    for (const champion of championsName) {
      const squareAsset = await this.fetchChampionSquareAsset(champion);
      championsSquareAsset.push({ championName: champion, squareAsset });
    }
    return championsSquareAsset;
  }
}
