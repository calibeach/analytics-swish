import React, { useState } from "react";
import { StyledFilter } from "./StyledFilter";

interface FilterProps {
  options: string[];
  label: string;
  onChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ options, label, onChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <StyledFilter>
      <label htmlFor={`${label}-filter`}>{label}:</label>
      <select
        id={`${label}-filter`}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">All</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </StyledFilter>
  );
};

export { Filter };
export default Filter;
