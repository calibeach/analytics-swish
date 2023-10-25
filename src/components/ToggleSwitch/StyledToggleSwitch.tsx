import styled from "styled-components";

const StyledToggleSwitch = styled.label<{ checked: boolean }>`
  cursor: pointer;
  text-indent: -9999px;
  width: 60px;
  height: 20px;
  background: ${({ checked, theme }) =>
    checked ? theme.toggleChecked : theme.toggleUnchecked};
  display: block;
  border-radius: 100px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.toggleSwitchBorder};

  &:after {
    content: "";
    position: absolute;
    left: ${({ checked }) => (checked ? "0px" : "calc(55% - 5px)")};
    top: 0px;
    width: 32px;
    height: 20px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
`;

export { StyledToggleSwitch };
export default StyledToggleSwitch;
