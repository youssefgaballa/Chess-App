//import katex from "katex";
//import { useRef, useEffect } from "react";
import { KaTeX } from "./KaTeX";

export function Home() {
    // TODO: Add routing to home page
    const rightArrowKaTeX: string = String.raw`\rightarrow`;
    return (
        <>
        <div className="text-center">
            Home page
        </div>
        <KaTeX katexExpression={rightArrowKaTeX} url = {"/Notes"} />
        </>
    )
}