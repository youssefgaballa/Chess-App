import { Fraction } from "../components/Math-SVG/Fraction"

//creates infinite loop with nested /frac
//work in progress
export const svgRender = (math: string, isNum?: boolean) => {
    console.log("math: " + math);
    console.log("isNum = " + isNum);
        if (math.startsWith('\\frac')) {
            // Use regular expression to throw if the syntax is incorrect
            const numEnd:number = math.indexOf('}');
            //console.log("numEnd = " + numEnd);
            const num:string = math.substring(6, numEnd);
            console.log("num = " + num);
            const denomEnd:number = math.substring(0, numEnd+2).length + math.substring(numEnd+2).indexOf('}');
            //console.log("math.substring(numEnd+1): " + math.substring(numEnd + 2));
            //console.log("denomEnd = " + denomEnd);
            const denom= math.substring(numEnd+2, denomEnd)
            console.log("denom = " + denom);
            return <Fraction num={num} denom={denom} />
        } else {
            if (isNum) {
                return <text x='10' y='20'>{math}</text>
            } else {
                return <text x='10' y='35'>{math}</text>
            }
        }
        return null;
    }