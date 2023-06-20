export async function fetchLanguages(): Promise<JSON> {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/languages.json"
  );
  const json = await response.json();
  return json;
}
