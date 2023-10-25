import styled from "styled-components";

const StyledTable = styled.table`
  position: relative;
  table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 8px;
    font-size: 0.8em;
    text-align: center;
  }

  th {
    background: ${({ theme }) => theme.tableHeaderBackground};
    color: ${({ theme }) => theme.tableHeaderText};
  }

  td {
    color: ${({ theme }) => theme.tableDataText};
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const StyledSearchAndFilterBarArea = styled.div`
  width: 100%;
`;


export {
  StyledTable,
  StyledSearchAndFilterBarArea
};
export default StyledTable;
