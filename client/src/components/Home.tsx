import katex from "katex";
import { useRef, useEffect } from "react";

export function Home() {
    // TODO: Add routing to home page
    const divRef:any = useRef<HTMLInputElement>(null);
    const rightArrowTex = "\rightarrow";
    //console.log(divRef.current);

    useEffect(() => {
        //katex.render(rightArrowTex, divRef.current as HTMLInputElement); 
    },[])

    return (
        <>
        <div className="text-center">
            Home page
        </div>
        <div ref={divRef} defaultValue = "3"></div>
        </>
    )
}