import { useState } from "react";

import { MarketType } from "../../types";
import { StyledSearchBar } from "./StyledSearchBar";

interface SearchBarProps {
  filteredData: MarketType[]; // Replace with the type of your table data
  setFilteredData: React.Dispatch<React.SetStateAction<MarketType[]>>;
  placeholder: string; // Replace with the type of your table data
}

const SearchBar: React.FC<SearchBarProps> = ({
  filteredData,
  setFilteredData,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value.toLowerCase();
    const filtered = filteredData.filter((data) => {
      return (
        data.playerName.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        data.teamNickname.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
    });
    setFilteredData(newSearchTerm ? filtered : filteredData);
    setSearchTerm(newSearchTerm);
  };

  return (
    <StyledSearchBar>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder={placeholder}
      />
    </StyledSearchBar>
  );
};

export { SearchBar };
export default { SearchBar };
