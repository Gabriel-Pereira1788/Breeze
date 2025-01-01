import { SignUpView } from "../sign-up.view";
import { useSignUpViewModel } from "../sign-up.viewModel";

import { render, screen, fireEvent, act, waitFor, mockRouter } from "@test";
import { mockSession } from "../mock/mockSession";
import { User } from "../../../../../domain/Auth/authTypes";

const mockSignUpUseCase = {
  execute: (data: {
    email: string;
    password: string;
    phone: string;
    username: string;
  }) =>
    new Promise<User | null>((resolve, reject) => {
      setTimeout(() => {
        if (data.email !== mockSession.user.email) {
          resolve(mockSession.user);
        } else {
          reject(new Error("User already registered"));
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

function SignUpTest() {
  const viewModel = useSignUpViewModel({
    signUpUseCase: mockSignUpUseCase,
    toasterService: mockToasterService,
  });

  return <SignUpView viewModel={viewModel} />;
}

function customRender() {
  render(<SignUpTest />);

  return {
    inputUsername: screen.getByPlaceholderText("@ Username"),
    inputEmail: screen.getByPlaceholderText("Email"),
    inputPhone: screen.getByPlaceholderText("Phone"),
    inputPassword: screen.getByPlaceholderText("Password"),
    registerButton: screen.getByTestId("register-button"),
  };
}

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("SignUp", () => {
  it("should render the component correctly", () => {
    const {
      inputUsername,
      inputEmail,
      inputPhone,
      inputPassword,
      registerButton,
    } = customRender();

    expect(inputUsername).toBeTruthy();
    expect(inputEmail).toBeTruthy();
    expect(inputPhone).toBeTruthy();
    expect(inputPassword).toBeTruthy();
    expect(registerButton).toBeTruthy();
  });

  it("should change input values and render error messages for invalid inputs", async () => {
    const { inputUsername, inputEmail, inputPhone, inputPassword } =
      customRender();

    act(() => {
      fireEvent.changeText(inputUsername, "");
      fireEvent.changeText(inputEmail, "invalidemail");
      fireEvent.changeText(inputPhone, "123");
      fireEvent.changeText(inputPassword, "123");
    });

    await waitFor(() =>
      expect(screen.getByText("Invalid email.")).toBeTruthy(),
    );

    await waitFor(() =>
      expect(screen.getByText("Password too short.")).toBeTruthy(),
    );
  });

  it("should submit the form and show loading state", async () => {
    const {
      inputUsername,
      inputEmail,
      inputPhone,
      inputPassword,
      registerButton,
    } = customRender();

    act(() => {
      fireEvent.changeText(inputUsername, "john_doe");
      fireEvent.changeText(inputEmail, "johndoe@email.com");
      fireEvent.changeText(inputPhone, "+1234567890");
      fireEvent.changeText(inputPassword, "johndoe1234");
    });

    expect(screen.queryByTestId("loading-button")).toBeFalsy();

    await act(async () => {
      await fireEvent.press(registerButton);
    });

    await waitFor(() =>
      expect(screen.getByTestId("loading-button")).toBeTruthy(),
    );
  });

  it("should show toaster error for invalid sign-up attempt", async () => {
    const {
      inputUsername,
      inputEmail,
      inputPhone,
      inputPassword,
      registerButton,
    } = customRender();

    act(() => {
      fireEvent.changeText(inputUsername, "john_doe");
      fireEvent.changeText(inputEmail, "johndoe@email.com");
      fireEvent.changeText(inputPhone, "+1234567890");
      fireEvent.changeText(inputPassword, "johndoe1234");
    });

    await act(async () => {
      await fireEvent.press(registerButton);
      jest.runOnlyPendingTimers();
    });

    await waitFor(() =>
      expect(mockToasterService.error).toHaveBeenCalledWith(
        "User already registered",
        "Email has registered.",
      ),
    );
  });
});
