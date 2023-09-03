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

  componentWillReceiveProps(props){
    this.setState({stretch: props.stretch});
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
      <form onSubmit={this.handleSubmit}>
        <StretchInput changeStretch={this.props.changeStretch} stretch={this.props.stretch}></StretchInput>
        <ChordToneInput changeChordTones={this.props.changeChordTones} chordTones={this.props.chordTones}></ChordToneInput>
        
        <StringInput></StringInput>

        <input type='submit' value={"Go"}></input>

      </form>
      
    )
  }
}

class App extends React.Component{

  constructor(props){
    super(props);
    this.changeStretch = this.changeStretch.bind(this);
    this.state = {stretch:4, strings: ["E5","A4","D4","G4","B5","D5"], chordTones: ["G","B","D"]};
  }


  changeStretch(value){
    this.setState({stretch:value});
  }
  changeChordTones(x){
    this.setState({chordTones: x});
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
          <InputSection 
            changeStretch={this.changeStretch} 
            stretch={this.state.stretch}>
            changeChordTones={this.changeChordTones}
            chordTones={this.chordTones}
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
