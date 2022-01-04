import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import CatTracker from "./CatTracker";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CatTracker />
    </QueryClientProvider>
  );
};

export default App;
