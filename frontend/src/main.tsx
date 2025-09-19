import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './users/userAuthContext.tsx';
import { Provider } from 'react-redux';
import { store } from './util/reduxStore.ts';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

