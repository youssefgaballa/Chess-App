//import katex from "katex";
//import { useRef, useEffect } from "react";
//import { katexFcts } from "../data";

export function Home() {
    // TODO: Add routing to home page
    return (
        <>
        <div className="text-center">
            Home page
        </div>
        <br/>
        <div> MathJax doesnt load unless components rerender <br/>
            \(ax^2 + bx + c = 0\)
            <br/>
        </div>

        </>
    )
}