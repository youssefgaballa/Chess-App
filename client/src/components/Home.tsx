//import katex from "katex";
//import { useRef, useEffect } from "react";
import { KaTeX } from "./KaTeX";
const katexfcts: string[] = [String.raw`\forall`, String.raw`\exist`, 
    String.raw`\land`,String.raw`\lor`,String.raw`\lnot`,
    String.raw`\in`, String.raw`\notin`, String.raw`\empty`, String.raw`\rightarrow`];

export let katexNotes: string[] = [];

export function Home() {
    // TODO: Add routing to home page
    console.log(katexNotes[0]);
    return (
        <>
        <div className="text-center">
            Home page
        </div>
        <KaTeX katexExpression={katexfcts[0]} url = {"/Notes"} />
        </>
    )
}