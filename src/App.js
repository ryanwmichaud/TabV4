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






const App = () =>{

  const [stretch, setStretch] = useState(4)
  const [strings, setstrings] = useState(["E","A","D","G","B","E"])
  const [chordTones, setChordTones] = useState([false,false,false,false,false,false,false,false,false,false,false,false])
  const [numStringSelects, setNumStringSelects] = useState(6)
  const [res, setRes] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() =>{
    handlePostRequest()
  }, [chordTones,strings,stretch])



  const handlePostRequest = () => { //call from top level not input section
    
    const req = {
      stretch: stretch,
      strings: strings,
      chordTones: chordTones,
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
      console.log(data.message)
      setRes(data.message)
      setError(null)
      
    })
    .catch(error => {
      // Handle and store the error
      setRes(null)
      setError(error.message)
    });
  };


  const changeStretch = (value) => {
    setStretch(value)
  }


  const addChordTone = (index) => {
    //const newChordTones = chordTones.map((value, i) => (i === index ? true : value)); //if i is the index, make it true, else keep it
    setChordTones(prev => {
      let newChordTones = prev.slice()
      newChordTones[index] = true
      return newChordTones

    })
  }

  
  const removeChordTone = (index) => {
    setChordTones(prev => {
      let newChordTones = prev.slice()
      newChordTones[index] = false
      return newChordTones
    })
  }


  const changeNumStrings = (n) => {
    setNumStringSelects(n)
    let newStrings = []
    for(let i=0;i<n;i++){
      newStrings.push("A")
    }
    setstrings(newStrings)
  }

  const changeOpen = (index, newOpen) => { 
    const newStrings = strings.map((string, i) => (i === index ? newOpen : string)) //if i is the target string, make it the new open value, else keep it
    setstrings(newStrings)
  }

  

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
              chordTones={chordTones} 
              stretch={stretch}
              strings={strings}
              changeStretch={changeStretch} 
              addChordTone={addChordTone}
              removeChordTone={removeChordTone}
              changeOpen={changeOpen}
              changeNumStrings={changeNumStrings}
              n={numStringSelects}
            >
            </InputSection>
          </div>
          <div className="results"> 
            <ResultsSection
              chordTones={chordTones} 
              stretch={stretch}
              strings={strings}
              res={res} 
              error={error}
            >
            </ResultsSection>
          </div>
        </div>
      </div>
    )
}


export default App;
