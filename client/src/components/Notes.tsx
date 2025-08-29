import { useState, useRef, useEffect } from 'react'

export default function Notes() {
    //const [notes, setNotes] = useState("")
    
    const[x,setx] = useState(0);
    const[y,sety] = useState(0);
    const editableRef = useRef<HTMLDivElement>(null);

   
    // const onChange = (e : React.ChangeEvent<HTMLDivElement>) => {
    //     setNotes(e.target.title);
    // };
    const setSelection = () => {
        const selection = window.getSelection();
        console.log("setSelection")
        if (selection) {
            if (selection.rangeCount !== 0) {
                const range = selection.getRangeAt(0).cloneRange();
                range.collapse(true);
                const rect = range.getClientRects()[0];
                    if (rect) {
                        setx(rect.left);
                        sety(rect.top+20);
                    }
            }
        };
    }

    useEffect(() => {
        document.addEventListener('input', setSelection);
        return () => {
            document.removeEventListener('input', setSelection);
        }
        
    });

    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br/>
        <div contentEditable = "true" ref={editableRef} className="border-2" ></div>
        <select size={2} className = "overflow-auto" style={{position: 'absolute', left: x, top: y}}>
            <option>Option 1</option>
            <option>Option 2</option>
        </select>
        </div>
        </>
    )

}