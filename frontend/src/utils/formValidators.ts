const isEmailValid = (email: string): boolean => {
  const atPos = email.indexOf("@");
  const dotPos = email.lastIndexOf(".");
  return (
    atPos > 0 &&
    dotPos > atPos + 1 &&
    dotPos < email.trim().length - 1 &&
    email.trim().length > 7
  );
};

const arePasswordsCorrect = (password: string, repeatPassword: string) => {
  return password === repeatPassword;
};

export { isEmailValid, arePasswordsCorrect };
