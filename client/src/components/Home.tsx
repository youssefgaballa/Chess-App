//import katex from "katex";
//import { useRef, useEffect } from "react";
import { KaTeX } from "./KaTeX";
const katexFcts: string[] = [String.raw`\forall`, String.raw`\exist`, 
    String.raw`\land`,String.raw`\lor`,String.raw`\lnot`,
    String.raw`\in`, String.raw`\notin`, String.raw`\empty`, String.raw`\rightarrow`];

export function Home() {
    // TODO: Add routing to home page
    return (
        <>
        <div className="text-center">
            Home page
        </div>
        <KaTeX katexExpression={katexFcts[0]} url = {"/Notes"} />
        </>
    )
}