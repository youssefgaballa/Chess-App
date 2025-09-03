//import { svgRender } from "../../util/MathFunctions";
import { useEffect, useRef, useState } from "react";
//export const Fraction = ({ isNumerator, level} : { isNumerator: boolean, level: number}) => {

export const Fraction = () => {
    //const svgRef = useRef<SVGSVGElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const denomRef = useRef<HTMLDivElement>(null);
    const [equations, setEquations] = useState<string[]>([]);


    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");

   

    useEffect(() => {
        if ((numRef.current?.clientWidth.toString()) && (numRef.current?.clientHeight.toString())
            && (denomRef.current?.clientWidth.toString()) && (denomRef.current?.clientHeight.toString())) {
            const maxWidth = (Math.max(numRef.current?.clientWidth, denomRef.current?.clientWidth)).toString();
            const maxHeight = Math.max(numRef.current?.clientHeight * 2, denomRef.current?.clientHeight * 2).toString();
            setWidth(maxWidth);
            setHeight(maxHeight);
            //console.log("width: " + width);
            // console.log("height" + height);
        }
        //document.addEventListener('click', documentClickListener);

        // return () => {
        //     document.removeEventListener('click', documentClickListener);
        // }
    },[]) 

    // const documentClickListener = (event: Event) => {
    //     //todo: remove the background color from all fractions
    // }

    const onKeyDown = (event: KeyboardEvent) => {
        //console.log("onKeyDown");
        switch (event.key){
            case ('/'): {
                console.log("case(/):");
                setEquations((prev) => prev.concat('frac'))

                break;
            }

        }
        if ((numRef.current?.clientWidth.toString()) && (numRef.current?.clientHeight.toString())
            && (denomRef.current?.clientWidth.toString()) && (denomRef.current?.clientHeight.toString())) {
            const maxWidth = (Math.max(numRef.current?.clientWidth, denomRef.current?.clientWidth)).toString();
            const maxHeight = Math.max(numRef.current?.clientHeight * 2, denomRef.current?.clientHeight * 2).toString();
            setWidth(maxWidth);
            setHeight(maxHeight);
             //dconsole.log("width: " + width);
            // console.log("height" + height);
        }
    }

    const onClick = (event: Event) => {
        const target = event.target as HTMLDivElement;
        target.style.backgroundColor = 'lightgray';
        

    }

    //{num && <Fraction num={false} denom = {false}/>}<
   
    return (
        <>
            <svg width={width} height={height}>
                <foreignObject height='50%' width='100%' x='0%' y='0%' overflow='visible'> 
                    <div ref={numRef} contentEditable='true' className='numerator' onClick = {onClick} onKeyDown={onKeyDown}>
                        {equations.map(() => <Fraction />
                    )}
                    </div>
                </foreignObject>

                <line x1='0%' x2='100%' y1='50%' y2='50%' stroke='black' />
                <foreignObject height='50%' width='100%' x='0%' y='50%'> 
                    <div ref={denomRef} contentEditable='true' className='numerator' onClick={onClick}  onKeyDown={onKeyDown}></div>
                </foreignObject>

            </svg>

        </>
       



    )
}


   



