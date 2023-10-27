import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useMemo } from "react";

import { MarketType } from "../../types";
import { MarketLineType } from "../../types";
import { TableRow } from "../TableRow/TableRow";
import { FilterBar } from "../FilterBar/FilterBar";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchMarkets, fetchLines } from "../../apis";
import { reducer, initialMarketStatus } from "../../helpers";
import { StyledTable, StyledSearchAndFilterBarArea } from "./StyledTable";

const Table = () => {
  const [tableData, setTableData] = useState<MarketType[]>([]);
  const [positionFilter, setPositionFilter] = useState("");
  const [statTypeFilter, setStatTypeFilter] = useState("");
  const [marketStatusFilter, setMarketStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(tableData);

  const tableHeaders = [
    "Player Name",
    "Player Id",
    "Position",
    "Team Nickname",
    "Team Id",
    "Team Abbr",
    "Market Status",
    "Stat Type",
    "Stat Type Id",
    "High",
    "Low",
    "Manually Override?",
  ];

  const searchBarPlaceholder = "Search by player name or team nickname...";

  useEffect(() => {
    const newFilteredData = tableData.filter((market) => {
      return (
        (positionFilter === "" ||
          market.position.toLowerCase() === positionFilter.toLowerCase()) &&
        (statTypeFilter === "" ||
          market.statType.toLowerCase() === statTypeFilter.toLowerCase()) &&
        (marketStatusFilter === "" ||
          market.suspendMarket.toLowerCase() ===
            marketStatusFilter.toLowerCase())
      );
    });
    setFilteredData(newFilteredData);
  }, [positionFilter, statTypeFilter, marketStatusFilter, tableData]);

  const handlePositionFilterChange = (value: string) => {
    setPositionFilter(value);
  };

  const handleStatTypeFilterChange = (value: string) => {
    setStatTypeFilter(value);
  };

  const handleMarketStatusFilterChange = (value: string) => {
    setMarketStatusFilter(value);
  };

  const toggleMarketSuspended = (market: MarketType) => {
    const newMarketSuspended =
      market.suspendMarket === "Active" ? "Suspended" : "Active";
    const updatedMarket = { ...market, suspendMarket: newMarketSuspended };
    const updatedTableData = tableData.map((m) =>
      m.id === market.id ? updatedMarket : m
    );
    setTableData(updatedTableData);
  };

  // Memoize the reducer function to avoid unnecessary re-renders
  const memoizedReducer = useMemo(() => reducer, []);

  useEffect(() => {
    async function fetchDataAndCreateTableData() {
      // Fetch market data and lines data in parallel
      const [marketData, linesData] = await Promise.all([
        fetchMarkets(),
        fetchLines(),
      ]);

      // Reduce lines data to get analysis data
      const result = linesData.reduce(memoizedReducer, []);

      // Store analysis data in a Map for constant time lookups
      const analysisMap = new Map();
      for (const analysis of result) {
        const key = `${analysis.playerId}-${analysis.statType}`;
        analysisMap.set(key, analysis);
      }

      const linesMap = new Map<string, MarketLineType>();

      for (const obj of linesData) {
        const key = `${obj.playerId}-${obj.statTypeId}-${obj.line}`;
        linesMap.set(key, obj);
      }

      const updatedMarkets = marketData.map((market) => {
        const marketLineKey = `${market.playerId}-${market.statTypeId}-${market.line}`;
        const marketLine = linesMap.get(marketLineKey);

        const suspendMarket = initialMarketStatus(marketLine);

        const analysisKey = `${market.playerId}-${market.statType}`;
        const analysis = analysisMap.get(analysisKey);

        const high = analysis?.high || "N/A";
        const low = analysis?.low || "N/A";

        return {
          ...market,
          id: uuidv4(),
          high,
          low,
          suspendMarket,
        };
      }) as MarketType[];
      setTableData(updatedMarkets);
    }

    fetchDataAndCreateTableData();
  }, [memoizedReducer]);

  return (
    <StyledTable>
      <StyledSearchAndFilterBarArea>
        <SearchBar
          filteredData={tableData}
          setFilteredData={setFilteredData}
          placeholder={searchBarPlaceholder}
        />
        <FilterBar
          onPositionFilterChange={handlePositionFilterChange}
          onStatTypeFilterChange={handleStatTypeFilterChange}
          onMarketStatusFilterChange={handleMarketStatusFilterChange}
        />
      </StyledSearchAndFilterBarArea>
      <table>
        <thead>
          <tr className="table-head">
            {tableHeaders.map((header, index) => {
              return (
                <th className="table-header-cell" key={index}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((market, index) => {
            return (
              <TableRow
                key={index}
                market={market}
                toggleMarketSuspended={toggleMarketSuspended}
              />
            );
          })}
        </tbody>
      </table>
    </StyledTable>
  );
};

export { Table };
export default Table;
