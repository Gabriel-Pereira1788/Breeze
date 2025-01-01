type ErrorMessage = {
  title: string;
  message: string;
};
export function buildAuthErrorMessage(error: string): ErrorMessage {
  if (error.includes("login credentials")) {
    return {
      title: "Credentials",
      message: "Check your credentials and try again.",
    };
  }

  if (error.includes("already registered")) {
    return {
      title: "User already registered",
      message: "Email has registered.",
    };
  }
  return {
    title: "Error",
    message: "Try Again Later.",
  };
}
