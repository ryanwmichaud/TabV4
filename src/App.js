import './App.css';
import {Diagram} from './Diagram.js';
import { ChordToneInput } from './ChordTone';
import { StretchInput } from './Stretch';
import { StringInput,  } from './String';
import {MenuButton} from './MenuButton';
import React, { useEffect, useState } from 'react';
import { ChordQuality } from './ChordQuality.js';


const ip = process.env.REACT_APP_IP;
const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]





const InputSection = ({changeStretch, changeNumStrings, addChordTone, removeChordTone, changeOpen, stretch, strings, chordTones, n, changeQuality}) => {
  
  return(
      <div >
        <div className='input-title'> Input: </div>
        <StretchInput changeStretch={changeStretch} stretch={stretch}></StretchInput>
        <ChordToneInput addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={chordTones}></ChordToneInput>
        <ChordQuality  addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={chordTones} changeQuality={changeQuality}></ChordQuality>
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
  const [root, setRoot] = useState(null)

  const [numStringSelects, setNumStringSelects] = useState(6)
  const [res, setRes] = useState(null)
  const [error, setError] = useState(null)

  const [isMobileView, setisMobileView] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);


  useEffect(() =>{
    handlePostRequest()
  }, [chordTones,strings, stretch])

  useEffect(() => {

    const handleResize = () => {
      console.log()
      const vh = window.innerHeight * 0.01 //calc vh accounting for mobile toolbars
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      if (window.innerWidth < 620) {
        setisMobileView(false)
      } else {
        setisMobileView(true)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {  //clean up
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

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

  const changeQuality = (root, quality) => {
    //const newChordTones = chordTones.map((value, i) => (i === index ? true : value)); //if i is the index, make it true, else keep it
    setChordTones(prev => {
      //set the cts according to input
      return([true,false,false,false,false,false,false,false,false,false,false,false,])

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
    
    setstrings(prevStrings =>{
      const newStrings = prevStrings.slice()
      prevStrings[index] = newOpen
      return newStrings
    })
  }

  

  return (
      <div className="app">


      {!isMobileView &&  isMobileMenuVisible && 
          <div className='mobile-input'> 
            <MenuButton 
              isMobileMenuVisible={isMobileMenuVisible} 
              setIsMobileMenuVisible={setIsMobileMenuVisible} 
            >
            </MenuButton>
            <InputSection 
              chordTones={chordTones} 
              stretch={stretch}
              strings={strings}
              changeStretch={changeStretch} 
              addChordTone={addChordTone}
              removeChordTone={removeChordTone}
              changeQuality={changeQuality}
              changeOpen={changeOpen}
              changeNumStrings={changeNumStrings}
              n={numStringSelects}
            >
            </InputSection>
          </div>
          }
        <header className="app-header">
        {
          !isMobileView && !isMobileMenuVisible &&  
          <MenuButton 
              isMobileMenuVisible={isMobileMenuVisible} 
              setIsMobileMenuVisible={setIsMobileMenuVisible} 
            >
          </MenuButton>

          }    
          <p className="title">
          Fretbchord Explchorder
          </p>
        </header>


        <div className="main"> 


          {isMobileView &&<
          div className='input'> 
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
          }
          
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
