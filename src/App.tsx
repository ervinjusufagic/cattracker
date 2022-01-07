import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { HomeScreen } from "./screens";

import { StateProvider } from "./store/stateContext";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    </StateProvider>
  );
};

export default App;
