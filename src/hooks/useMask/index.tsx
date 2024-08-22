const useMask = () => {
  const cepMask = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const numericValueLength = numericValue.length;
    const maskedValue = numericValue
      .split("")
      .map((char, index) => {
        return index === 5 && numericValueLength >= 6 ? `${char}-` : char;
      })
      .join("");

    return maskedValue;
  };

  const cnpjMask = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const numericValueLength = numericValue.length;
    const maskedValue = numericValue
      .split("")
      .map((char, index) => {
        return (index === 1 && numericValueLength >= 3) ||
          (index === 4 && numericValueLength >= 6)
          ? `${char}.`
          : index === 7 && numericValueLength >= 9
          ? `${char}/`
          : index === 11 && numericValueLength >= 13
          ? `${char}-`
          : char;
      })
      .join("");

    return maskedValue;
  };

  const cpfMask = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const numericValueLength = numericValue.length;
    const maskedValue = numericValue
      .split("")
      .map((char, index) => {
        return (index === 2 && numericValueLength >= 4) ||
          (index === 5 && numericValueLength >= 7)
          ? `${char}.`
          : index === 8 && numericValueLength >= 10
          ? `${char}-`
          : char;
      })
      .join("");

    return maskedValue;
  };

  const telefoneMask = (value: string) => {
    let numericValue = value.replace(/\D/g, "");
    numericValue.startsWith("55")
      ? (numericValue = numericValue.substring(2))
      : numericValue;
    const numericValueLength = numericValue.length;
    let maskedValue = numericValueLength >= 1 ? "+55 (" : "";

    for (let i = 0; i < numericValueLength; i++) {
      i === 2
        ? (maskedValue += `) ${numericValue[i]}`)
        : i === 6
        ? (maskedValue +=
            numericValueLength === 11
              ? `${numericValue[i]}-`
              : `-${numericValue[i]}`)
        : (maskedValue += numericValue[i]);
    }

    return maskedValue;
  };

  const clearCepMask = (value: string) => {
    return value.replace(/[\s.-]/g, "");
  };

  const clearCnpjMask = (value: string) => {
    return value.replace(/[\s./-]/g, "");
  };

  const clearCpfMask = (value: string) => {
    return value.replace(/[\s.-]/g, "");
  };

  const clearTelefoneMask = (value: string) => {
    return value.replace(/\+55|\(|\)|-| /g, "");
  };

  return {
    cepMask,
    cnpjMask,
    cpfMask,
    telefoneMask,
    clearCepMask,
    clearCnpjMask,
    clearCpfMask,
    clearTelefoneMask,
  };
};

export default useMask;
