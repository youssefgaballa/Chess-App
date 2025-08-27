import katex from "katex";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

export function KaTeX({ katexExpression, url}: { katexExpression: string, url: (string | undefined)} ) {
  const containerRef = useRef<HTMLInputElement>(null);
  const  katexExpressionWithLink: string = String.raw`\href{` + url + `}{` + katexExpression + `}`;
  //console.log(katexExpressionWithLink)
  useEffect(() => {
    katex.render(katexExpressionWithLink, containerRef.current as HTMLInputElement, {
      trust:true
    });
  }, [katexExpressionWithLink]);

  return <div ref={containerRef} className={url ? "text-center text-blue-600 visited:text-purple-600" : "text-center "}/>;
}
