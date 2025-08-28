import { useState } from 'react'

export default function Notes() {
    const [notes, setNotes] = useState("")

    const onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };
    console.log("Render notes: " + notes);
    return (
        <>
        <div className="text-center">Editor: <br/>
        <textarea className="w-1/2 h-3/4 border border-black-500" onChange={onChange}/>
        </div>
        </>
    )

}