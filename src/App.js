import './App.css';
import React, {  useEffect } from "react";
import {solve} from './main';
import {Diagram} from './Diagram.js';
import { ChordToneInput } from './ChordTone';
import { StretchInput } from './Stretch';
import { StringInput,  } from './String';


class InputSection extends React.Component{
  
  render(){
    return(
      <div >
        <div className='inputTitle'> Input: </div>
        <StretchInput changeStretch={this.props.changeStretch} stretch={this.props.stretch}></StretchInput>
        <ChordToneInput addChordTone={this.props.addChordTone} removeChordTone={this.props.removeChordTone} chordTones={this.props.chordTones}></ChordToneInput>
        <StringInput strings={this.props.strings} n={this.props.n} changeNumStrings={this.props.changeNumStrings} changeOpen={this.props.changeOpen}></StringInput>
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
    console.log("updated")
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
        <div className='resultsTitle'> Results: </div>
        <div>
        {diagrams}
        </div>
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
    this.state = {test:"test", stretch:4, strings: ["E4","A4","D4","G4","B4","E4"], chordTones: [false,false,false,false,false,false,false,false,false,false,false,false], numStringSelects:6};
  }


  changeStretch(value){
    this.setState({stretch: value});
  }

  changeNumStrings(n){
    this.setState({numStringSelects: n});
    const newStrings = [];
    for(let i=0;i<n;i++){
      newStrings.push("A1")
    }
    this.setState({strings: newStrings})
  }

  changeOpen(index, newOpen){ 
    const newStrings = this.state.strings.slice();
    newStrings[index] = newOpen+"1";
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
    console.log(this.state.strings)
    return (
      <div className="App">
        <header className="App-header">  
          <p>
            Fretbchord Explchorder
          </p>
      
        </header>

        <div> {this.state.test} </div>

        <div className="main">
          <div className='input'>
            <InputSection 
              changeStretch={this.changeStretch} 
              stretch={this.state.stretch}
              chordTones={this.state.chordTones}
              addChordTone={this.addChordTone}
              removeChordTone={this.removeChordTone}
              strings={this.state.strings} 
              changeOpen={this.changeOpen}
              changeNumStrings={this.changeNumStrings}
              n={this.state.numStringSelects}

              >
              
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
