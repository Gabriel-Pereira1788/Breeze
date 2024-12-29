type ErrorMessage = {
  title: string;
  message: string;
};
export function buildToasterError(error: string): ErrorMessage {
  if (error.includes("login credentials")) {
    return {
      title: "Credentials",
      message: "Check your credentials and try again.",
    };
  }
  return {
    title: "Error",
    message: "Try Again Later.",
  };
}
