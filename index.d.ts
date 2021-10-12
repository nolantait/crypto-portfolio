declare module "coingecko-api" {
  export type CoinID = string;
  export type CoinSymbol = string;
  export type ContractAddress = string;
  export type Timestamp = string;
  export type NumberAsString = string;
  export type Currency = string;
  export type StatusUpdateProjectType = "coin" | "market";
  export type EventType = "Event" | "Conference" | "Meetup";
  export type StatusUpdateCategory =
    | "general"
    | "milestone"
    | "partnership"
    | "exchange_listing"
    | "software_release"
    | "fund_movement"
    | "new_listings"
    | "event";
  export type Order =
    | "gecko_asc"
    | "gecko_desc"
    | "market_cap_asc"
    | "market_cap_desc"
    | "volume_asc"
    | "volume_desc"
    | "coin_name_asc"
    | "coin_name_desc"
    | "price_asc"
    | "price_desc"
    | "h24_change_asc"
    | "h24_change_desc"
    | "trust_score_desc"
    | "name_asc"
    | "name_desc"
    | "open_interest_btc_asc"
    | "open_interest_btc_desc"
    | "trade_volume_24h_btc_asc"
    | "trade_volume_24h_btc_desc";
  export type MarketParams = {
    order: string;
    per_page: number;
    page: number;
    localization: boolean;
    sparkline: boolean;
    vs_currency: Currency;
    ids: string | string[];
  };
  export type AllParams = {
    order: string;
    per_page: number;
    page: number;
    localization: boolean;
    sparkline: boolean;
  };
  export type FetchParams = {
    coinId: CoinID;
    params: {
      tickers: boolean;
      market_data: boolean;
      community_data: boolean;
      developer_data: boolean;
      localization: boolean;
      sparkline: boolean;
    };
  };
  export type FetchTickersParams = {
    coinId: CoinID;
    params: {
      page: number;
      exchange_ids: string | string[];
      order: Order;
    };
  };
  export type FetchHistoryParams = {
    coinId: CoinID;
    params: {
      date: string;
      localization: boolean;
    };
  };
  export type FetchMarketChartParams = {
    coinId: CoinID;
    params: {
      days: NumberAsString;
      vs_currency: Currency;
    };
  };
  export type FetchMarketChartRangeParams = {
    coinId: CoinID;
    params: {
      vs_currency: Currency;
      from: Timestamp;
      to: Timestamp;
    };
  };
  export type FetchStatusUpdatesParams = {
    coinId: CoinID;
    params: {
      per_page: number;
      page: number;
    };
  };
  export type FetchCoinContractInfoParams = {
    contractAddress: ContractAddress;
    assetPlatform: "ethereum";
  };
  export type FetchCoinContractMarketChartParams = {
    contractAddress: ContractAddress;
    assetPlatform: "ethereum";
    params: {
      vs_currency: Currency;
      days: NumberAsString;
    };
  };
  export type FetchCoinContractMarketChartParams = {
    contractAddress: ContractAddress;
    assetPlatform: "ethereum";
    params: {
      vs_currency: Currency;
      from: Timestamp;
      to: Timestamp;
    };
  };

  export default class CoinGecko {
    ping: () => Promise<Response>;
    global: () => Promise<Response>;
    coins: {
      all: (AllParams) => Promise<Response>;
      list: () => Promise<Response>;
      markets: (MarketParams) => Promise<Response>;
      fetch: (FetchParams) => Promise<Response<FetchResponse>>;
      fetchTickers: (FetchTickersParams) => Promise<Response>;
      fetchHistory: (FetchHistoryParams) => Promise<Response>;
      fetchMarketChart: (FetchMarketChartParams) => Promise<Response>;
      fetchMarketChartRange: (FetchMarketChartRangeParams) => Promise<Response>;
      fetchStatusUpdates: (FetchStatusUpdatesParams) => Promise<Response>;
      fetchCoinContractInfo: (FetchCoinContractInfoParams) => Promise<Response>;
      fetchCoinContractMarketChart: (
        FetchCoinContractMarketChartParams
      ) => Promise<Response>;
      fetchCoinContractMarketChartRange: (
        FetchCoinContractMarketChartRangeParams
      ) => Promise<Response>;
    };
  }

  export type HashingAlgorithm = "SHA-256";
  export type Platform = unknown;
  export type Url = string;
  export type Category = string;

  export type BaseResponse = any;
  export type FetchResponse = {
    id: CoinID;
    symbol: CoinSymbol;
    name: string;
    asset_platform_id?: "ethereum";
    platforms: Platform[];
    block_time_in_minutes?: number;
    hashing_algorithm?: HashingAlgorithm;
    categories?: Category[];
    public_notice: null;
    additional_notices: [];
    localization: {
      [locale: string]: string;
    };
    description: {
      [locale: string]: string;
    };
    links: {
      [key: string]: Url | Url[];
    };
    image?: {
      thumb?: Url;
      small?: Url;
      large?: Url;
    };
    country_origin: string;
    genesis_date: string;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    market_cap_rank?: number;
    coingecko_rank?: number;
    coingecko_score?: number;
    developer_score?: number;
    community_score?: number;
    liquidity_score?: number;
    public_interest_score?: number;
    market_data: MarketData;
    community_data: CommunityData;
    developer_data: DeveloperData;
    public_interest_stats: {
      alexa_rank: number;
      bing_matches: number;
    };
    status_updates: [];
    last_updated: string;
    tickers: Ticker[];
  };
  export type Ticker = {
    base: CoinSymbol;
    target: CoinSymbol;
    market: {
      name: ExchangeName;
      identifier: ExchangeID;
      has_trading_incentive: boolean;
    };
    volume?: number;
    converted_last: ConversionMap<number>;
    converted_volume: ConversionMap<number>;
    trust_score?: "green" | "yellow" | "red";
    bid_ask_spread_percentage?: number;
    timestamp: string;
    last_traded_at?: string;
    last_fetch_at?: string;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url?: Url;
    token_info_url?: Url;
    coin_id: CoinID;
    target_coin_id: CoinID;
  };
  export type ConversionMap<T> = {
    [symbol: Conversion]: T;
  };
  export type Conversion = "btc" | "eth" | "usd";
  export type ExchangeName = string;
  export type ExchangeID = string;
  export type CurrencyMap<T> = {
    [currency: string]: T;
  };
  export type MarketData = {
    current_price: CurrencyMap<number>;
    total_value_locked?: number;
    mcap_to_tvl_ratio?: number;
    fdv_to_tvl_ratio?: number;
    roi?: number;
    ath: CurrencyMap<number>;
    ath_change_percentage: CurrencyMap<number>;
    ath_date: CurrencyMap<string>;
    atl: CurrencyMap<number>;
    atl_change_percentage: CurrencyMap<number>;
    atl_date: CurrencyMap<string>;
    market_cap?: CurrencyMap<number>;
    market_cap_rank?: number;
    fully_diluted_valuation?: CurrencyMap<number>;
    total_volume?: CurrencyMap<number>;
    high_24: CurrencyMap<number>;
    low_24: CurrencyMap<number>;
    price_change_24h?: number;
    price_change_percentage_24h?: number;
    price_change_percentage_7d?: number;
    price_change_percentage_14d?: number;
    price_change_percentage_30d?: number;
    price_change_percentage_60d?: number;
    price_change_percentage_200d?: number;
    price_change_percentage_1y?: number;
    market_cap_change_24h?: number;
    market_cap_change_percentage_24h?: number;
    price_change_24h_in_currency?: CurrencyMap<number>;
    price_change_7d_in_currency?: CurrencyMap<number>;
    price_change_14d_in_currency?: CurrencyMap<number>;
    price_change_30d_in_currency?: CurrencyMap<number>;
    price_change_60d_in_currency?: CurrencyMap<number>;
    price_change_200d_in_currency?: CurrencyMap<number>;
    price_change_1y_in_currency?: CurrencyMap<number>;
    market_cap_change_24h_in_currency?: CurrencyMap<number>;
    market_cap_change_percentage_24h_in_currency?: CurrencyMap<number>;
    total_supply?: number;
    max_supply?: number;
    circulating_supply?: number;
    last_updated?: string;
  };
  export type CommunityData = {
    facebook_likes?: number;
    twitter_followers?: number;
    reddit_average_posts_48h?: number;
    reddit_average_comments_48h?: number;
    reddit_subscribers?: number;
    reddit_accounts_active_48h?: number;
    telegram_channel_user_count?: number;
  };
  export type DeveloperData = {
    forks?: number;
    stars?: number;
    subscribers?: number;
    total_issues?: number;
    closed_issues?: number;
    pull_requests_merged?: number;
    pull_request_contributors?: number;
    code_additions_deletions_4_weeks?: {
      additions?: number;
      deletions?: number;
    };
    commit_count_4_weeks?: number;
    last_4_weeks_commit_activity_series?: number[];
  };
  export interface Response<T = BaseResponse> {
    success: boolean;
    message: string;
    code: number;
    data: T;
  }
}
