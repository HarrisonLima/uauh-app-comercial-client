const isValidPassword = (password: string): boolean => {
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasMinChar = password.length >= 8;
  return (
    hasNumber && hasSpecialChar && hasLowerCase && hasUpperCase && hasMinChar
  );
};

export default isValidPassword;
