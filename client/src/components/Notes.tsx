import { useState, useRef, useLayoutEffect } from 'react'
import { katexFcts } from '../data';

export default function Notes() {
    //const [notes, setNotes] = useState("")
    
    const[x,setx] = useState(0);
    const[y,sety] = useState(0);
    const [hidden, setHidden] = useState<boolean>(true);

    const inputRef = useRef<HTMLDivElement>(null);
    //const listRef = useRef<HTMLUListElement>(null);
    const selectRef = useRef<HTMLUListElement>(null);
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
            //insertSelection(list.current[0]);
            setSelection();
            setHidden(false)

        }
    }

     const insertSelection = (match: string) => {
       
        const string = '\\';          
        const index = inputRef.current?.innerText.lastIndexOf(string);
        console.log("index: "+ index);
            if ((index !== undefined) && (index !== -1)) {
                const substring = inputRef.current?.innerText.substring(index);
                console.log("substring: " + substring);
                console.log("match: " + match);
                if ((substring !== undefined) && (inputRef.current?.innerText !== undefined)) {
                    inputRef.current.innerText = inputRef.current?.innerText.replace(substring, match)

                }
            }
             
          
    }
    
    const clickHandler = (event : React.MouseEvent<HTMLLIElement>) => {
        console.log("clickHandler:");
        //event.stopPropagation()
        const target = event.target as HTMLLIElement;
        const match = target.innerText;
        console.log("match: " + match);
        insertSelection(match);
        setHidden(true);
    }

    const List = () => {
        //console.log("<List/>: ");
        return (
            list.current.map((katexFct: string) => (
                <li key={katexFct} onClick={clickHandler}>{katexFct}</li>
            ))
        )
    }

    const keydownListener = () => {
        console.log("keydownListener(): ");
        
    }

    // const documentClickListener = (event: Event) => {
    //     console.log("documentClickListener(): ");
    //     if ((event.target != inputRef.current) && (event.target != selectRef.current)) {
    //         setHidden(true);
    //     }
    // }

    useLayoutEffect(() => {
        inputRef.current?.addEventListener('input', inputListener);
        inputRef.current?.addEventListener('keydown', keydownListener);
        //document.addEventListener('click', documentClickListener);
        return () => {
            inputRef.current?.removeEventListener('input', inputListener);
            inputRef.current?.removeEventListener('keydown', keydownListener);
            //document.removeEventListener('click', documentClickListener);

        }
        
    });
    //<ul id="autocomplete-list" className="border-1" role="listbox" ref={listRef} style = {{position: 'absolute', left:x, top:y}} hidden></ul>
    // <select size = {list.current.length} style={{appearance: 'none',  position: 'absolute', left: x, top: y}} ref={selectRef} hidden={hidden} onClick={clickHandler}>
    //          <List/>
    //     </select>
    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br/>
        <div id="MyText" className="border-2" contentEditable = "true" aria-autocomplete="list" aria-haspopup="true" aria-owns="autocomplete-list" ref={inputRef}  ></div>
        <ul style={{appearance: 'none',  position: 'absolute', left: x, top: y}} ref={selectRef} hidden={hidden}>
            <List/>
        </ul>
        </div>
        </>
    )

}