//import { toBeRequired } from "@testing-library/jest-dom/matchers";

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





function solve3(openStrings, ctList, stretch){
    
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


    function backtrack(position, sofar, currentCTIndex, currentStringIndex){

        if (currentCTIndex === cts.length){  //found all cts (when moves on it recurses on ct+1). also, did we find at least one note on the first position fret? if not its shifted up
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
            for(let i=position; i<position+stretch; i++){ //theres def a better way
                let toFind = cts[currentCTIndex]
                if(musicStrings[currentStringIndex].stringMap[i] === toFind){
                        fretFound = [i-position,toFind]  //save fret where found in a valid way
                }
            }
    
        }
    
        //if can be found, update sofar solution to choose it, next ct, first string, recurse
       
        

        if(fretFound!==null){
            

            let newsofar = sofar.slice()
            newsofar[currentStringIndex+1] = fretFound;
            let check = backtrack(position, newsofar, currentCTIndex+1, 0  )
            if(check !== null){ //if no dead end - this is valid solution
                
                let duplicate = true
                for(let i=1; i<newsofar.length; i++){
                    //console.log(newsofar[i][0])
                    if(newsofar[i][0] === 0){
                        duplicate = false;
                        break
                    }
                }
                if (!duplicate){
                    solutions.push(check)
                }

                return backtrack(position, sofar, currentCTIndex, currentStringIndex+1)
    
            }else{ //this possible choice leads to a dead end, move on to next string
               
                return backtrack(position, sofar, currentCTIndex, currentStringIndex+1)
            }
        }else{ //there was no possible choice, move on to next string
            return backtrack(position, sofar, currentCTIndex, currentStringIndex+1);
        }
    }
    

    for(let position=0; position<=12; position++){
              
        let duplicate = true
        for(let stringIndex=0; stringIndex<musicStrings.length; stringIndex++){
            //console.log(musicStrings[stringIndex].open,position, musicStrings[stringIndex].stringMap[position], cts)
            if( cts.includes(musicStrings[stringIndex].stringMap[position]) ){
                //console.log(false)
                duplicate = false;
            }
        }
        if (!duplicate){
            let startSolve = [position]
            for(let j=0; j<openStrings.length; j++){    //start solve starts like {positionnumber, [[X,X],[X,X],[X,X],...,[X,X]}
                startSolve.push(["X","X"])
            }
            backtrack(position, startSolve, 0, 0 , solutions, true)
        }
        
    }
    return solutions

}
function solve3_1(openStrings, ctList, stretch){
    

    
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


    function backtrack(position, sofar, currentCTIndex, currentStringIndex){

        if (currentCTIndex === cts.length){  //found all cts (when moves on it recurses on ct+1). also, did we find at least one note on the first position fret? if not its shifted up
            return sofar;
        }
        if (currentStringIndex > musicStrings.length-1){  //ran out of strings - deadend - backtrack
            return null;
        }
        
        if (openStrings[currentStringIndex] === "ignore1"){
            backtrack(position, sofar, currentCTIndex, currentStringIndex+1)
        }

        //if (position == 2){
        //    console.log( "looking for ", cts[currentCTIndex], " on the ",musicStrings[currentStringIndex].open," string with ",sofar , duplicate)
        //}
        
        //can current ct can be found on current string in current position and current string is not already taken? 
        //if so, save fret where found in a valid way
        let fretFound = null;
    
        if( sofar[currentStringIndex+1][0] === "X"){
            for(let i=position; i<position+stretch; i++){ //theres def a better way
                let toFind = cts[currentCTIndex]
                if(musicStrings[currentStringIndex].stringMap[i] === toFind){
                        fretFound = [i-position,toFind]  //save fret where found in a valid way
                }
            }
    
        }
    
        //if can be found, update sofar solution to choose it, next ct, first string, recurse
       
        

        if(fretFound!==null){
            

            let newsofar = sofar.slice()
            newsofar[currentStringIndex+1] = fretFound;
            let check = backtrack(position, newsofar, currentCTIndex+1, 0  )
            if(check !== null){ //if no dead end - this is valid solution
                
                let duplicate = true
                for(let i=1; i<newsofar.length; i++){
                    //console.log(newsofar[i][0])
                    if(newsofar[i][0] === 0){
                        duplicate = false;
                        break
                    }
                }
                if (!duplicate){
                    solutions.push(check)
                }

                return backtrack(position, sofar, currentCTIndex, currentStringIndex+1)
    
            }else{ //this possible choice leads to a dead end, move on to next string
               
                return backtrack(position, sofar, currentCTIndex, currentStringIndex+1)
            }
        }else{ //there was no possible choice, move on to next string
            return backtrack(position, sofar, currentCTIndex, currentStringIndex+1);
        }
    }
    

    for(let position=0; position<=12; position++){
              
        let duplicate = true
        for(let stringIndex=0; stringIndex<musicStrings.length; stringIndex++){
            //console.log(musicStrings[stringIndex].open,position, musicStrings[stringIndex].stringMap[position], cts)
            if( cts.includes(musicStrings[stringIndex].stringMap[position]) ){
                //console.log(false)
                duplicate = false;
            }
        }
        if (!duplicate){
            let startSolve = [position]
            for(let j=0; j<openStrings.length; j++){    //start solve starts like {positionnumber, [[X,X],[X,X],[X,X],...,[X,X]}
                startSolve.push(["X","X"])
            }
            backtrack(position, startSolve, 0, 0 , solutions, true)
        }
        
    }
    return solutions

}



let p1 = ["ignore1","ignore1","D4","G4","B4","E4"] //strings
let p2 = [
    true,  false, false,
    false, true,  false,
    false, true,  false,
    true,  false, false
  ] 
let p3 = 4
let iterations = 10000

let sum3 = 0 
for(let i = 0;i<iterations;i++){
    let start = performance.now();
    solve3(p1,p2,p3)
    let end = performance.now();
    let timeTaken = end - start;
    sum3 += timeTaken
}
let sum3_1 = 0 
for(let i = 0;i<iterations;i++){
    let start = performance.now();
    solve3_1(p1,p2,p3)
    let end = performance.now();
    let timeTaken = end - start;
    sum3_1 += timeTaken
}

console.log("num strings:", p1.length)
console.log("chord length:", p2.length)
console.log("stretch:", p3)
console.log("iterations:", iterations)

console.log( sum3/iterations, "normal")
console.log( sum3_1/iterations, "skip ignored strings at top")
