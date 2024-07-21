import React from 'react';

class ChordToneInput extends React.Component{

  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }

    handleClick(e){
      //let box = e.target;
      let index = e.target.id;
      if(this.props.chordTones[index] === true){
       this.props.removeChordTone(index);      
      }else{
        this.props.addChordTone(index);
      }
      
    }
  
    render(){ 

      return(
        <div className='ctinput'> 
              <legend>Chord Tones: </legend>
                <input type='checkbox' id='0' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="0" class="checkbox-label">C</label>              
                <input type='checkbox' id='1' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="1" class="checkbox-label">C#</label>
                <input type='checkbox' id='2' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="2" class="checkbox-label">D</label>
                <input type='checkbox' id='3' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="3" class="checkbox-label">D#</label>
                <input type='checkbox' id='4' name='ct' class="checkbox-input" onClick={this.handleClick} />
                <label for="4" class="checkbox-label">E</label>
                <input type='checkbox' id='5' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="5" class="checkbox-label">F</label>
                <input type='checkbox' id='6' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="6" class="checkbox-label">F#</label>
                <input type='checkbox' id='7' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="7" class="checkbox-label">G</label>
                <input type='checkbox' id='8' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="8" class="checkbox-label">G#</label>
                <input type='checkbox' id='9' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="9" class="checkbox-label">A</label>
                <input type='checkbox' id='10' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="10" class="checkbox-label">A#</label>
                <input type='checkbox' id='11' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="11" class="checkbox-label">B</label>
              
              
         
              
              
              
        </div>
  
        
  
      );
    }
  }
  
  
  
  export {ChordToneInput}

  /*
  <div class="checkbox-container">
                <label for="0" class="checkbox-label">C</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='1' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="1" class="checkbox-label">C#</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='2' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="2" class="checkbox-label">D</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='3' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="3" class="checkbox-label">D#</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='4' name='ct' class="checkbox-input" onClick={this.handleClick} />
                <label for="4" class="checkbox-label">E</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='5' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="5" class="checkbox-label">F</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='6' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="6" class="checkbox-label">F#</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='7' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="7" class="checkbox-label">G</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='8' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="8" class="checkbox-label">G#</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='9' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="9" class="checkbox-label">A</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='10' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="10" class="checkbox-label">A#</label>
              </div>
              <div class="checkbox-container">
                <input type='checkbox' id='11' name='ct' class="checkbox-input" onClick={this.handleClick}/>
                <label for="11" class="checkbox-label">B</label>
              </div>
  
  
  */