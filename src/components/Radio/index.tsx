import { useEffect, useState } from "react";

import IList from "../../interfaces/IList";

interface IRadio {
  defaultChecked: string
  onClick?: (option: string) => void
}

const Radio = ({ defaultChecked, onClick, options }: IRadio & IList) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(defaultChecked || null);
    onClick && onClick(defaultChecked);
  }, [defaultChecked]);

  const handleRadioClick = (option: string) => {
    setSelectedOption(option);
    onClick && onClick(option);
  };

  return (
    <div className="radio">
      {options.map((option, index) => (
        <div key={index} className="radio__item">
          <input
            id={index.toString()}
            key={index}
            name={option}
            type="radio"
            checked={option === selectedOption}
            onChange={() => handleRadioClick(option)}
          />
          <label htmlFor={index.toString()}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
