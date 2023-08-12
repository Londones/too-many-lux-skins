export class ChampionFetcherService {
  private language: string;
  private version: string;

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

  public async fetchChampionsName(): Promise<string[]> {
    const championsName: string[] = [];
    const championsData = await this.fetchChampionsData();
    for (const champion in championsData) {
      championsName.push(championsData[champion].name);
    }
    return championsName;
  }

  private async fetchChampionsData(): Promise<any> {
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/champion.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  }
}
