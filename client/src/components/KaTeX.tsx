import katex from "katex";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

export function KaTeX({ katexExpression, url, displayMode }: { katexExpression: string, url: (string | undefined), displayMode: boolean }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    katex.render(katexExpression, linkRef.current as HTMLAnchorElement, {
      displayMode: displayMode
    });
  }, [katexExpression]);

  return (
      <Link ref={linkRef} to={url ? url : ""} className={url ? "text-center text-blue-600 visited:text-purple-600" : "text-center "}/>
  )
  
  
}