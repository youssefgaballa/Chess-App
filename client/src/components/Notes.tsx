import { useState, useRef, useEffect } from 'react'
import { katexFcts } from '../data';

export default function Notes() {
    //const [notes, setNotes] = useState("")
    
    const[x,setx] = useState(0);
    const[y,sety] = useState(0);
    const inputRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

   
    // const onChange = (e : React.ChangeEvent<HTMLDivElement>) => {
    //     setNotes(e.target.title);
    // };
    const setSelection = () => {
        const selection = window.getSelection();
        //console.log("setSelection")
        if (selection) {
            if (selection.rangeCount !== 0) {
                const range = selection.getRangeAt(0).cloneRange();
                range.collapse(true);
                const rect = range.getBoundingClientRect();
                    if (rect) {
                        setx(rect.left);
                        sety(rect.bottom);
                        // return {x: rect.left, y: rect.bottom}
                    }
            }
        };
    }

    const inputListener = () => {
        console.log("inputListener(): ");
        //console.log("katexFcts: " + katexFcts);
        //console.log("\\forall");
        const text = inputRef.current?.textContent;
        if (!text) {
            return;
        }
        if (text) {
            const matches = katexFcts.filter((katexFct, index) => {
                //console.log(katexFct);
                //console.log(text);
                return String.raw`${katexFct}`.includes(String.raw`${text}`);
            });
            console.log(matches);
        setSelection();

        }
    }

    const keydownListener = () => {
        console.log("keydownListener(): ");
        
    }

    useEffect(() => {
        inputRef.current?.addEventListener('input', inputListener);
        inputRef.current?.addEventListener('keydown', keydownListener);

        return () => {
            inputRef.current?.removeEventListener('input', inputListener);
            inputRef.current?.removeEventListener('keydown', keydownListener);

        }
        
    });


    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br/>
        <div id="MyText" className="border-2" contentEditable = "true" aria-autocomplete="list" aria-haspopup="true" aria-owns="autocomplete-list" ref={inputRef}  ></div>
        <ul id="autocomplete-list" className="autocomplete-list" role="listbox" hidden ref={listRef}></ul>
        
         <select size={2} className = "" style={{position: 'absolute', left: x, top: y}} ref={selectRef}>
            <option>Option 1</option>
            <option>Option 2</option>
        </select>
        {katexFcts.map((katexFct: string) => ( //Testing map function
            <li key={katexFct}>{katexFct}</li>
        ))}
        </div>
        </>
    )

}