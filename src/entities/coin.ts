import { Option, Some, None } from "excoptional";
import type * as CoinGecko from "coingecko-api";

export type Scorecard = {
  sentiment: number;
  coingecko: number;
  developer: number;
  community: number;
  liquidity: number;
  publicInterest: number;
};

export class Coin {
  readonly dto: CoinGecko.FetchResponse;

  constructor(dto: CoinGecko.FetchResponse) {
    this.dto = dto;
  }

  marketCap({ diluted } = { diluted: false }): number {
    if (diluted) {
      return this.dto.market_data.fully_diluted_valuation?.usd ?? 0;
    } else {
      return this.dto.market_data.market_cap?.usd ?? 0;
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

  get scores(): Scorecard {
    return {
      sentiment:
        this.dto.sentiment_votes_up_percentage -
        this.dto.sentiment_votes_down_percentage,
      coingecko: this.dto.coingecko_score ?? 0,
      developer: this.dto.developer_score ?? 0,
      community: this.dto.community_score ?? 0,
      liquidity: this.dto.liquidity_score ?? 0,
      publicInterest: this.dto.public_interest_score ?? 0,
    };
  }
}
