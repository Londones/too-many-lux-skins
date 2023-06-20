export class SkinFetcherService {
  private language: string;
  private version: string;

  constructor(language: string, version: string) {
    this.language = language;
    this.version = version;
  }

  public async fetchChampion(championName: string): Promise<any> {
    let json: any;

    const promise = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/champion/${championName}.json`
    )
      .then(async (response) => (json = await response.json()))
      .catch((error) => console.log(error));

    return JSON.parse(json);
  }

  public returnChampionObject(champion: Promise<any>): any {
    const championObject = champion.then((champion) => champion.data);
    return championObject;
  }

  public fetchChampionSkins(championName: string): any {
    const championData = this.fetchChampion(championName);
  }
}
