import { useEffect, useRef } from "react";

export const NotesEditor = () => {
    const inputRef = useRef<HTMLDivElement>(null);
    
    const keydownListener = (event: KeyboardEvent) => {
        console.log(event.key);
        switch (event.key) {
            case ('a'): {
                
                break;
            }
            
        }
    }

     useEffect(() => {
            const inputElement = inputRef.current;

            inputElement?.addEventListener('keydown', keydownListener);

           
            return () => {

                inputElement?.removeEventListener('keydown', keydownListener);

            }
        });


    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br />
             <div className="border-2" contentEditable="true" ref={inputRef}></div>

             Output: <br/>
            <div >

             </div>
        </div>
        </>
    )
}