//import katex from "katex";
import {  useEffect } from "react";
//import { katexFcts } from "../data";

export function Home() {
    // TODO: Add routing to home page
    useEffect(() => {
        if ((window?.MathJax.typesetClear) && (window?.MathJax.typeset)) {
            console.log("window.MathJax.typeset();");
            window.MathJax.typesetClear();
            window.MathJax.typeset();
        }
    });
    const tex1 = '\\(\\href{/SampleComponent}{\\style{color: blue}{hi}} + bx + c = 0\\)'
    //const tex2 = '\\[\\sum_{\\href{\\SampleComponent}{k}=0}^n \\]'
    const tex3 = '\\[ \\frac{\\frac{\\frac{1}{2}}{3}}{2} \\]'
    return (
        <>
        <div className="text-center">
            Home page <br/>
            
                {tex1}
                <br/>
                {tex3}
            <br/><br/>
              
        </div>
        </>
    )
}