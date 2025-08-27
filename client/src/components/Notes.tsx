import { katexNotes } from "./Home";


export default function Notes() {
    katexNotes[0] = "hi";
    console.log(katexNotes[0]);
    return (
        <>
        <div className="text-center">TODO: Add Notes</div>
        <div className="text-center">Editor</div>

        </>
    )

}