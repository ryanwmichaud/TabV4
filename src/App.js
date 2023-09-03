import './App.css';
import React from 'react';
import { solve} from './main';
import {Box, Row, Diagram} from './Diagram.js';
import { ChordToneInput } from './ChordTone';
import { StretchInput } from './Stretch';
import { StringInput, StringSelect } from './String';

class ResultsSection extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      strings: props.strings,
      chordTones: props.chordTones,
      stretch: props.stretch,
    };
    
  }

  componentWillReceiveProps(props){  //update state when parent state changes
    this.setState({stretch: props.stretch, chordTones:props.chordTones});
  }

  render(){

    let data= solve(this.state.strings,this.state.chordTones,this.state.stretch);
    
    //console.log(data)
    let diagrams = [];
    for(let i=0;i<data.length;i++){
        diagrams = diagrams.concat(<Diagram stretch={this.state.stretch} diagram_data={data[i]} key={i}/>);
    }

    return(
      <div>
        {diagrams}
      </div>
    );
  }
}



class InputSection extends React.Component{
  
  render(){
    return(
      <div >
        <StretchInput changeStretch={this.props.changeStretch} stretch={this.props.stretch}></StretchInput>
        <ChordToneInput addChordTone={this.props.addChordTone} removeChordTone={this.props.removeChordTone} chordTones={this.props.chordTones}></ChordToneInput>
        <StringInput strings = {this.props.strings} handleChange={this.props.changeNumStrings}></StringInput>
      </div>
      
    )
  }
}

class App extends React.Component{

  constructor(props){
    super(props);
    this.changeStretch = this.changeStretch.bind(this);
    this.addChordTone = this.addChordTone.bind(this);
    this.removeChordTone = this.removeChordTone.bind(this);
    this.state = {stretch:4, strings: ["E4","A4","D4","G4","B4","E4"], chordTones: [true,false,false,false,true,false,false,false,false,false,false,false]};
  }


  changeStretch(value){
    this.setState({stretch: value});
  }

  
  addChordTone(index){
    let newChordTones = this.state.chordTones.slice();
    newChordTones[index] = true;
    this.setState({chordTones: newChordTones});
  }

  
  removeChordTone(index){
    let newChordTones = this.state.chordTones.slice();
    newChordTones[index]=false;
    this.setState({chordTones: newChordTones});
  }

 

  render(){
 
    return (
      <div className="App">
        <header className="App-header">  
          <p>
            Chords
          </p>
      
        </header>
        <div className="main">
          <div className='input'>
            Input:
            <InputSection 
              changeStretch={this.changeStretch} 
              stretch={this.state.stretch}
              chordTones={this.state.chordTones}
              addChordTone={this.addChordTone}
              removeChordTone={this.removeChordTone}
              strings={this.state.strings} >
            </InputSection>
          </div>
          <div> 
            Results:
            <ResultsSection
              stretch={this.state.stretch} 
              strings={this.state.strings} 
              chordTones={this.state.chordTones}>
            </ResultsSection>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
