import { useEffect, useState } from "react";

import IList from "../../interfaces/IList";
import IEvents from "../../interfaces/IEvents";

import Button from "../Button";

const Select = ({
  optionDefault,
  options,
  onSelectChange,
}: IList & IEvents) => {
  const [isActive, setIsActive] = useState(
    optionDefault ? optionDefault : options[0]
  );

  useEffect(() => {
    setIsActive(optionDefault);
  }, [optionDefault]);

  const handleButtonClick = (selectedOption: string) => {
    if (isActive !== selectedOption) {
      setIsActive(selectedOption);
      if (onSelectChange) {
        onSelectChange(selectedOption);
      }
    }
  };

  return (
    <div className="select">
      <Button
        key={options[0]}
        fontText={options[0]}
        variant={isActive === options[0] ? "primary" : "disabled"}
        onClick={() => handleButtonClick(options[0])}
      />
      <Button
        key={options[1]}
        fontText={options[1]}
        variant={isActive === options[1] ? "primary" : "disabled"}
        onClick={() => handleButtonClick(options[1])}
      />
    </div>
  );
};

export default Select;
