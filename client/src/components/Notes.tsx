import { useState, useRef, useLayoutEffect } from 'react'
import { katexFcts } from '../data';

export default function Notes() {
    const[x,setx] = useState(0);
    const[y,sety] = useState(0);
    const [hidden, setHidden] = useState<boolean>(true);
    const [focus, setFocus] = useState<number>(-1);

    const inputRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const list = useRef<string[]>([]);

    const setCaretCoords = () => {
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
            setCaretCoords();
            setHidden(false)

        }
    }

     const insertSelection = (match: string) => {
        const string = '\\';          
        const index = inputRef.current?.innerText.lastIndexOf(string);
        console.log("index: "+ index);
            if ((index !== undefined) && (index !== -1)) {
                const substring = inputRef.current?.innerText.substring(index);
                //console.log("substring: " + substring);
                //console.log("match: " + match);
                if ((substring !== undefined) && (inputRef.current?.innerText !== undefined)) {
                    inputRef.current.innerText = inputRef.current?.innerText.replace(substring, match)

                }
            }
             
          
    }
    
    const clickHandler = (event : React.MouseEvent<HTMLLIElement>) => {
        console.log("clickHandler():");
        event.stopPropagation()
        const target = event.target as HTMLLIElement;
        const match = target.innerText;
        console.log("match: " + match);
        insertSelection(match);
        setHidden(true);
    }

    const keydownListener = (event: KeyboardEvent) => {
        console.log("keydownListener(): ");
        //console.log("event.key: " + event.key);
        switch (event.key) {
            case ('ArrowUp'):{
                setFocus((prev) => {
                    if (prev == 0) {
                        return list.current.length - 1;
                    }
                    return prev - 1;
                });
                break;
            }
            case ('ArrowDown'):{
                setFocus((prev) => {
                    if (prev == list.current.length - 1) {
                        return 0;
                    }
                    return prev + 1;
                });
                break;
            }
            case ('Enter'):{
                const list = listRef.current?.childNodes[focus] as HTMLLIElement;
                insertSelection(list.textContent)
                event.preventDefault();
                setFocus(-1);
                setHidden(true);
                break;
            }
            case ('Escape'):{
                setFocus(-1);
                setHidden(true);
                break;
            }
        }
    }

    const documentClickListener = (event: Event) => {
        if ((event.target != inputRef.current) && (event.target != listRef.current)) {
            console.log("documentClickListener(): ");
            setHidden(true);
        }
    }

    useLayoutEffect(() => {
        const inputElement = inputRef.current;
        inputElement?.addEventListener('input', inputListener);
        inputElement?.addEventListener('keydown', keydownListener);
        document.addEventListener('click', documentClickListener);
        return () => {
            inputElement?.removeEventListener('input', inputListener);
            inputElement?.removeEventListener('keydown', keydownListener);
            document.removeEventListener('click', documentClickListener);
        }
    });
   
    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br/>
        <div id="MyText" className="border-2" contentEditable = "true" aria-autocomplete="list" aria-haspopup="true" aria-owns="autocomplete-list" ref={inputRef}  ></div>
        <ul style={{appearance: 'none',  position: 'absolute', left: x, top: y}} ref={listRef} hidden={hidden}>
            {list.current.map((katexFct: string, index: number) => (
                <li key={index} onClick={clickHandler} className = {(focus == index) ? 'selected' : ''}>{katexFct}</li>
            ))}
        </ul>
        </div>
        </>
    )

}