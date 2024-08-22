import { useState } from "react";
import IEvents from "../../interfaces/IEvents";
import IText from "../../interfaces/IText";

const Checkbox = ({
  fontText,
  styledText = false,
  onChange,
  optionDefault = false,
}: IEvents &
  IText & { styledText?: boolean } & { optionDefault?: boolean }) => {
  const [checked, setChecked] = useState(optionDefault);

  const handleClick = () => {
    onChange!(!checked);
    setChecked(!checked);
  };

  return (
    <div className="checkbox">
      <input
        id="checkbox"
        className="checkbox__input"
        type="checkbox"
        onClick={handleClick}
        defaultChecked={checked}
      />
      <label
        className={`checkbox__label${
          styledText && checked ? "--through" : ""
        }`}
        htmlFor="checkbox"
      >
        {fontText}
      </label>
    </div>
  );
};

export default Checkbox;
