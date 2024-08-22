import isValidCnpj from "../isValidCnpj";
import isValidCpf from "../isValidCpf";
import isValidPassword from "../isValidPassword";

const isValidInputValue = (
  typeValidator: string,
  value: any,
  length?: number
): string => {
  const valueLength = value
    ? typeof value === "string"
      ? value.toString().split("").length
      : value.length
    : 0;

  if (valueLength === 0) {
    return "Default";
  }

  if (length && valueLength < length) {
    return "Invalid";
  }

  switch (typeValidator) {
    case "email":
      return value.toString().includes("@") ? "Default" : "Invalid";
    case "CEP":
      return value.toString().replace(/-/g, '').length === 8 ? "Default" : "Invalid";
    case "CPF":
      return isValidCpf(value.toString()) ? "Default" : "Invalid";
    case "CNPJ":
      return isValidCnpj(value.toString()) ? "Default" : "Invalid";
    case "Password":
      return isValidPassword(value.toString()) ? "Default" : "Invalid";
    default:
      return "Default";
  }
};

export default isValidInputValue;
