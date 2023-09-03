import React from 'react';

class ChordToneInput extends React.Component{

    handleChange(){
      this.props.changeChordTones();
    }
  
  
    render(){
      return(
        <div >
          <fieldset className='ctinput'> 
              <legend>Chord Tones: </legend>
              <label>A<input type='checkbox' id='A' name='ct'/></label>
              <label>A#<input type='checkbox' id='A#' name='ct'/></label>
              <label>B<input type='checkbox' id='B' name='ct'/></label>
              <label>C<input type='checkbox' id='C' name='ct'/></label>
              <label>C#<input type='checkbox' id='C#' name='ct'/></label>
              <label>D<input type='checkbox' id='D' name='ct'/></label>
              <label>D#<input type='checkbox' id='D#' name='ct'/></label>
              <label>E<input type='checkbox' id='E' name='ct'/></label>
              <label>F<input type='checkbox' id='F' name='ct'/></label>
              <label>F#<input type='checkbox' id='F#' name='ct'/></label>
              <label>G<input type='checkbox' id='G' name='ct'/></label>
              <label>G#<input type='checkbox' id='G#' name='ct'/></label>
            </fieldset>         
          
        </div>
  
        
  
      );
    }
  }
  
  
  
  export {ChordToneInput}