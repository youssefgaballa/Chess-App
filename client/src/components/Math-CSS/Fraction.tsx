import { useEffect, useRef, useState } from "react";

export const Fraction = () => {
    const numRef = useRef<HTMLDivElement>(null);
    const denomRef = useRef<HTMLDivElement>(null);
    const [equations, setEquations] = useState<string[]>([]);


    const onKeyDown = (event: KeyboardEvent) => {
        //console.log("onKeyDown");
        switch (event.key) {
            case ('/'): {
                console.log("case(/):");
                setEquations((prev) => prev.concat('frac'))
                break;
            }

        }
    }

    return (
        <span className="fraction">
            <span ref={numRef} className="top" contentEditable='true' onKeyDown={onKeyDown}>
                {equations.map((index) => <span className='tail'>{'\u00a0'}<Fraction key={index} /></span>
            )}
            </span>
            <br/>
            <span ref={denomRef} className="bottom" contentEditable='true' onKeyDown={onKeyDown}></span>
        </span>
            
    )
}