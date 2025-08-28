import { katexNotes } from "./Home";
import { useState } from 'react'


export default function Notes() {
    let [notes, setNotes] = useState("")

    let onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };
    return (
        <>
        <div className="text-center">Editor: <br/>
        <textarea className="w-1/2 h-3/4 border border-black-500" onChange={onChange}/>
        </div>
        </>
    )

}