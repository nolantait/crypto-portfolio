import React from "react";
import { Coin, Market } from "@entities";
import { View } from "@types";
import { Column, Table, Cell } from "@blueprintjs/table";
import currency from "currency.js";

type Props = {
  coins: Coin[];
};

type ColumnRenderer = (rowIndex: number) => React.ReactElement;
type Columns = {
  [name: string]: ColumnRenderer;
};
type Accessor<T> = (coin: Coin) => T;

const USD = (value: number | string) =>
  currency(value, { symbol: "$", precision: 2 });

export const CoinTable: View.Component<Props> = ({ coins }) => {
  console.log(coins);
  const BaseCell = (accesor: Accessor<string | number>) => (
    rowIndex: number
  ) => {
    const coin = coins[rowIndex];
    const value = accesor(coin);

    return <Cell wrapText={true}>{value}</Cell>;
  };

  const DollarCell = (accesor: Accessor<string | number>) => (
    rowIndex: number
  ) => {
    const coin = coins[rowIndex];
    console.log(coin);
    const value = accesor(coin);
    const formatted = USD(value).format();

    return <Cell className="text-right">{formatted}</Cell>;
  };

  const columns: Columns = {
    Name: BaseCell((coin: Coin) => coin.name),
    Ticker: BaseCell((coin: Coin) => coin.symbol),
    "Market Cap": DollarCell((coin: Coin) => coin.marketCap()),
    "Fully Diluted Market Cap": DollarCell((coin: Coin) =>
      coin.marketCap({ diluted: true })
    ),
    Score: BaseCell((coin: Coin) => coin.scorecard.overallScore),
    Allocation: BaseCell((coin: Coin) => {
      const value =
        100 *
        (coin.scorecard.overallScore /
          coins.reduce((acc, c) => (acc += c.scorecard.overallScore), 1));

      return value * 0.85;
    }),
  };

  const generatedColumns: Columns = {};
  for (const key in coins[0].scorecard.card) {
    generatedColumns[key] = BaseCell((coin: Coin) => coin.scorecard.card[key]);
  }

  const renderColumns = (columns: Columns) => {
    if (coins.length) {
      return Object.keys(columns).map((key) => {
        const renderer = columns[key];
        return <Column key={key} name={key} cellRenderer={renderer} />;
      });
    }
  };

  return (
    <Table className="bp3-dark" numRows={coins.length}>
      {renderColumns({ ...columns, ...generatedColumns })}
    </Table>
  );
};
