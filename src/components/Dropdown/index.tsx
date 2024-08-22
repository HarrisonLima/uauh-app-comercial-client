import { useState } from "react";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import IEvents from "../../interfaces/IEvents";
import IList from "../../interfaces/IList";
import IText from "../../interfaces/IText";
import Icon from "../Icon";

interface IOption {
  id: number;
  text: string;
}

const Dropdown = ({
  fontText,
  onChange,
  options,
  size = "md",
  value,
}: IEvents &
  IList &
  IText & { value?: any } & { size?: "sm" | "md" | "lg" | "xl" }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [expandOptions, setExpandOptions] = useState(false);

  const handleOptionClick = (option: IOption) => {
    setSelectedOption(option.id);
    onChange!(option);
    setExpandOptions(false);
  };

  return (
    <div className="dropdown">
      <label className="dropdown__label">{fontText}</label>
      <div className="dropdown__container">
        <div
          className={`dropdown__select dropdown__select--${size}`}
          onClick={() => setExpandOptions(!expandOptions)}
        >
          {value
            ? value
            : selectedOption
            ? options.find((option) => option.id === selectedOption)?.text
            : "Ver opções..."}
          <div className="dropdown__icon">
            <Icon
              icon={expandOptions ? faCaretLeft : faCaretDown}
              color="white"
              variant="button"
            />
          </div>
          {expandOptions && (
            <ul className="dropdown__list" aria-expanded={expandOptions}>
              {options.map((option: any) => (
                <li
                  className={`dropdown__list__option ${
                    selectedOption === option.id
                      ? "dropdown__list__option--actived"
                      : ""
                  }`}
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
