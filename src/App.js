import './App.css';
import {Diagram} from './Diagram.js';
import { ChordToneInput } from './ChordTone';
import { StretchInput } from './Stretch';
import { StringInput,  } from './String';
import { Options } from './Options.js';
import {MenuButton, MenuButtonClose} from './MenuButton';
import React, { useEffect, useState } from 'react';
import { ChordQuality } from './ChordQuality.js';
import { Navbar } from "./Navbar.js"

const ip = process.env.REACT_APP_IP;

const nameMap = Object.freeze({
  "C":0,
  "C#":1,
  "D":2,
  "D#":3,
  "E":4,
  "F":5,
  "F#":6,
  "G":7,
  "G#":8,
  "A":9,
  "A#":10,
  "B":11
})



const InputSection = ({changeStretch, changeNumStrings, addChordTone, removeChordTone, changeOpen, stretch, strings, chordTones, n, root, quality, setRoot, setQuality, setAb, setBb, setDb, setEb, setGb, enharmonics}) => {
  return(
      <div >
        <div className='input-title'> Input: </div>
        <StretchInput changeStretch={changeStretch} stretch={stretch}></StretchInput>
        <button className='toggle-chordtone-mode'></button>
        <ChordToneInput addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={chordTones} enharmonics={enharmonics}></ChordToneInput>
        <ChordQuality  addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={chordTones} root={root} quality={quality} setRoot={setRoot} setQuality={setQuality} enharmonics={enharmonics}></ChordQuality>
        <StringInput strings={strings} n={n} changeNumStrings={changeNumStrings} changeOpen={changeOpen} enharmonics={enharmonics}></StringInput>
        <Options setAb={setAb} setBb={setBb} setDb={setDb} setEb={setEb} setGb={setGb} enharmonics={enharmonics}></Options>
      </div>
      
  )
  
}

const ResultsSection = ({res, stretch, strings, chordTones, error, enharmonics}) => {

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
      diagrams = diagrams.concat(<Diagram stretch={stretch} diagram_data={data[i]} key={i} enharmonics={enharmonics}/>);
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
  const [root, setRoot] = useState("")
  const [quality, setQuality] = useState("")
  const [numStringSelects, setNumStringSelects] = useState(6)
  
  const [res, setRes] = useState(null)
  const [error, setError] = useState(null)

  const [isMobileView, setisMobileView] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const [Db, setDb] = useState(false)
  const [Eb, setEb] = useState(false)
  const [Gb, setGb] = useState(false)
  const [Ab, setAb] = useState(false)
  const [Bb, setBb] = useState(false)
  let enharmonics = [Ab,Bb,Db,Eb,Gb]







  //resend new req
  useEffect(() =>{
    handlePostRequest()
  }, [chordTones,strings, stretch])

  //get height
  useEffect(() => {

    const handleResize = () => {
      const vh = window.innerHeight * 0.01 //calc vh accounting for mobile toolbars
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      if (window.innerWidth < 860) {
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

  //change chord, checkboxes update
  useEffect(()=>{
    let newChordTones = [false,false,false,false,false,false,false,false,false,false,false,false]
    const rootIndex = nameMap[root]
    newChordTones[rootIndex] = true
    
    if(quality==="Minor"){
      newChordTones[(rootIndex+3)%12] = true
      newChordTones[(rootIndex+7)%12] = true
    }
    if(quality==="Major"){
      newChordTones[(rootIndex+4)%12] = true
      newChordTones[(rootIndex+7)%12] = true
    }
    if(quality==="Diminished"){
      newChordTones[(rootIndex+3)%12] = true
      newChordTones[(rootIndex+6)%12] = true
    }
    if(quality==="Augmented"){
      newChordTones[(rootIndex+4)%12] = true
      newChordTones[(rootIndex+8)%12] = true

    }
    setChordTones(newChordTones)
  }, [root, quality])

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
            <MenuButtonClose 
              isMobileMenuVisible={isMobileMenuVisible} 
              setIsMobileMenuVisible={setIsMobileMenuVisible} 
            >
            </MenuButtonClose>
            <InputSection 
              chordTones={chordTones} 
              stretch={stretch}
              strings={strings}
              changeStretch={changeStretch} 
              addChordTone={addChordTone}
              removeChordTone={removeChordTone}
              root={root}
              quality={quality}
              setRoot={setRoot}
              setQuality={setQuality}
              changeOpen={changeOpen}
              changeNumStrings={changeNumStrings}
              n={numStringSelects}
              setAb={setAb} setBb={setBb} setDb={setDb} setEb={setEb} setGb={setGb}
              enharmonics = {enharmonics}
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
            Chords          
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
              root={root}
              quality={quality}
              setRoot={setRoot}
              setQuality={setQuality}
              n={numStringSelects}
              setAb={setAb} setBb={setBb} setDb={setDb} setEb={setEb} setGb={setGb}
              enharmonics = {enharmonics}

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
              enharmonics={enharmonics}
            >
            </ResultsSection>
          </div>
        </div>
      </div>
    )
}


export default App;
