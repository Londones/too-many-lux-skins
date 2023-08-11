export class SkinFetcherService {
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

  public fetchChampionSkins(championName: string): any {
    const championData = this.fetchChampion(championName);
  }
}
