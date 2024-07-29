import React from "react"

const ChordToneInput = ({ chordTones, removeChordTone, addChordTone }) => {

  const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]


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
                  <div className="ct-container">
                  <input type="checkbox" id={index} name="ct" className="ct-input" checked={isChecked} onClick={handleClick}/>
                  <label for="0" className="ct-label">{names[index]}</label>
                  </div>
                ))}
              
              </div>
      </div>

    )

        
  
    
}
  
  
  
  export {ChordToneInput}
