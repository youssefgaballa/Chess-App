import katex from "katex";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

export function KaTeX({ katexExpression, url }: { katexExpression: string, url: (string | undefined) }) {
  const linkRef1 = useRef<HTMLDivElement>(null);
  const linkRef2 = useRef<HTMLAnchorElement>(null);

  //const katexExpressionWithLink: string = String.raw`\href{` + url + `}{` + katexExpression + `}`;
  //console.log(katexExpressionWithLink)
  useEffect(() => {
    katex.render(katexExpression, linkRef1.current as HTMLDivElement, {
      displayMode:true
    });
    katex.render('\\sqrt{2}', linkRef2.current as HTMLAnchorElement, {});
  }, [katexExpression]);

  return (
    <>
      <Link to={url ? url : ""} className={url ? "text-center text-blue-600 visited:text-purple-600" : "text-center "}>
        <div ref={linkRef1} className="inline">

      </div>
      </Link>
      <Link to='/a' ref={linkRef2} className={url ? "text-center text-blue-600 visited:text-purple-600 inline" : "text-center inline"} />
    </>
  )
  
  
}