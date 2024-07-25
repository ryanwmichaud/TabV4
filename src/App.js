import './App.css';
import {Diagram} from './Diagram.js';
import { ChordToneInput } from './ChordTone';
import { StretchInput } from './Stretch';
import { StringInput,  } from './String';
import React, { useEffect, useState } from 'react';
const ip = process.env.REACT_APP_IP;

const InputSection = ({changeStretch, changeNumStrings, addChordTone, removeChordTone, changeOpen, stretch, strings, chordTones, n}) => {
  
  return(
      <div >
        <div className='input-title'> Input: </div>
        <StretchInput changeStretch={changeStretch} stretch={stretch}></StretchInput>
        <ChordToneInput addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={chordTones}></ChordToneInput>
        <StringInput strings={strings} n={n} changeNumStrings={changeNumStrings} changeOpen={changeOpen}></StringInput>
      </div>
      
  )
  
}

const ResultsSection = ({res, stretch, strings, chordTones, error}) => {

  let data = res;

  const noChordTones = chordTones.every(ct => ct !== true);


  if(error){
    console.log("error", error);
    return <div className='error-message'> Error: check network connection and try again </div>;
    
  }
  else if (!data | noChordTones) {
    // Render a loading state while waiting for the data
    return <div className='error-message'> Enter some chord tones to see how you can voice them on your instrument </div>;
  } 
  else{
    let diagrams = [];
    

    for(let i=0;i<data.length;i++){
      diagrams = diagrams.concat(<Diagram stretch={stretch} diagram_data={data[i]} key={i}/>);
    }
    
    if(diagrams.length === 0){
      return  <div className='error-message'>  No possible voicings - try changing the input </div>;

    }else{
      return(
        <div>
          <div className='results-title'> Results: </div>
          <div>
            {diagrams}
          </div>
        </div>
      );
    }
    
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

    this.state = {
     
      stretch:4, 
      strings: ["E","A","D","G","B","E"], 
      chordTones: [false,false,false,false,false,false,false,false,false,false,false,false], 
      numStringSelects:6,
      res: null,
      error: null 
    };
  }


  handlePostRequest = () => { //need to call this from app not input section. then we can call it from state change mathods at the top. 
    
    const req = {
      stretch: this.state.stretch,
      strings: this.state.strings,
      chordTones: this.state.chordTones,

    }

    fetch(`http://${ip}:8000/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify(req),
    })
      .then(response => {
        if (!response.ok) { 
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update state with the response data
        //console.log(data.message)
        this.setState({ res: data.message, error: null });
        
      })
      .catch(error => {
        // Handle and store the error
        this.setState({ res: null, error: error.message });
      });
  };


  changeStretch(value){
    this.setState( {stretch: value}, ()=>{ this.handlePostRequest()});
  }



  
  addChordTone(index){
    let newChordTones = this.state.chordTones.slice();
    newChordTones[index] = true;
    this.setState( {chordTones: newChordTones}, () => {
        this.handlePostRequest();
      });
    
  }

  
  removeChordTone(index){
    let newChordTones = this.state.chordTones.slice();
    newChordTones[index]=false;
    this.setState( {chordTones: newChordTones}, ()=>{
        this.handlePostRequest();
      });
    
  }


  changeNumStrings(n){
    this.setState({numStringSelects: n});
    const newStrings = [];
    for(let i=0;i<n;i++){
      newStrings.push("A")
    }
    this.setState( {strings: newStrings}, ()=>{ this.handlePostRequest();});
  }

  changeOpen(index, newOpen){ 
    const newStrings = this.state.strings.slice();
    newStrings[index] = newOpen;
    this.setState( {strings: newStrings}, ()=>{ this.handlePostRequest();});
   
  }

  

  render(){
    return (
      <div className="app">
        <header className="app-header">  
          <p>
            Fretbchord Explchorder
          </p>
      
        </header>


        <div className="main">
          <div className='input'>
            <InputSection 
              chordTones={this.state.chordTones} 
              stretch={this.state.stretch}
              strings={this.state.strings}
              changeStretch={this.changeStretch} 
              addChordTone={this.addChordTone}
              removeChordTone={this.removeChordTone}
              changeOpen={this.changeOpen}
              changeNumStrings={this.changeNumStrings}
              n={this.state.numStringSelects}
            >
            </InputSection>
          </div>
          <div className="results"> 
            <ResultsSection
              chordTones={this.state.chordTones} 
              stretch={this.state.stretch}
              strings={this.state.strings}
              res={this.state.res} 
              error={this.state.error}
            >
            </ResultsSection>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
