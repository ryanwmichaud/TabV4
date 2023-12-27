
/* text based cli implementation */
/*

names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
nameMap = new Map();
for(let i=0;i<12;i++){
    nameMap.set(names[i],i);
}

function getNoteNum(noteName){
    letterName = noteName.substring(0,noteName.length-1);
    octave = noteName.substring(noteName.length-1,noteName.length);
    num = nameMap.get(letterName);
    num += (parseInt(octave)+1)*12;
    return num
}
function getNoteNumNoOctave(noteName){
    letterName = noteName.substring(0,noteName.length-1);
    num = nameMap.get(letterName);
    return num
}

function getNoteName(noteNum){
    letterNoteNum = noteNum%12;
    letterName = names[letterNoteNum];
    octave = Math.floor(noteNum/12) -1;
    return letterName.concat(octave.toString());
}
function getNoteNameNoOctave(noteNum){
    letterNoteNum = noteNum%12;
    letterName = names[letterNoteNum];
    return letterName;
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
        console.log(this.stringMap);
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

function main(){
    
    s1= new MusicString("A4");
    s2= new MusicString("D4");
    s3= new MusicString("G3");
    s4= new MusicString("C3");

    */
    
   /*
    s1= new MusicString("D5");
    s2= new MusicString("B4");
    s3= new MusicString("G4");
    s4= new MusicString("D4");
    */
/*
    musicStrings = [s1,s2,s3,s4];
    chordTones = ["E","C","G","B"];
    checklist = chordTones.slice();
    
    
    for(let stringNum=0;stringNum<musicStrings.length;stringNum++){ //set if any open strings are cts
        currentString = musicStrings[stringNum];
        if(chordTones.includes(currentString.openNoOctave)){
            currentString.openIsChordTone = true;
        }
    }


    stretch = 4;
    

    for(let position=0;position<12;position++){  //for each position
        checklist = chordTones.slice()
        
        for(let stringNum=0;stringNum<musicStrings.length;stringNum++){      //for each string

            
            currentString = musicStrings[stringNum];
            openNum = getNoteNumNoOctave(currentString.open);
            if(currentString.openIsChordTone){
                currentString.addOpen(currentString.openNoOctave);
                checklist.splice(checklist.indexOf(currentString.openNoOctave));
            }
    
            for(let i=position;i<position+stretch;i++){             //for each fret in the position
    
                note = getNoteNameNoOctave(openNum+i);      //add it if were looking for it
                if(chordTones.includes(note)){
                    if(note.length<2){currentString.add(note+" ");}
                    else{currentString.add(note);}
                    if(checklist.includes(note)){checklist.splice(checklist.indexOf(note));}
                }
                else{
                    currentString.add("- ");
                }
                
    
            }  
    
        }
        if(checklist.length === 0){
            console.log("\n",position)
            for(let stringNum=0;stringNum<musicStrings.length;stringNum++){     
                musicStrings[stringNum].printTab();
            }
        }else{
            for(let stringNum=0;stringNum<musicStrings.length;stringNum++){     
                musicStrings[stringNum].clearTab();
            }
        }
        
        



    }

    
}

main();

*/