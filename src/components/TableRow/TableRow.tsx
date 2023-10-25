import React, { useState } from "react";

import { MarketType } from "../../types";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";

interface TableRowProps {
  market: MarketType;
  toggleMarketSuspended: (market: MarketType) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  market,
  toggleMarketSuspended,
}) => {
  const [isSuspended, setIsSuspended] = useState(
    market.suspendMarket === "Yes"
  );

  const handleToggle = (value: boolean) => {
    setIsSuspended(value);
    toggleMarketSuspended(market);
  };

  const inputId = `toggle-switch-${market.id}`;

  return (
    <tr>
      <td>{market.playerName}</td>
      <td>{market.playerId}</td>
      <td>{market.position}</td>
      <td>{market.teamNickname}</td>
      <td>{market.teamId}</td>
      <td>{market.teamAbbr}</td>
      <td>{market.suspendMarket}</td>
      <td>{market.statType}</td>
      <td>{market.statTypeId}</td>
      <td>{market.high}</td>
      <td>{market.low}</td>
      <td>
        <ToggleSwitch
          inputId={inputId}
          initialState={isSuspended}
          onChange={handleToggle}
          // onToggle={() => toggleMarketSuspended(market)}
        />
      </td>
    </tr>
  );
};

export { TableRow };
export default TableRow;
