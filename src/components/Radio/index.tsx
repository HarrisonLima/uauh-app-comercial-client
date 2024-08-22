import { useEffect, useState } from "react";

import IList from "../../interfaces/IList";

interface IRadio {
  defaultChecked: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (option: string) => void;
}

const Radio = ({ defaultChecked, onClick, options }: IRadio & IList) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(defaultChecked || null);
    onClick ? onClick(defaultChecked) : null;
  }, [defaultChecked]);

  const handleRadioClick = (option: string) => {
    setSelectedOption(option);
    onClick ? onClick(option) : null;
  };

  return (
    <div className="radio">
      {options.map((option, index) => (
        <div key={index} className="radio__item">
          <input
            id={index.toString()}
            name={option}
            type="radio"
            checked={option === selectedOption}
            onChange={() => handleRadioClick(option)}
          />
          <label htmlFor={index.toString()}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
