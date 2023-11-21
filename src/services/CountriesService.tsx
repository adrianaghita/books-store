export interface Country {
  name: string;
}
export async function fetchCountries() {
  const response = await fetch(
    "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json"
  );

  if (!response.ok) {
    throw new Error("Could not fetch list of countries");
  }

  const countryList = await response.json();

  return countryList;
}
