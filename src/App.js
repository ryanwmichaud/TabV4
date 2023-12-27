import './App.css';
import React from 'react';
import { solve} from './main';
import {Box, Row, Diagram} from './Diagram.js';
import { ChordToneInput } from './ChordTone';
import { StretchInput } from './Stretch';
import { StringInput, StringSelect } from './String';

class InputSection extends React.Component{
  
  render(){
    return(
      <div >
        <StretchInput changeStretch={this.props.changeStretch} stretch={this.props.stretch}></StretchInput>
        <ChordToneInput addChordTone={this.props.addChordTone} removeChordTone={this.props.removeChordTone} chordTones={this.props.chordTones}></ChordToneInput>
        <StringInput strings={this.props.strings} changeNumStrings={this.props.changeNumStrings} changeOpen={this.props.changeOpen}></StringInput>
      </div>
      
    )
  }
}

class ResultsSection extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      strings: props.strings,
      chordTones: props.chordTones,
      stretch: props.stretch,
    };
    
  }

  static getDerivedStateFromProps(props){  //update state when parent state changes
    return {stretch: props.stretch, chordTones:props.chordTones, strings: props.strings};
  }

  render(){

    let data= solve(this.state.strings,this.state.chordTones,this.state.stretch);
    
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





class App extends React.Component{

  constructor(props){
    super(props);
    this.changeStretch = this.changeStretch.bind(this);
    this.addChordTone = this.addChordTone.bind(this);
    this.removeChordTone = this.removeChordTone.bind(this);
    this.changeNumStrings = this.changeNumStrings.bind(this);
    this.changeOpen = this.changeOpen.bind(this);
    this.state = {stretch:4, strings: ["E4","A4","D4","G4","B4","E4"], chordTones: [false,false,false,false,false,false,false,false,false,false,false,false]};
  }


  changeStretch(value){
    this.setState({stretch: value});
  }

  changeNumStrings(newStrings){
    this.setState({strings: newStrings});
  }

  changeOpen(index, newOpen){
    const newStrings = this.state.strings.slice();
    newStrings[index] = newOpen;
    this.setState({strings: newStrings});
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
              strings={this.state.strings} 
              changeOpen={this.changeOpen}
              changeNumStrings={this.changeNumStrings}>
            </InputSection>
          </div>
          <div className="results"> 
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
