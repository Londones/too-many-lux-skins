export async function fetchVersion(): Promise<string> {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const json = await response.json();
  return json[0];
}
