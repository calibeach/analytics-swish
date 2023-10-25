import { LineType, MarketLineType } from "../types";

type UniquePlayerStatType = {
  playerName: string;
  playerId: number;
  statType: string;
  high: number;
  low: number;
};

export const reducer = (
  accumulator: UniquePlayerStatType[],
  currentValue: LineType
): UniquePlayerStatType[] => {
  const { playerName, playerId, line, statType } = currentValue;
  const playerStatIndex = accumulator.findIndex(
    (obj) => obj.playerId === playerId && obj.statType === statType
  );
  if (playerStatIndex === -1) {
    accumulator.push({
      playerName,
      playerId,
      statType,
      high: line,
      low: line,
    });
  } else {
    if (line > accumulator[playerStatIndex].high) {
      accumulator[playerStatIndex].high = line;
    }
    if (line < accumulator[playerStatIndex].low) {
      accumulator[playerStatIndex].low = line;
    }
  }
  return accumulator;
};

export const initialMarketStatus = (marketLine: MarketLineType | undefined) => {
  return !marketLine ||
    (marketLine.underOdds < 0.4 &&
      marketLine.overOdds < 0.4 &&
      marketLine.pushOdds < 0.4)
    ? "Suspended"
    : "Active";
};
