const isValidCnpj = (cnpj: string): boolean => {
  
  cnpj = cnpj.replace(/\D/g, "");
  const numericCnpj = cnpj.split("").map(Number);

  const allDigitsEqual = /^(\d)\1{13}$/.test(numericCnpj.join(""));

  return numericCnpj.length !== 14 || allDigitsEqual
    ? false
    : (() => {
        const calculateDigit = (
          position: number,
          weights: number[]
        ): number => {
          let sum = 0;
          let factor = position;

          for (let i = 0; i < position; i++) {
            sum += numericCnpj[i] * weights[i];
            factor--;
          }

          const remainder = sum % 11;
          return remainder < 2 ? 0 : 11 - remainder;
        };

        const weightsFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const weightsSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        const firstDigit = calculateDigit(12, weightsFirstDigit);
        const secondDigit = calculateDigit(13, weightsSecondDigit);

        const providedDigits = Number(cnpj.slice(12));
        const calculatedDigits = firstDigit * 10 + secondDigit;

        return providedDigits === calculatedDigits;
      })();
};

export default isValidCnpj;
