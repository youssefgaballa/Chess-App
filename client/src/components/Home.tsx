import Editor from "./editor/Editor"
import 'mathlive'
import { convertLatexToMarkup } from 'mathlive';


export function Home() {
  // TODO: Add routing to home page

    return (
        <>

            <header>
                Home page
            </header>

            <Editor />


        </>
    )
}