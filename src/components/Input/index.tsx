import { useEffect, useState } from "react";
import IEvents from "./../../interfaces/IEvents";
import isValidInputValue from "../../validators/isValidInputValue/index";
import isValidKeyPress from "../../validators/isValidKeyPress/index";
import useMask from "../../hooks/useMask";

interface IInput {
  characters?: "all" | "number" | "value" | "text";
  name?: string;
  isDisabled?: boolean;
  label: string;
  length?: number[];
  placeholder?: string;
  type: "date" | "email" | "number" | "password" | "text" | "time";
  validationType?: "CEP" | "CPF" | "CNPJ" | "Telefone" | "Password";
  value?: any;
}

const Input = ({
  characters = "all",
  name,
  isDisabled = false,
  label,
  length,
  onChange,
  placeholder,
  size = "md",
  type,
  value,
  validationType,
}: IEvents & IInput & { size?: "sm" | "md" | "lg" | "xl" }) => {
  const [inputValue, setInputValue] = useState<any>(value ? value : "");
  const [validator, setValidator] = useState<string>("Default");
  const [inputJSX, setInputJSX] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setInputValue(value ? value : "");
  }, [value]);

  useEffect(() => {
    value = inputValue;

    const mask = Mask(validationType, inputValue);
    setInputValue(mask);

    const newValidator = isValidInputValue(
      validationType ? validationType : type,
      mask,
      length ? length[1] : 0
    );
    setValidator(newValidator);
  }, [inputValue]);

  useEffect(() => {
    const inputComponent = (
      <input
        className={`input input--${size}`}
        id={name}
        aria-invalid={validator === "Invalid" ? true : false}
        autoComplete="on"
        disabled={isDisabled}
        name={name}
        min={type === "number" ? 0 : ""}
        maxLength={length ? length[0] : undefined}
        placeholder={placeholder}
        type={type}
        value={inputValue}
        width={size[0]}
        onChange={(event) => handleInputChange(event.target.value)}
        onBlur={() => onChange!([inputValue, validator])}
      />
    );
    setInputJSX(inputComponent);
  }, [inputValue, value, isDisabled, type]);

  const handleInputChange = (value: any) => {
    const char = value.charAt(value.length - 1);
    if (isValidKeyPress(characters, char)) {
      const newValidator = isValidInputValue(
        validationType ? validationType : type,
        value,
        length ? length[1] : 0
      );
      setValidator(newValidator);
      setInputValue(value);
      onChange!([value, newValidator]);
    }
  };

  const alertMessage = () => {
    const valid = validationType ? validationType : type;

    switch (valid) {
      case "number":
      case "CEP":
        return "CEP inválido";
      case "CPF":
        return "CPF inválido";
      case "CNPJ":
        return "CNPJ inválido";
      case "Password":
        return "Senha inválida";
      case "email":
        return "E-mail inválido";
      default:
        return "Caractéres mínimo não atendido";
    }
  };

  const Mask = (validationType: string | undefined, value: string) => {
    const {
      cnpjMask,
      cpfMask,
      telefoneMask,
      clearCnpjMask,
      clearCpfMask,
      clearTelefoneMask,
    } = useMask();
    const characters = value.toString().replace(/\D/g, "");
  
    switch (validationType) {
      case "CPF":
        return characters.length === 11
          ? cpfMask(characters)
          : clearCpfMask(value);
      case "CNPJ":
        return characters.length === 14
          ? cnpjMask(characters)
          : clearCnpjMask(value);
      case "Telefone":
        return characters.length >= 10
          ? telefoneMask(characters)
          : clearTelefoneMask(value);
      default:
        return value;
    }
  };

  return (
    <div className="input__container">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      {inputJSX}
      {validator === "Invalid" ? (
        <span className="input__message">
          <p>{`*${alertMessage()}`}</p>
        </span>
      ) : null}
    </div>
  );
};

export default Input;
