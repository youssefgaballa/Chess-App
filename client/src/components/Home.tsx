//import katex from "katex";
//import { useRef, useEffect } from "react";
//import { katexFcts } from "../data";
import { KaTeX } from "./KaTeX"

export function Home() {
    // TODO: Add routing to home page
    return (
        <>
        <div className="text-center">
            Home page <br/>
            <KaTeX katexExpression='\sqrt{2}' url ='/SampleComponent'/>
        </div>
        </>
    )
}