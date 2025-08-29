import { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'

export default function Notes() {
    const [notes, setNotes] = useState("")
    const ref = useRef<HTMLTextAreaElement>(null);

    const StyledSelect = styled('select')`
        color: red;
    `
    
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
        <StyledSelect>
            <option>Sample value</option>
        </StyledSelect>
        </div>
        </>
    )

}