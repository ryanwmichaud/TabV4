

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
            this.frets=12;
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

function generate(openStrings,chordTones, stretch){

    if(stretch===undefined){
        stretch = 4;
    }

    console.log(stretch);


    let musicStrings = []

    for(let i=openStrings.length-1; i>=0; i--){
        let s = new MusicString(openStrings[i]);
        musicStrings = musicStrings.concat(s);
    }
    
    
    
    let checklist = chordTones.slice();
    
    
    for(let stringNum=0;stringNum<musicStrings.length;stringNum++){ //set if any open strings are cts
        let currentString = musicStrings[stringNum];
        if(chordTones.includes(currentString.openNoOctave)){
            currentString.openIsChordTone = true;
        }
    }


   

    let solutions=[]
    

    for(let position=0;position<12;position++){  //for each position
        checklist = chordTones.slice()
        let solution = [position];
        for (let i=0; i<musicStrings.length;i++){
            solution.push([])
        }
        
        for(let stringNum=0;stringNum<musicStrings.length;stringNum++){      //for each string

            let currentString = musicStrings[stringNum];
           
            //if(currentString.openIsChordTone){                      //check if open is ct
                //solution[stringNum+1].push(0);   
                //bug here I think                 //add open to solution
                //checklist.splice(checklist.indexOf(currentString.openNoOctave)); //update we have it covered - remove from checklist
            //}
    
            for(let i=position;i<position+stretch;i++){      //for each fret in the position add it if were looking for it
                let note = currentString.stringMap[i];
                if(chordTones.includes(note) ){
                    //add to solution and remove from checklist
                    solution[stringNum+1].push(note);
                    if(checklist.indexOf(note) !== -1){
                        checklist.splice(checklist.indexOf(note),1);
                    }
                    
                    //console.log(position,'found ', note, ' on ', stringNum, checklist);
                }
                else{
                    solution[stringNum+1].push(" ");
                }
    
            }  
    
        }
        if(checklist.length === 0){                     //complete solution
            //save solution sand mark position found and add to the list os solutions
            solutions.push(solution)
        }else{
            //clear solution and don't add to the list
        }
     
    }

    return(solutions);
} 











openStrings = ["E4","A4","D5","G5","B5","E6"]
cts = ["D","F#","A", "C#"]
stretch = 2
position = 2
let musicStrings = []

for(let i=openStrings.length-1; i>=0; i--){
        let s = new MusicString(openStrings[i]);
        musicStrings = musicStrings.concat(s);
}




//for(let i=0; i<12; i++){
    console.log(backtrack( musicStrings, cts, 10, stretch,["X","X","X","X","X","X"], 0, 0 , []))
//}


function backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex, solutions){

    //console.log( "looking for ", cts[currentCTIndex], " on the ",musicStrings[currentStringIndex].open," string with ",sofar )
    
    if (currentCTIndex === cts.length){  //found all cts (when moves on it recurses on ct+1)
        console.log("done")
        return sofar;
    }
    if (currentStringIndex > musicStrings.length-1){  //ran out of strings - deadend - backtrack
        console.log("back")

        return null;
    }

    
    //can current ct can be found on current string in current position and current string is not already taken? 
    //if so, save fret where found in a valid way
    fretFound = null;
    for(let i=position; i<position+stretch; i++){ //can quit early
        console.log(musicStrings[currentStringIndex].stringMap[i],cts[currentCTIndex] )
        if(musicStrings[currentStringIndex].stringMap[i] === cts[currentCTIndex]  && 
            sofar[currentStringIndex] === "X"){
                fretFound = i  //save fret where found in a valid way
        }
    }

    //if can be found, update sofar solution to choose it, next ct, first string, recurse
    if(fretFound!==null){
        newsofar = sofar.slice()
        newsofar[currentStringIndex] = fretFound;
        let check = backtrack(musicStrings, cts, position, stretch, newsofar, currentCTIndex+1, 0, solutions)
        if(check !== null){ //if no dead end - this is valid solution
            solutions.push(check)
            console.log(position, "--------------",solutions)
            return backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex+1,solutions)

        }else{ //if branch gets to a dead end, move on to next string
            return backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex+1,solutions)
        }
    }else{ //if not found there, move on to next string
        return backtrack(musicStrings, cts, position, stretch, sofar, currentCTIndex, currentStringIndex+1,solutions);
    }
}


    /*

    if note can be found on current string and its not already taken 

        sofar = sofar with it added

        check = recurse with new sofar and currstring+1
        if check isn't null
            return check
        else
            recurse with currentstring+1
    




    find current chordtone on current string
    if its there and string not chosen yet
        choose it - make that string that ct. increase currentct. current string = first. recurse
    else
        increase current string
    
    if current string>num of strings - dead end
        backtrack by returning null
    else
        recurse
    */




