import { useState } from 'react'

export default function Notes() {
    const [notes, setNotes] = useState("")

    const onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };
    console.log("Render notes: " + notes);
    return (
        <>
        <div className="text-center h-1/2 w-full">Editor: <br/>
        <textarea className="w-3/4 h-full border border-black-500 " onChange={onChange}/>
        <br/>
        <select>
            <option>Sample value</option>
        </select>
        </div>
        </>
    )

}