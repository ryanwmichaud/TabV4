
import { click } from "@testing-library/user-event/dist/click"
import React from "react"

const names = ["G#/Ab","A#/Bb","C#/Db","D#/Eb","F#/Gb"]
const sharpNames = ["G#","A#","C#","D#","F#"]
const flatNames = ["Ab","Bb", "Db","Eb","Gb"]


const StretchInput = ({changeStretch, stretch}) => {
  
    const handleChangeStretch = (e) => {
      e.preventDefault()
      changeStretch(parseInt(e.target.value))  
    }

    return (

      <div className='stretch-section'>
        <p className="input-subsubtitle"> Max number of frets: </p>
        <select id='stretch-select' onChange={handleChangeStretch} value={stretch}>  
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        </select>
      </div>
  )
  
}





const Options = ({changeStretch, stretch, setAb, setBb, setDb, setEb, setGb, enharmonics, vertical, setVertical })=>{
    

    const verticalClick = (e) =>{
        setVertical(!vertical)
    }

    const enharmonicClick = (e)=>{
        if(e.target.id === "G#/Ab"){
            setAb(!enharmonics[0])
        }
        if(e.target.id === "A#/Bb"){
            setBb(!enharmonics[1])
        }
        if(e.target.id === "C#/Db"){
            setDb(!enharmonics[2])
        }
        if(e.target.id === "D#/Eb"){
            setEb(!enharmonics[3])
        }
        if(e.target.id === "F#/Gb"){
            setGb(!enharmonics[4])
        }
    }

    return(
        <div className="options-section">

            <p className="input-subtitle">Options</p>

            <StretchInput changeStretch={changeStretch} stretch={stretch}></StretchInput>

            
            <p className="input-subsubtitle"> Enharmonics:</p>

            <div id="enharmonic-boxes">
                {names.map((noteName,index)=>(
                        <button id={noteName} key={index} className="enharmonic-box" onClick={enharmonicClick}>{enharmonics[index] ? flatNames[index] : sharpNames[index]}</button> 
                ))}
            </div>

            <div className="vertical-option-line">
                <p className="input-subsubtitle"> Vertical Diagrams:</p>

                <div id="vertical-diagrams">
                    <input type="checkbox" onClick={verticalClick}/>
                </div>

            </div>
            
           

       
              

        </div>
    )
}

export {Options}

/*
            <div id="doubling-section">
                <p htmlFor="doubling-button">Doubling:</p>
                <input id="doubling-button" type="checkbox"></input>
            </div>

            <div id="use-open-section">
                <p htmlFor="use-open-button">Use Open Strings:</p>
                <input id="use-open-button" type="checkbox"></input>
            </div>

            <div id="no-string-skipping-section">
                <p htmlFor="no-string-skipping-button">No String Skipping:</p>
                <input id="no-string-skipping-button" type="checkbox"></input>
            </div>
*/