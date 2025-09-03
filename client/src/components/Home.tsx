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
                <span className="fraction">
                    <span className="top">1</span>
                    <span className="bottom">6</span>
                </span>
            </div>

        </>
    )
}