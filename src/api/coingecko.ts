import CoinGecko from "coingecko-api";
import type * as Gecko from "coingecko-api";

export type FetchResponse = Gecko.FetchResponse;
export type GlobalResponse = Gecko.GlobalResponse;
export type FetchError = { error: string };
export const client = new CoinGecko();

export const getCoin = async (
  id: string
): Promise<Gecko.FetchResponse | null> => {
  return client.coins.fetch(id).then((response): FetchResponse | null => {
    const { data } = response;
    if (data.error) {
      return null;
    }
    return data;
  });
};

export const getMarket = async (): Promise<Gecko.GlobalResponse> => {
  const response = await client.global();
  return response.data;
};
