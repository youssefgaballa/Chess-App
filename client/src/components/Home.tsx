import { useRef } from "react";

export function Home() {
    // TODO: Add routing to home page
    const divRef:any = useRef(0);
    console.log(divRef.current);
    return (
        <div className="text-center" ref={divRef}>Home page</div>
    )
}