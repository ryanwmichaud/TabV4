//import { toBeRequired } from "@testing-library/jest-dom/matchers";



const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let nameMap = Object.freeze({
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
    constructor (open){
        this.open = open;
        this.stringMap = new Map();
        this.buildMap();
    }

    buildMap(){
        let current = nameMap[this.open];
        for(let i=0;i<17;i++){  //12th fret + max stretch of 6
            this.stringMap[i] = names[current];
            current+=1;
            if (current === 12){
                current=0;
            }
        }
    } 
}


function solve(openStrings, ctList, stretch){
    console.log(openStrings)
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
              
        let possible = false    //if can't use first fret of the position, can't produce a valid, nonduplicate voicing
        for(let stringIndex=0; stringIndex<musicStrings.length; stringIndex++){
            if( cts.includes(musicStrings[stringIndex].stringMap[position]) ){
                possible = true;
            }
        }

        if (possible){
            let startSolve = [position]
            for(let j=0; j<openStrings.length; j++){    //start solve starts like {positionnumber, [[X,X],[X,X],[X,X],...,[X,X]}
                startSolve.push(["X","X"])
            }
            backtrack(position, startSolve, 0, 0 , solutions, true)
        }
        
    }
    return solutions

}

let p1 = ["C","G","D","A"] //strings
let p2 = [
    true,  false, false,
    false, true,  false,
    false, true,  false,
    true,  false, false
  ] 
let p3 = 4
console.log(solve(p1,p2,p3))

