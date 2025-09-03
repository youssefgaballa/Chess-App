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
    })
    const tex1 = '\\(\\href{/SampleComponent}{\\style{color: blue}{hi}} + bx + c = 0\\)'
    const tex2 = '\\[\\sum_{\\href{\\SampleComponent}{k}=0}^n \\]'
    return (
        <>
        <div className="text-center">
            Home page <br/>
            
                {tex1}
                <br/>
                {tex2}
            <br/><br/>
                <math>
                    
                    <mfrac>
                        <a href='/a'><mn>1</mn></a>
                        <mn>3</mn>
                    </mfrac>
                </math>
        </div>
        </>
    )
}