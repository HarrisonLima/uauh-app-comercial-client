const isValidCpf = (cpf: string): boolean => {

  cpf = cpf.replace(/\D/g, "");
  const numericCpf = cpf.split("").map(Number);

  const allDigitsEqual = /^(\d)\1{10}$/.test(numericCpf.join(""));

  return numericCpf.length !== 11 || allDigitsEqual
    ? false
    : (() => {
        const calculateDigit = (position: number): number => {
          let sum = 0;
          let factor = position + 1;

          for (let i = 0; i < position; i++) {
            sum += numericCpf[i] * factor;
            factor--;
          }

          const remainder = sum % 11;
          return remainder < 2 ? 0 : 11 - remainder;
        };

        const firstDigit = calculateDigit(9);
        const secondDigit = calculateDigit(10);

        const providedDigits = Number(cpf.slice(9));
        const calculatedDigits = firstDigit * 10 + secondDigit;

        return providedDigits === calculatedDigits;
      })();
};

export default isValidCpf;
