import { CoinGecko } from "@api";

export class Market {
  readonly dto: CoinGecko.GlobalResponse["data"];

  constructor(dto: CoinGecko.GlobalResponse["data"]) {
    this.dto = dto;
  }

  get totalMarketCap(): number {
    return this.dto.total_market_cap.usd;
  }

  get totalVolume(): number {
    return this.dto.total_volume.usd;
  }
}
