//import katex from "katex";
//import { useRef, useEffect } from "react";
import { KaTeX } from "./KaTeX";
import { katexFcts } from "../data";

export function Home() {
    // TODO: Add routing to home page
    return (
        <>
        <div className="text-center">
            Home page
        </div>
        
        <KaTeX katexExpression="\sqrt{2}" url = {"/Notes"} />
        </>
    )
}