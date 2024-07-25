import './App.css';
import React from "react";
import {Diagram} from './Diagram.js';
import { ChordToneInput } from './ChordTone';
import { StretchInput } from './Stretch';
import { StringInput,  } from './String';
const ip = process.env.REACT_APP_IP;

const InputSection = ({changeStretch, changeNumStrings, addChordTone, removeChordTone, req, n, changeOpen}) => {
  
  return(
      <div >
        <div className='input-title'> Input: </div>
        <StretchInput changeStretch={changeStretch} stretch={req.stretch}></StretchInput>
        <ChordToneInput addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={req.chordTones}></ChordToneInput>
        <StringInput strings={req.strings} n={n} changeNumStrings={changeNumStrings} changeOpen={changeOpen}></StringInput>
      </div>
      
  )
  
}

const ResultsSection = ({res, req, error}) => {

  let data = res;

  const noChordTones = req.chordTones.every(ct => ct !== true);


  if(error){
    console.log("error", error);
    return <div>Error: {error}</div>;
    
  }
  else if (!data | noChordTones) {
    // Render a loading state while waiting for the data
    return <div className='no-ct-message'> Enter some chord tones to see how you can voice them on your instrument </div>;
  } 
  else{
    let diagrams = [];
    

    for(let i=0;i<data.length;i++){
      diagrams = diagrams.concat(<Diagram stretch={req.stretch} diagram_data={data[i]} key={i}/>);
    }
    
    if(diagrams.length === 0){
      console.log(req)
      return  <div className='no-results-message'>  No possible voicings - try changing the input </div>;

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
      req: {
        stretch:4, 
        strings: ["E","A","D","G","B","E"], 
        chordTones: [false,false,false,false,false,false,false,false,false,false,false,false], 
        },
      numStringSelects:6,
      res: null,
      error: null 
    };
  }


  handlePostRequest = () => { //need to call this from app not input section. then we can call it from state change mathods at the top. 
    
    fetch(`http://${ip}:8000/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify(this.state.req),
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
    this.setState( {req: {
      stretch:value, 
      strings: this.state.req.strings, 
      chordTones: this.state.req.chordTones, 
      }}, ()=>{ this.handlePostRequest()});
  }



  
  addChordTone(index){
    let newChordTones = this.state.req.chordTones.slice();
    newChordTones[index] = true;
    this.setState( {req: {
      stretch:this.state.req.stretch, 
      strings: this.state.req.strings, 
      chordTones: newChordTones, 
      }}, () => {
        this.handlePostRequest();
      });
    
  }

  
  removeChordTone(index){
    let newChordTones = this.state.req.chordTones.slice();
    newChordTones[index]=false;
    this.setState( {req: {
      stretch:this.state.req.stretch, 
      strings: this.state.req.strings, 
      chordTones: newChordTones, 
      }}, ()=>{
        this.handlePostRequest();
      });
    
  }


  changeNumStrings(n){
    this.setState({numStringSelects: n});
    const newStrings = [];
    for(let i=0;i<n;i++){
      newStrings.push("A")
    }
    this.setState( {req: {
      stretch:this.state.req.stretch, 
      strings: newStrings, 
      chordTones: this.state.req.chordTones, 
      }}, ()=>{ this.handlePostRequest();});
  }

  changeOpen(index, newOpen){ 
    const newStrings = this.state.req.strings.slice();
    newStrings[index] = newOpen;
    this.setState( {req: {
      stretch:this.state.req.stretch, 
      strings: newStrings, 
      chordTones: this.state.req.chordTones, 
      }}, ()=>{ this.handlePostRequest();});
   
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
              req= {this.state.req}
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
              req={this.state.req} 
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
