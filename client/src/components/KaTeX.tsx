import katex from "katex";
import { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

export function KaTeX({ texExpression}: { texExpression: string}) {
  const containerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    katex.render(texExpression, containerRef.current as HTMLInputElement);
  }, [texExpression]);

  return <div ref={containerRef}/>;
}
