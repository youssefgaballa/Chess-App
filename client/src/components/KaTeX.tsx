import katex from "katex";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

export function KaTeX({ katexExpression, url }: { katexExpression: string, url: (string | undefined) }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  //const katexExpressionWithLink: string = String.raw`\href{` + url + `}{` + katexExpression + `}`;
  //console.log(katexExpressionWithLink)
  useEffect(() => {
    katex.render(katexExpression, linkRef.current as HTMLAnchorElement, {});
  }, [katexExpression]);

  return <Link to = {url ? url : ""} ref={linkRef} className={url ? "text-center text-blue-600 visited:text-purple-600" : "text-center "} />;
}