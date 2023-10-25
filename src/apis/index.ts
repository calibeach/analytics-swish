import { MarketType, LineType } from "../types";

export async function fetchMarkets(): Promise<MarketType[]> {
  const uri = "http://localhost:3000/markets/";
  try {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function fetchLines(): Promise<LineType[]> {
  const uri = "http://localhost:4000/lines/";
  try {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
