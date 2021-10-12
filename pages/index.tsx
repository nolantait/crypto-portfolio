import React from "react";
import { CoinGecko } from "@api";
import { NextPage } from "next";

import * as Components from "@components";
import { Coin, Market } from "@entities";

type Props = {
  market: CoinGecko.GlobalResponse;
  coins: CoinGecko.FetchResponse[];
};

const ids = [
  "bitcoin",
  "ethereum",
  "near",
  "glitch-protocol",
  "binancecoin",
  // "blank",
  "e-radix",
  "mirror-protocol",
  // "santiment-network-token",
  // "truefi",
  // "linear",
  // "pha",
  "nervos-network",
  // "ankr",
  // "skale",
  // "steem",
  // "kucoin-shares",
  // "status",
  "ftx-token",
  // "star-atlas",
  // "blockstack",
];

const Home: NextPage<Props> = ({ market, coins = [] }) => {
  const marketEntity = new Market(market.data);
  const entities = coins.map((coin) => new Coin(marketEntity, coin));

  return (
    <Components.Container>
      <Components.Header />
      <main>
        <Components.CoinTable coins={entities} />
      </main>
      <Components.Footer />
    </Components.Container>
  );
};

export async function getServerSideProps(_context): Promise<{ props: Props }> {
  const market = await CoinGecko.getMarket();
  const responses = ids.map(async (id) => await CoinGecko.getCoin(id));
  const coins = await Promise.all(responses).then((responses) => {
    return responses.filter(
      (response): response is CoinGecko.FetchResponse => response !== null
    );
  });

  return { props: { coins, market } };
}

export default Home;
