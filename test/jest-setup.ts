// @ts-ignore
global.FormData = require("react-native/Libraries/Network/FormData");

export const mockRouter = {
  navigate: jest.fn(),
};

jest.mock("expo-router", () => ({
  router: mockRouter,
}));
