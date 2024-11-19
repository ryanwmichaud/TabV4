import '../App.css'
import {Diagram} from '../components/Diagram.js'
import { ChordToneInput } from '../components/ChordTone.js'
import { StringInput,  } from '../components/String.js'
import { Options } from '../components/Options.js'
import { MenuButtonClose} from '../components/MenuButton.js'
import React, { useCallback, useEffect, useState, useContext } from 'react'
import { Navbar } from "../components/Navbar.js"
import { GlobalContext } from '../App.js'


const ip = process.env.REACT_APP_IP
const port = process.env.REACT_APP_PORT



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



const InputSection = ({changeStretch, changeNumStrings, addChordTone, removeChordTone, changeOpen, stretch, strings, chordTones, n, root, quality, setRoot, setQuality, setAb, setBb, setDb, setEb, setGb, enharmonics, setStrings, vertical, setVertical}) => {
  return(
      <div >
        
        <ChordToneInput addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={chordTones} enharmonics={enharmonics} root={root} quality={quality} setRoot={setRoot} setQuality={setQuality}></ChordToneInput>
        <StringInput strings={strings} n={n} changeNumStrings={changeNumStrings} changeOpen={changeOpen} enharmonics={enharmonics} setStrings={setStrings}></StringInput>
        <Options  changeStretch={changeStretch} stretch={stretch}
                  setAb={setAb} setBb={setBb} setDb={setDb} setEb={setEb} setGb={setGb} enharmonics={enharmonics}
                  vertical={vertical} setVertical={setVertical}>
        </Options>
      </div>
      
  )
  
}

const ResultsSection = ({res, stretch, strings, chordTones, error, enharmonics, vertical}) => {

  let data = res

  const noChordTones = chordTones.every(ct => ct !== true)


  if(error){
    console.log("error", error)
    return  <div className='results-section'>
              <p className='error-message'> Error: check network connection and try again </p>
            </div>
    
    
  }
  else if (!data | noChordTones) {
    // Render a loading state while waiting for the data
    return  <div className='results-section'>
              <p className='error-message'> Enter some chord tones to see how you can voice them on your instrument </p>
            </div> 
  } 
  
  else{
    let diagrams = []
    

    for(let i=0;i<data.length;i++){
      diagrams = diagrams.concat(<Diagram stretch={stretch} diagram_data={data[i]} key={i} enharmonics={enharmonics} vertical={vertical}/>)
      
    }
    
    if(diagrams.length === 0){
      return  <div className='results-section'>
        <div className='error-message'>  No possible voicings - try changing the input </div>
      </div>   

    }else{
      return(
        <div className="results-section">
          <p className='results-title'> Results: </p>
          <div className='results-container'>
            {diagrams}
          </div>
        </div>
      )
    }
    
  }

}






const Home = () =>{


  const {isMobileView, isMobileMenuVisible, setIsMobileMenuVisible, closeMobileMenu } = useContext(GlobalContext)
  const [stretch, setStretch] = useState(4)
  const [strings, setStrings] = useState(["E","A","D","G","B","E"])
  const [chordTones, setChordTones] = useState([false,false,false,false,false,false,false,false,false,false,false,false])
  const [root, setRoot] = useState("")
  const [quality, setQuality] = useState("")
  const [numStringSelects, setNumStringSelects] = useState(6)

  const [vertical, setVertical] = useState(false)

  
  const [res, setRes] = useState(null)
  const [error, setError] = useState(null)


  const [Db, setDb] = useState(false)
  const [Eb, setEb] = useState(false)
  const [Gb, setGb] = useState(false)
  const [Ab, setAb] = useState(false)
  const [Bb, setBb] = useState(false)
  let enharmonics = [Ab,Bb,Db,Eb,Gb]



  //memoize calculate which dep on stretch, cts, and strs
  //now, useEffect only dep on handlePostReq
  const calculate = useCallback(async () => { //call from top level not input section
    
    console.log("called calc")

    const response = await fetch(`http://${ip}:${port}/jsonrpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "calculate",
        params:{
          stretch: stretch,
          strings: strings,
          chordTones: chordTones,
        },
        id: 1
      })
    })
    const data = await response.json()
    if(data.error){
      console.error("json-rpc error:", data.error)
      setRes(null)
      setError(error.message)
    }
    setRes(data.result)
    setError(null)
  }, [chordTones, stretch, strings])


  //resend new req
  useEffect(() =>{
    calculate()
  }, [calculate])



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




  const changeStretch = (value) => {
    setStretch(value)
  }

  const addChordTone = (index) => {
    //const newChordTones = chordTones.map((value, i) => (i === index ? true : value)) //if i is the index, make it true, else keep it
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
    setStrings(newStrings)
  }

  const changeOpen = (index, newOpen) => { 
    setStrings(prevStrings =>{
      const newStrings = prevStrings.slice()
      newStrings[index] = newOpen
      return newStrings
    })
  }




  
  
  return (
    
      <div className="home">

      
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
              setStrings = {setStrings}
              vertical={vertical}
              setVertical={setVertical}
            >
            </InputSection>
          </div>
          }

        <Navbar isMobileMenuVisible={isMobileMenuVisible} setIsMobileMenuVisible={setIsMobileMenuVisible} isMobileView={isMobileView}></Navbar>

     


        <div className="main" onClick={closeMobileMenu}> 


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
              setStrings = {setStrings}
              vertical={vertical}
              setVertical={setVertical}
            >
            </InputSection>
          </div>
          }
          
          
          <ResultsSection
            chordTones={chordTones} 
            stretch={stretch}
            strings={strings}
            res={res} 
            error={error}
            enharmonics={enharmonics}
            vertical={vertical}
          >
          </ResultsSection>
       
        </div>
      </div>
    )
}


export default Home
