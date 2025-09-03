//import katex from "katex";
//import { useRef, useEffect } from "react";
//import { katexFcts } from "../data";
// import { Fraction } from "./Math-SVG/Fraction";
// import { svgRender } from "../util/MathFunctions";


export function Home() {
    // TODO: Add routing to home page

    //<SVG type='fraction' {num = '2' , denom ='3'}/>
    return (
        <>
            <div className="text-center">
                Home page
                <br/>
                <svg width='300' height='300'>
                    <foreignObject x="20" y="20" width="50" height="50">
                        <div contentEditable='true'>
                            hi
                        </div>
                    </foreignObject>
                </svg>
            </div>
        </>
    )
}