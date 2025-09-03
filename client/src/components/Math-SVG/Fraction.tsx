//import { svgRender } from "../../util/MathFunctions";
import { useEffect, useRef, useState } from "react";
//export const Fraction = ({ isNumerator, level} : { isNumerator: boolean, level: number}) => {

export const Fraction = () => {
    //const svgRef = useRef<SVGSVGElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const denomRef = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");

    //In progress
    // const parseMath = (math: string) => {
    //     console.log("math.charAt(0) = " + math.charAt(0));
    //     if (math.charAt(0) == '\\') {
    //         return svgRender('fraction');
    //     }
    // }

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

    },[])  

    const onKeyDown = () => {
        //console.log("onKeyDown");
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
    //<text x='10' y='15'>{num}</text>
    //            <foreignObject height='20' width='20' x='5' y='20'> <div contentEditable='true' className='editable'></div></foreignObject>
    //{num && <Fraction num={false} denom = {false}/>}<
        // < svg style = {{ display: 'inline' }} ref = { svgRef } >
        //         <foreignObject height='50%' width='100%' x='0%' y='0%'> <div contentEditable='true' className=''>{num}</div></foreignObject>

        //     <line x1='0%' x2='100%' y1='50%' y2='50%' stroke='black' />
        //     <foreignObject height='50%' width='100%' x='0%' y='50%'> <div contentEditable='true' className=''>{denom}</div></foreignObject>


        //     </svg >
    
    return (
        <>
            <svg width={width} height={height}>
                <foreignObject height='50%' width='100%' x='0%' y='0%' overflow='visible'> 
                    <div ref={numRef} contentEditable='true' className='numerator'  onKeyDown={onKeyDown}></div>
                </foreignObject>

                <line x1='0%' x2='100%' y1='50%' y2='50%' stroke='black' />
                <foreignObject height='50%' width='100%' x='0%' y='50%'> 
                    <div ref={denomRef} contentEditable='true' className='numerator' onKeyDown={onKeyDown}></div>
                </foreignObject>

            </svg>

        </>
       



    )
}


   



