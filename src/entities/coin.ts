import { Option, Some, None } from "excoptional";
import type * as CoinGecko from "coingecko-api";
import { Market } from "@entities";

export class Scorecard {
  readonly coin: Coin;

  constructor(coin: Coin) {
    this.coin = coin;
  }

  get sentiment(): number {
    return this.coin.sentimentScore;
  }

  get coingecko(): number {
    return this.coin.coingeckoScore;
  }

  get developer(): number {
    return this.coin.developerScore;
  }

  get community(): number {
    return this.coin.communityScore * 0.5;
  }

  get liquidity(): number {
    return this.coin.liquidityScore * 0.25;
  }

  get inflation(): number {
    const value =
      this.coin.marketCap() / this.coin.marketCap({ diluted: true });
    if (isFinite(value)) return value * 100;
    return 0;
  }

  get volume(): number {
    const value = this.coin.volume / this.coin.marketCap();
    if (isFinite(value)) return value * 100;
    return 0;
  }

  get dominance(): number {
    const value =
      this.coin.marketCap({ diluted: true }) / this.coin.market.totalMarketCap;
    console.log(value);
    if (isFinite(value)) return value * 100;
    return 0;
  }

  get overallScore(): number {
    return this.scores.reduce((acc, value) => (acc += value), 0);
  }

  get card(): any {
    return {
      sentiment: this.sentiment,
      coingecko: this.coingecko,
      developer: this.developer,
      community: this.community,
      liquidity: this.liquidity,
      inflation: this.inflation,
      volume: this.volume,
      dominance: this.dominance,
    };
  }

  get scores(): number[] {
    return [
      this.sentiment,
      this.coingecko,
      this.developer,
      this.community,
      this.liquidity,
      this.inflation,
      this.volume,
      this.dominance,
    ];
  }
}

export class Coin {
  readonly dto: CoinGecko.FetchResponse;
  readonly market: Market;
  readonly scorecard: Scorecard;

  constructor(market: Market, dto: CoinGecko.FetchResponse) {
    this.market = market;
    this.dto = dto;
    this.scorecard = new Scorecard(this);
  }

  marketCap({ diluted } = { diluted: false }): number {
    if (diluted) {
      return this.dto.market_data.fully_diluted_valuation?.usd ?? Infinity;
    } else {
      return this.dto.market_data.market_cap?.usd ?? this._estimatedMarketCap();
    }
  }

  get symbol(): string {
    return this.dto.symbol;
  }

  get name(): string {
    return this.dto.name;
  }

  get categories(): string[] {
    return this.dto.categories ?? [];
  }

  get homepage(): Option<string> {
    const value = this.dto.links.homepage?.[0];
    if (!value) return None();
    return Some(value);
  }

  get coingeckoScore(): number {
    return this.dto.coingecko_score ?? 0;
  }

  get sentimentScore(): number {
    return (
      this.dto.sentiment_votes_up_percentage -
      this.dto.sentiment_votes_down_percentage
    );
  }

  get developerScore(): number {
    return this.dto.developer_score ?? 0;
  }

  get communityScore(): number {
    return this.dto.community_score ?? 0;
  }

  get liquidityScore(): number {
    return this.dto.liquidity_score ?? 0;
  }

  get price(): number {
    return this.dto.market_data.current_price?.usd ?? 0;
  }

  get totalSupply(): number {
    return this.dto.market_data.total_supply ?? Infinity;
  }
  get circulatingSupply(): number {
    return this.dto.market_data.circulating_supply ?? Infinity;
  }

  get volume(): number {
    return this.dto.market_data.total_volume?.usd ?? 0;
  }

  private _estimatedMarketCap(): number {
    return Math.max(this.totalSupply, this.circulatingSupply) * this.price;
  }
}
