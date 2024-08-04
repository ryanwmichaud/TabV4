import React from "react"

const ChordToneInput = ({ chordTones, removeChordTone, addChordTone, enharmonics }) => {

  const sharpNames = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
  const flatNames = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]
  let boolNames = [false, enharmonics[2],false,enharmonics[3],false,false,enharmonics[4],false,enharmonics[0],false,enharmonics[1],false]

  const handleClick = (e) => {
    let index = e.target.id
    if(chordTones[index] === true){
      removeChordTone(index)      
    }else{
      addChordTone(index)
    }
    
  }


  return(

    <div className="ctinput"> 
            <legend>Chord Tones: </legend>
            <div className= "ct-boxes">
              {chordTones.map((isChecked, index) => (
                <div className="ct-container" key={`${index}`}>
                <input type="checkbox" id={index} name="ct" className="ct-input"  checked={chordTones[index]} onChange={handleClick}/>
                <label htmlFor={`${index}`} className="ct-label">
                  {( boolNames[index]) ? flatNames[index]: sharpNames[index]}
                </label>
                </div>
              ))}
            
            </div>
    </div>

  )

        
  
    
}
  
  
  
  export {ChordToneInput}
