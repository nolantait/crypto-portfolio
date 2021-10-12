import CoinGecko from "coingecko-api";

const client = new CoinGecko();

export default function handler(req, res) {
  return client.coins
    .fetch("bitcoin")
    .then((response) => {
      const { data } = response;

      const marketInfo = data;

      res.status(200).json(marketInfo);
    })
    .catch((error) => res.status(500).json(error));
}
