import CoinGecko from "coingecko-api";
import type { NextApiRequest, NextApiResponse } from "next";
import type * as Gecko from "coingecko-api";

const client = new CoinGecko();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const { id } = req.query;

  client.coins
    .fetch(id)
    .then((response) => {
      const { data } = response;
      const marketInfo = data;

      res.status(200).json(marketInfo);
    })
    .catch((error) => res.status(500).json(error));
}
