//import katex from "katex";
import {  useEffect } from "react";
//import { katexFcts } from "../data";

export function Home() {
    // TODO: Add routing to home page
    useEffect(() => {
        if (typeof window?.MathJax !== "undefined") {
            console.log("window.MathJax.typeset();");
            window.MathJax.typesetClear();
            window.MathJax.typeset();
        }
    })
    return (
        <>
        <div className="text-center">
            Home page <br/>
            <a href='/a'>
                \(ax^2 + bx + c = 0\)
            </a>
        </div>
        </>
    )
}