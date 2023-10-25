export type MarketType = {
  id: string;
  playerName: string;
  playerId: number;
  teamId: number;
  teamNickname: string;
  teamAbbr: string;
  statType: "assists" | "rebounds" | "points";
  statTypeId: number;
  position: string;
  marketSuspended: 0 | 1 | string;
  line: number;
  suspendMarket: string;
  high?: number;
  low?: number;
};

export type LineType = {
  playerName: string;
  playerId: number;
  statType: "assists" | "rebounds" | "points";
  statTypeId: number;
  line: number;
  underOdds: number;
  overOdds: number;
  pushOdds: number;
};

export type MarketLineType = {
  line: number;
  overOdds: number;
  playerId: number;
  playerName: string;
  pushOdds: number;
  statType: string;
  statTypeId: number;
  underOdds: number;
};
