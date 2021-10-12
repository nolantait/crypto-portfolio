import React from "react";
import { Coin } from "@entities";
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
  const StringCell = (accesor: Accessor<string | number>) => (
    rowIndex: number
  ) => {
    const coin = coins[rowIndex];
    const value = accesor(coin);

    return <Cell>{value}</Cell>;
  };

  const DollarCell = (accesor: Accessor<string | number>) => (
    rowIndex: number
  ) => {
    const coin = coins[rowIndex];
    console.log(coin);
    const value = accesor(coin);
    const formatted = USD(value).format();

    return <Cell>{formatted}</Cell>;
  };

  const columns: Columns = {
    Name: StringCell((coin: Coin) => coin.name),
    Ticker: StringCell((coin: Coin) => coin.symbol),
    "Market Cap": DollarCell((coin: Coin) => coin.marketCap()),
    "Fully Diluted Market Cap": DollarCell((coin: Coin) =>
      coin.marketCap({ diluted: true })
    ),
  };

  const renderColumns = (columns: Columns) => {
    if (coins.length) {
      return Object.keys(columns).map((key) => {
        const renderer = columns[key];
        return <Column key={key} name={key} cellRenderer={renderer} />;
      });
    }
  };

  return <Table numRows={coins.length}>{renderColumns(columns)}</Table>;
};
