export async function fetchLanguages(): Promise<string[]> {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/languages.json"
  );
  const json = await response.json();
  return json;
}
