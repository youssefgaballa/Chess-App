import { katexNotes } from "./Home";


export default function Notes() {
    let onChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log("Notes onChange():");
        katexNotes[0] = e.target.value;
    };
    return (
        <>
        <div className="text-center">TODO: Add Notes</div>
        <div className="text-center">Editor: <br/>
        <textarea className="w-1/2 h-3/4 border border-black-500" onChange={onChange}/>
        </div>
        </>
    )

}