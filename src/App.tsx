import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/router";
import { CustomDialogContextProvider } from "./components/dialog/useCustomDialogContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomDialogContextProvider>
        <div className="pt-0 pb-16 sm:pt-16 sm:pb-0">
          <AppRouter />;
        </div>
      </CustomDialogContextProvider>
    </QueryClientProvider>
  );
}

export default App;
