//import { toBeRequired } from "@testing-library/jest-dom/matchers";
function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

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

const noteToNum = Object.freeze({
    "C":0,
    "C#":1,
    "D":2,
    "D#":3,
    "E":4,
    "F":5,
    "F#":6,
    "G":7,
    "G#":8,
    "A":9,
    "A#":10,
    "B":11
})

class MusicString{
    constructor (open,frets){
        this.open = open;
        this.openNoOctave = open.substring(0,open.length-1);
        this.openNumNoOctave = getNoteNumNoOctave(open)
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




function solve(openStrings, ctList, stretch){

    
    let cts=[];
    for(let i=0;i<12;i++){
        if(ctList[i] === true){
            cts = cts.concat(names[i]);
        }
    }

    let musicStrings = []

    for(let i=openStrings.length-1; i>=0; i--){
            let s = new MusicString(openStrings[i]);
            musicStrings = musicStrings.concat(s);
    }

    let solutions = [];


    function backtrack(position, sofar, currentCTIndex, currentStringIndex, duplicate){

    
        if (currentCTIndex === cts.length && !duplicate){  //found all cts (when moves on it recurses on ct+1)
            return sofar;
        }
        if (currentStringIndex > musicStrings.length-1){  //ran out of strings - deadend - backtrack
            return null;
        }

        //if (position == 2){
        //    console.log( "looking for ", cts[currentCTIndex], " on the ",musicStrings[currentStringIndex].open," string with ",sofar , duplicate)
        //}
        
        //can current ct can be found on current string in current position and current string is not already taken? 
        //if so, save fret where found in a valid way
        let fretFound = null;
    
        if( sofar[currentStringIndex+1][0] === "X"){
            for(let i=position; i<position+stretch; i++){ //can quit early
                let toFind = cts[currentCTIndex]
                if(musicStrings[currentStringIndex].stringMap[i] === toFind){
                        fretFound = [i-position,toFind]  //save fret where found in a valid way
                        //console.log(musicStrings[currentStringIndex].openNumNoOctave)
                }
            }
    
        }
    
        //if can be found, update sofar solution to choose it, next ct, first string, recurse
       
        

        if(fretFound!==null){
            let newDuplicate = duplicate
            if (fretFound[0] == 0){
                newDuplicate = false
            }

            let newsofar = sofar.slice()
            newsofar[currentStringIndex+1] = fretFound;
            let check = backtrack(position, newsofar, currentCTIndex+1, 0,  newDuplicate)
            if(check !== null){ //if no dead end - this is valid solution
                
              
               solutions.push(check)
                return backtrack(position, sofar, currentCTIndex, currentStringIndex+1, duplicate)
    
            }else{ //if branch gets to a dead end, move on to next string
                //console.log("deadend")
                return backtrack(position, sofar, currentCTIndex, currentStringIndex+1, duplicate)
            }
        }else{ //if not found there, move on to next string
            return backtrack(position, sofar, currentCTIndex, currentStringIndex+1, duplicate);
        }
    }
    

    for(let i=0; i<=12; i++){
        let startSolve = [i]
        for(let j=0; j<openStrings.length; j++){    //start solve starts like {positionnumber, [[X,X],[X,X],[X,X],...,[X,X]}
            startSolve.push(["X","X"])
        }
        backtrack(i, startSolve, 0, 0 , solutions, true)
    }
    return solutions

}




export {solve};