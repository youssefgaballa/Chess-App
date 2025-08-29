import { useState, useRef, useLayoutEffect } from 'react'
import { katexFcts } from '../data';

export default function Notes() {
    //const [notes, setNotes] = useState("")
    
    const[x,setx] = useState(0);
    const[y,sety] = useState(0);
    const inputRef = useRef<HTMLDivElement>(null);
    //const listRef = useRef<HTMLUListElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const list = useRef<string[]>([]);

   
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
        const text = inputRef.current?.textContent.trim();
        if (!text) {
            return;
        }
        if (text) {
            list.current = katexFcts.filter((katexFct: string) => {
                //console.log(katexFct);
                //console.log(text);
                // OR return katexFct.includes(text);
                return String.raw`${katexFct}`.includes(String.raw`${text}`);
            });
            console.log("list.current: " + list.current);
            // const list = 
            // ));
            // console.log(list);
        setSelection();

        }
    }

    const List = () => {
        console.log("<List/>: ");
        return (
            list.current.map((katexFct: string) => (
             <option key={katexFct} >{katexFct}</option>
                ))
        )
    }

    const keydownListener = () => {
        console.log("keydownListener(): ");
        
    }

    useLayoutEffect(() => {
        inputRef.current?.addEventListener('input', inputListener);
        inputRef.current?.addEventListener('keydown', keydownListener);

        return () => {
            inputRef.current?.removeEventListener('input', inputListener);
            inputRef.current?.removeEventListener('keydown', keydownListener);

        }
        
    });
    //<ul id="autocomplete-list" className="border-1" role="listbox" ref={listRef} style = {{position: 'absolute', left:x, top:y}} hidden></ul>

    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br/>
        <div id="MyText" className="border-2" contentEditable = "true" aria-autocomplete="list" aria-haspopup="true" aria-owns="autocomplete-list" ref={inputRef}  ></div>
        <select size = {list.current.length} style={{position: 'absolute', left: x, top: y}} ref={selectRef}>
             <List/>
        </select>
            
        

        
        </div>
        </>
    )

}