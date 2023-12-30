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
        <StretchInput changeStretch={this.props.changeStretch} stretch={this.props.req.stretch}></StretchInput>
        <ChordToneInput addChordTone={this.props.addChordTone} removeChordTone={this.props.removeChordTone} chordTones={this.props.req.chordTones}></ChordToneInput>
        <StringInput strings={this.props.req.strings} n={this.props.n} changeNumStrings={this.props.changeNumStrings} changeOpen={this.props.changeOpen}></StringInput>
      </div>
      
    )
  }
}

class ResultsSection extends React.Component{

  constructor(props){
    super(props);
    //this.state = {
    //  req: props.req,
    //  res: props.res,
    //  error: props.error 
    //};
    
  }

  //static getDerivedStateFromProps(props){  //update state when parent state changes
  //  return {
  //    req: props.req,
  //    res: props.res,
  //    error: props.error 
  //  };
  //}


  
  //componentDidMount() {
  //this.handlePostRequest();
  //}
  

  render(){

    let data = this.props.res;
    //console.log(this.props.res)
    let error = this.props.error;

    if(error){
      return <div>Error: {error}</div>
    }
    else if (!data) {
      // Render a loading state while waiting for the data
      return <div>Loading...</div>;
    } else{
        let diagrams = [];
        

        for(let i=0;i<data.length;i++){
          diagrams = diagrams.concat(<Diagram stretch={this.props.req.stretch} diagram_data={data[i]} key={i}/>);
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
        strings: ["E4","A4","D4","G4","B4","E4"], 
        chordTones: [false,false,false,false,false,false,false,false,false,false,false,false], 
        },
      numStringSelects:6,
      res: null,
      error: null 
    };
  }


  handlePostRequest = () => { //gonna need to call this from app not input section. then we can call it from state change mathods at the top. 
    
    fetch('http://localhost:8000/calculate', {
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
        console.log(data.message)
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

  changeNumStrings(n){
    this.setState({numStringSelects: n});
    const newStrings = [];
    for(let i=0;i<n;i++){
      newStrings.push("A1")
    }
    this.setState( {req: {
      stretch:this.state.req.stretch, 
      strings: newStrings, 
      chordTones: this.state.req.chordTones, 
      }}, ()=>{ this.handlePostRequest();});
  }

  changeOpen(index, newOpen){ 
    const newStrings = this.state.req.strings.slice();
    newStrings[index] = newOpen+"1";
    this.setState( {req: {
      stretch:this.state.req.stretch, 
      strings: newStrings, 
      chordTones: this.state.req.chordTones, 
      }}, ()=>{ this.handlePostRequest();});
   
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

  

  render(){
    return (
      <div className="App">
        <header className="App-header">  
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
