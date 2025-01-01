import { SignInView } from "../sign-in.view";

import { useSignInViewModel } from "../sign-in.viewModel";

import { render, screen, fireEvent, act, waitFor, mockRouter } from "@test";
import { mockSession } from "../mock/mockSession";
import { Session } from "../../../../../domain/Auth/authTypes";

const mockSignInUseCase = {
  execute: (email: string, password: string) =>
    new Promise<Session | null>((resolve, reject) => {
      setTimeout(() => {
        if (email === mockSession.user.email) {
          resolve(mockSession);
        } else {
          reject(new Error("login credentials"));
        }
      }, 2000);
    }),
};

const mockToasterService = {
  hide: jest.fn(),
  show: jest.fn(),
  error: jest.fn(),
  success: jest.fn(),
  warning: jest.fn(),
};

function SignInTest() {
  const viewModel = useSignInViewModel({
    signInUseCase: mockSignInUseCase,
    toasterService: mockToasterService,
  });
  return <SignInView viewModel={viewModel} />;
}

function customRender() {
  render(<SignInTest />);

  return {
    inputEmail: screen.getByPlaceholderText("Email"),
    inputPassword: screen.getByPlaceholderText("Password"),
    submitButton: screen.getByText("Login"),
    signUpRedirectButton: screen.getByText("Sign Up"),
  };
}

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("SignIn", () => {
  it("should be render component correctly", () => {
    const { inputEmail, inputPassword, signUpRedirectButton, submitButton } =
      customRender();

    expect(inputEmail).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(signUpRedirectButton).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it("should be change inputs values and render error messages", async () => {
    const { inputEmail, inputPassword } = customRender();

    act(() => {
      fireEvent.changeText(inputEmail, "simple@email");
      fireEvent.changeText(inputPassword, "123");
    });

    await waitFor(() =>
      expect(screen.getByText("Invalid email.")).toBeTruthy(),
    );
    expect(screen.getByText("Password too short.")).toBeTruthy();
  });

  it("should be submit form and render loading state", async () => {
    const { inputEmail, inputPassword, submitButton } = customRender();

    act(() => {
      fireEvent.changeText(inputEmail, "johndoe@email.com");
      fireEvent.changeText(inputPassword, "johndoe1234");
    });

    expect(screen.queryByTestId("loading-button")).toBeFalsy();

    await act(async () => {
      await fireEvent.press(submitButton);
    });

    await waitFor(() =>
      expect(screen.getByTestId("loading-button")).toBeTruthy(),
    );
  });

  it("should be render toaster error for auth invalid auth credentials", async () => {
    const { inputEmail, inputPassword, submitButton } = customRender();

    act(() => {
      fireEvent.changeText(inputEmail, "johndoe2@email.com");
      fireEvent.changeText(inputPassword, "johndoe1234");
    });

    await act(async () => {
      await fireEvent.press(submitButton);
      jest.runOnlyPendingTimers();
    });

    await waitFor(() =>
      expect(mockToasterService.error).toHaveBeenCalledWith(
        "Credentials",
        "Check your credentials and try again.",
      ),
    );
  });

  it("should be call redirect function to sign up screen", () => {
    const { signUpRedirectButton } = customRender();

    act(() => {
      fireEvent.press(signUpRedirectButton);
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith("/sign-up");
  });
});
