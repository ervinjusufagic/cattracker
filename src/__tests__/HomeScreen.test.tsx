import React from "react";

import { cleanup, render } from "@testing-library/react-native";
import { StateProvider } from "../store/stateContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { HomeScreen } from "../screens";

import { useFetchCats } from "../hooks/useFetchCats";
import { useStateReducer } from "../hooks/useStateReducer";
import { Cat, InitialState } from "../types";

const queryClient = new QueryClient();
const HomeSceenWithProviders = () => {
  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    </StateProvider>
  );
};

jest.mock("../hooks/useFetchCats", () => ({
  useFetchCats: jest.fn(),
}));

jest.mock("../hooks/useStateReducer", () => ({
  useStateReducer: jest.fn(),
}));

const useFetchCatsMock = useFetchCats as jest.MockedFunction<
  typeof useFetchCats
>;

const useStateReducerMock = useStateReducer as jest.MockedFunction<
  typeof useStateReducer
>;

const initialUseFetchCatsResult = {
  isError: false,
  isLoading: false,
  data: undefined,
  error: null,
};

const initialState: InitialState = {
  homeScreen: {
    searchQuery: "",
    cats: [],
  },
  catScreen: {
    name: "",
    image: "",
    dateOfBirth: "",
    dateOfDeath: "",
    isAddDisabled: true,
    isEditDisabled: true,
    isAddOpen: false,
    isEditOpen: false,
    selectedCat: null,
    datePicker: {
      open: false,
      type: null,
    },
  },
};

beforeEach(() => {
  jest.restoreAllMocks();
  useStateReducerMock.mockImplementation(() => ({
    state: initialState,
    dispatch: jest.fn,
  }));
  useFetchCatsMock.mockImplementation(() => ({
    ...initialUseFetchCatsResult,
  }));
});

afterEach(() => {
  cleanup();
});

test("homescreen renders while loading", () => {
  useFetchCatsMock.mockImplementation(() => ({
    ...initialUseFetchCatsResult,
    isLoading: true,
  }));

  const component = render(<HomeSceenWithProviders />);

  expect(component.getByText("Loading...")).toBeDefined();
});

test("homescreen render while error", () => {
  useFetchCatsMock.mockImplementation(() => ({
    ...initialUseFetchCatsResult,
    isError: true,
  }));

  const component = render(<HomeSceenWithProviders />);

  expect(component.getByText("Could not fetch cats :(")).toBeDefined();
});

test("homescreen render with data", async () => {
  const cat: Cat = {
    name: "TestCat",
    dateOfBirth: "",
    imagePath: "burito",
    id: 0,
    dateOfDeath: "",
  };
  useStateReducerMock.mockImplementation(() => ({
    state: {
      ...initialState,
      homeScreen: { ...initialState.homeScreen, cats: [cat] },
    },
    dispatch: jest.fn,
  }));

  const component = render(<HomeSceenWithProviders />);

  expect(component.getByText("TestCat")).toBeDefined();
});
