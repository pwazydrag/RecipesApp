const isNotEmpty = (value: string) => {
  return value.length !== 0;
};

const isLengthValid = (text: string, length: number) => {
  return text.trim().length >= length;
};

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

export { isNotEmpty, isLengthValid, isEmailValid, arePasswordsCorrect };
