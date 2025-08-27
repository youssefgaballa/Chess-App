import katex from "katex";
import { useRef, useEffect } from "react";
import { KaTeX } from "./KaTeX";

export function Home() {
    // TODO: Add routing to home page
    let rightArrowTex: string = String.raw`\rightarrow`;
    return (
        <>
        <div className="text-center">
            Home page
        </div>
        <KaTeX texExpression={rightArrowTex} />
        </>
    )
}