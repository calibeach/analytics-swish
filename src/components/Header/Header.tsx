import header from "../../assets/Header.png";
import { StyledHeader } from "./StyledHeader";

const Header = () => {
  return (
    <StyledHeader>
      <img src={header} alt="Header" />
    </StyledHeader>
  );
};

export { Header };
export default Header;
