import { useEffect, useRef, useState } from "react";
import { Fraction } from "./Math-SVG/Fraction";

export const NotesEditor = () => {
    const inputRef = useRef<HTMLDivElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const [equations, setEquations] = useState<string[]>([]);

    // const insertFraction = () => {

    // }

    const keydownListener = (event: KeyboardEvent) => {
        console.log(event.key);
        switch (event.key) {
            case ('/'): {
                setEquations((prev) => prev.concat('frac'))
                break;
            }
            
        }
    }

     useEffect(() => {
        const inputElement = inputRef.current;

        inputElement?.addEventListener('keydown', keydownListener);
        console.log("equations = " + equations);
           
        return () => {

            inputElement?.removeEventListener('keydown', keydownListener);

        }
        });


    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br />
             <div className="border-2" contentEditable="true" ref={inputRef}></div>

             Output: <br/>
            <div ref = {outputRef}>
                    {equations.map((eqn, index) => <Fraction key={index} isNumerator={true} level={1}/>
                )}
             </div>
        </div>
        </>
    )
}