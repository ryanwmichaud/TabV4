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
              <label>C<input type='checkbox' id='0' name='ct' onClick={this.handleClick}/></label>
              <label>C#<input type='checkbox' id='1' name='ct' onClick={this.handleClick}/></label>
              <label>D<input type='checkbox' id='2' name='ct' onClick={this.handleClick}/></label>
              <label>D#<input type='checkbox' id='3' name='ct' onClick={this.handleClick}/></label>
              <label>E<input type='checkbox' id='4' name='ct' onClick={this.handleClick} /></label>
              <label>F<input type='checkbox' id='5' name='ct' onClick={this.handleClick}/></label>
              <label>F#<input type='checkbox' id='6' name='ct' onClick={this.handleClick}/></label>
              <label>G<input type='checkbox' id='7' name='ct' onClick={this.handleClick}/></label>
              <label>G#<input type='checkbox' id='8' name='ct' onClick={this.handleClick}/></label>
              <label>A<input type='checkbox' id='9' name='ct' onClick={this.handleClick}/></label>
              <label>A#<input type='checkbox' id='10' name='ct' onClick={this.handleClick}/></label>
              <label>B<input type='checkbox' id='11' name='ct' onClick={this.handleClick}/></label>          
        </div>
  
        
  
      );
    }
  }
  
  
  
  export {ChordToneInput}