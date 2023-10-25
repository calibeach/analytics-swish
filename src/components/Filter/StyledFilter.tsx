import styled from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8px;
  color: ${({ theme }) => theme.filterText};
  font-size: 0.8em;

  label {
    margin-right: 8px;
  }

  select {
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1em;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.filterBorder};
    color: ${({ theme }) => theme.selectText};
  }
`;

export { StyledFilter };
