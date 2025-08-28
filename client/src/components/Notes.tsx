import { useState, useRef, useEffect } from 'react'

export default function Notes() {
    const [notes, setNotes] = useState("")
    const ref = useRef<HTMLTextAreaElement>(null);
    
    const onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    useEffect(() => {
        console.log("selection start" + ref.current?.selectionStart);
        console.log("offsetLeft" + ref.current?.offsetLeft);
        console.log("offsetParent" + ref.current?.offsetParent);

    }, [notes]);
    //console.log("Render notes: " + notes);
    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br/>
        <textarea className="w-3/4 h-full border border-black-500 " onChange={onChange} ref={ref}/>
        <br/>
        <select className={`absolute z-2`}>
            <option>Sample value</option>
        </select>
        </div>
        </>
    )

}