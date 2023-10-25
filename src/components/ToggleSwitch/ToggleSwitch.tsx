import { useState, ChangeEvent } from "react";
import { StyledToggleSwitch } from "./StyledToggleSwitch";

interface Props {
  initialState?: boolean;
  label?: string;
  inputId?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  onToggle?: () => void;
}

const ToggleSwitch: React.FC<Props> = ({
  initialState = true,
  label = "",
  inputId = "",
  disabled = false,
  onChange = () => {},
  onToggle = () => {}
}) => {
  const [switchState, setSwitchState] = useState(initialState);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSwitchState(checked);
    onChange(checked);
    onToggle();
  };

  return (
    <StyledToggleSwitch htmlFor={inputId} checked={switchState}>
      {label && <span>{label}</span>}
      <input
        id={inputId}
        type="checkbox"
        checked={switchState}
        onChange={handleOnChange}
        disabled={disabled}
      />
    </StyledToggleSwitch>
  );
};

export { ToggleSwitch };
export default ToggleSwitch;
