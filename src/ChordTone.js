import React from 'react'

const ChordToneInput = ({ chordTones, removeChordTone, addChordTone }) => {


    const handleClick = (e) => {
      //let box = e.target
      let index = e.target.id
      if(chordTones[index] === true){
       removeChordTone(index)      
      }else{
        addChordTone(index)
      }
      
    }
  
    return(
        <div className='ctinput'> 
              <legend>Chord Tones: </legend>
              <div class= "ct-boxes">
                <div class="ct-container">
                  <input type='checkbox' id='0' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="0" class="ct-label">C</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='1' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="1" class="ct-label">C#</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='2' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="2" class="ct-label">D</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='3' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="3" class="ct-label">D#</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='4' name='ct' class="ct-input" onClick={handleClick} />
                  <label for="4" class="ct-label">E</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='5' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="5" class="ct-label">F</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='6' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="6" class="ct-label">F#</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='7' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="7" class="ct-label">G</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='8' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="8" class="ct-label">G#</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='9' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="9" class="ct-label">A</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='10' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="10" class="ct-label">A#</label>
                </div>
                <div class="ct-container">
                  <input type='checkbox' id='11' name='ct' class="ct-input" onClick={handleClick}/>
                  <label for="11" class="ct-label">B</label>
                </div>
              </div>
                
              
              
        </div>
  
        
  
      )
    
}
  
  
  
  export {ChordToneInput}
