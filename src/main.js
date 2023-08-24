

function getNoteNum(noteName){
    let letterName = noteName.substring(0,noteName.length-1);
    let octave = noteName.substring(noteName.length-1,noteName.length);
    let num = nameMap.get(letterName);
    num += (parseInt(octave)+1)*12;
    return num
}
function getNoteNumNoOctave(noteName){
    let letterName = noteName.substring(0,noteName.length-1);
    let num = nameMap.get(letterName);
    return num
}

function getNoteName(noteNum){
    let letterNoteNum = noteNum%12;
    let letterName = names[letterNoteNum];
    let octave = Math.floor(noteNum/12) -1;
    return letterName.concat(octave.toString());
}
function getNoteNameNoOctave(noteNum){
    let letterNoteNum = noteNum%12;
    let letterName = names[letterNoteNum];
    return letterName;
}


const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let nameMap = new Map();
for(let i=0;i<12;i++){
    nameMap.set(names[i],i);
}

class MusicString{
    constructor (open,frets){
        this.open = open;
        this.openNoOctave = open.substring(0,open.length-1);
        this.tab = open.concat("    ");
        this.openIsChordTone=false;
        this.stringMap = new Map();
        if(frets===undefined){
            this.frets=24;
        }else{
            this.frets = frets;
        }
    
        this.buildMap();
    }


    buildMap(){
        let current = getNoteNumNoOctave(this.open);
        for(let i=0;i<this.frets;i++){
            this.stringMap[i] = names[current];
            current+=1;
            if (current === 12){
                current=0;
            }
        }
    } 



    printTab(){
        console.log(this.tab);
        this.tab = this.open+"    ";
    }
    clearTab(){
        this.tab = this.open+"    ";
    }
    add(input){
        this.tab=this.tab.concat(input);
    }
    addOpen(input){
        if(this.open.length<2){
            this.tab=this.open+"  "+input+"  ";
        }
        else{
            this.tab=this.open+" "+input+"  ";
        }
    }
    
}


function backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex, solutions){

    
    if (currentCTIndex === cts.length){  //found all cts (when moves on it recurses on ct+1)
        return sofar;
    }
    if (currentStringIndex > musicStrings.length-1){  //ran out of strings - deadend - backtrack
        return null;
    }
    console.log( "looking for ", cts[currentCTIndex], " on the ",musicStrings[currentStringIndex].open," string with ",sofar )


    
    //can current ct can be found on current string in current position and current string is not already taken? 
    //if so, save fret where found in a valid way
    let fretFound = null;
    for(let i=position; i<position+stretch; i++){ //can quit early
        let toFind = cts[currentCTIndex]
        console.log(musicStrings[currentStringIndex].stringMap[i])
        if(musicStrings[currentStringIndex].stringMap[i] === toFind  && 
            sofar[currentStringIndex+1][0] === "X"){
                fretFound = [i-position,toFind]  //save fret where found in a valid way
        }
    }

    //if can be found, update sofar solution to choose it, next ct, first string, recurse
    if(fretFound!==null){
        let newsofar = sofar.slice()
        newsofar[currentStringIndex+1] = fretFound;
        let check = backtrack(musicStrings, cts, position, stretch, newsofar, currentCTIndex+1, 0, solutions)
        if(check !== null){ //if no dead end - this is valid solution
            
            //don't include solution if its a duplicate - doesn't use the first fret - appears shifted up
            let duplicate = true;
            //console.log("soltion: ",newsofar)
            for(let i=1; i<newsofar.length; i++){
                //console.log(newsofar[i][0])
                if(newsofar[i][0] === 0){
                    duplicate = false;
                }
            }
            if(!duplicate){
                solutions.push(check);
            }else{
                //console.log("blocked: ", newsofar);
            }
            /**? */
            //if(check!==null){console.log(check, ",")}
            return backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex+1,solutions)

        }else{ //if branch gets to a dead end, move on to next string
            return backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex+1,solutions)
        }
    }else{ //if not found there, move on to next string
        return backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex+1,solutions);
    }
}


function solve(openStrings, cts, stretch){
    
    let musicStrings = []

    for(let i=openStrings.length-1; i>=0; i--){
            let s = new MusicString(openStrings[i]);
            musicStrings = musicStrings.concat(s);
    }

    let solutions = [];

    for(let i=0; i<=15; i++){
        let startSolve = [i]
        for(let j=0; j<openStrings.length; j++){
            startSolve.push(["X","X"])
        }
        backtrack( musicStrings, cts, i, stretch, startSolve, 0, 0 , solutions)
    }
    return solutions

}




export {solve};