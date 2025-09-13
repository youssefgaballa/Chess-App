//import 'mathlive'
//import { convertLatexToMarkup } from 'mathlive';
import katex from "katex"
import { useEffect, useLayoutEffect, useRef } from "react";

export function Home() {
  // TODO: Add routing to home page
  const mathRef = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    return katex.render("c = \\href{\a}{\\pm}\\sqrt{a^2 + b^2}", mathRef.current!, {
      trust: true,
    });

  }, []);
  
  return (
    <>
      <div>
        <header className="text-center" ref={mathRef}>
          Home page!
        </header>
      </div>
    </>
  )
}