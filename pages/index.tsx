import React from "react";
import { CoinGecko } from "@api";
import { NextPage } from "next";

import * as Components from "@components";
import { Coin } from "@entities";

type Props = {
  coins: CoinGecko.FetchResponse[];
};

const ids = [
  "bitcoin",
  "ethereum",
  "near",
  "glitch-protocol",
  "blank",
  "e-radix",
  "mirror-protocol",
  "santiment-network-token",
  "truefi",
  "linear",
  "pha",
  "nervos-network",
  "ankr",
  "skale",
  "steem",
  "kucoin-shares",
  "status",
  "ftx-token",
  "star-atlas",
  "blockstack",
];

const Home: NextPage<Props> = ({ coins = [] }) => {
  const entities = coins.map((coin) => new Coin(coin));

  return (
    <Components.Container>
      <Components.Header />
      <Components.CoinTable coins={entities} />
      <Components.Footer />
    </Components.Container>
  );
};

export async function getServerSideProps(_context): Promise<{ props: Props }> {
  const responses = ids.map(async (id) => await CoinGecko.getCoin(id));
  const coins = await Promise.all(responses).then((responses) => {
    return responses.filter(
      (response): response is CoinGecko.FetchResponse => response !== null
    );
  });

  return { props: { coins } };
}

export default Home;
