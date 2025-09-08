//import { StrictMode, type DetailedHTMLProps, type HTMLAttributes } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
//import { MathfieldElement } from "mathlive";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)

// declare module 'react/jsx-runtime' {
//   namespace JSX {
//     interface IntrinsicElements {
//       'math-field': DetailedHTMLProps<
//         HTMLAttributes<MathfieldElement>,
//         MathfieldElement
//       >;
//     }
//   }
// }


//MathfieldElement.fontsDirectory = "../../mathlive/fonts";
