import React from "react";

import Filter from "../Filter/Filter";
import { StyledFilterBar } from "./StyledFilterBar";

interface FilterAreaProps {
  onPositionFilterChange: (value: string) => void;
  onStatTypeFilterChange: (value: string) => void;
  onMarketStatusFilterChange: (value: string) => void;
}

const FilterBar: React.FC<FilterAreaProps> = ({
  onPositionFilterChange,
  onStatTypeFilterChange,
  onMarketStatusFilterChange,
}) => {
  return (
    <StyledFilterBar>
      <Filter
        options={["PG", "SG", "SF", "PF", "C"]}
        label="Position"
        onChange={onPositionFilterChange}
      />
      <Filter
        options={["Points", "Rebounds", "Assists", "Steals", "Blocks"]}
        label="Stat Type"
        onChange={onStatTypeFilterChange}
      />
      <Filter
        options={["Suspended", "Active"]}
        label="Market Status"
        onChange={onMarketStatusFilterChange}
      />
    </StyledFilterBar>
  );
};

export { FilterBar };
export default FilterBar;
