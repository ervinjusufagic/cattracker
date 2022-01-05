import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import CatTracker from "./CatTracker";
import { StateProvider } from "./store/stateContext";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <CatTracker />
      </QueryClientProvider>
    </StateProvider>
  );
};

export default App;
