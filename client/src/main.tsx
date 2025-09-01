/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'

declare global {
  interface Window {
    MathJax: any;
  }
}
// This shit dont get rid of the red squiggly under da mathml elements fo some reason
  // namespace JSX {
  //   interface InstrinsicElements {
  //     math: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  //     mn: any;
  //     mfrac:any;
  //   }
  // }
//}
// interface math extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
