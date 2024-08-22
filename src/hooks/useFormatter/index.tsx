const useFormatter = () => {
  const parseToReal = (value: string | number) => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const parseCurrencyToNumber = (value: string) => {
    let numberString = value.replace(/[R$\s.]/g, "");
    numberString = numberString.replace(",", ".");

    return parseFloat(numberString);
  };

  const parsePercentualToNumber = (value: string) => {
    let numberString = value.replace(/[%\s]/g, "");
    numberString = numberString.replace(",", ".");
    return parseFloat(numberString);
  };

  const parseToPercentual = (value: string | number) => {
    return `${Number(value).toFixed(2)} %`;
  };

  return {
    parseCurrencyToNumber,
    parsePercentualToNumber,
    parseToReal,
    parseToPercentual,
  };
};

export default useFormatter;
