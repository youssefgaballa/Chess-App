import katex from "katex";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import { Link } from "react-router";

export function KaTeX({ katexExpression, url}: { katexExpression: string, url: (string | undefined)} ) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  //const  katexExpressionWithLink: string = String.raw`\href{` + url + `}{` + katexExpression + `}`;
  //console.log(katexExpressionWithLink)
  useEffect(() => {
    
    katex.render(katexExpression, linkRef.current as HTMLAnchorElement, {
        trust: true
      });
    }, [katexExpression]);
    
   
  return <Link ref={linkRef} className={url ? "text-center text-blue-600 visited:text-purple-600" : "text-center "} to={url ? url : ""}/>;
}
