import React from "react"

const ChordToneInput = ({ chordTones, removeChordTone, addChordTone }) => {


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
                <div className="ct-container">
                  <input type="checkbox" id="0" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="0" className="ct-label">C</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="1" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="1" className="ct-label">C#</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="2" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="2" className="ct-label">D</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="3" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="3" className="ct-label">D#</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="4" name="ct" className="ct-input" onClick={handleClick} />
                  <label for="4" className="ct-label">E</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="5" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="5" className="ct-label">F</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="6" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="6" className="ct-label">F#</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="7" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="7" className="ct-label">G</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="8" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="8" className="ct-label">G#</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="9" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="9" className="ct-label">A</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="10" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="10" className="ct-label">A#</label>
                </div>
                <div className="ct-container">
                  <input type="checkbox" id="11" name="ct" className="ct-input" onClick={handleClick}/>
                  <label for="11" className="ct-label">B</label>
                </div>
              </div>
                
              
              
        </div>
  
        
  
      )
    
}
  
  
  
  export {ChordToneInput}
