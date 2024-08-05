
import React from "react";

const names = ["G#/Ab","A#/Bb","C#/Db","D#/Eb","F#/Gb"]
const sharpNames = ["G#","A#","C#","D#","F#"]
const flatNames = ["Ab","Bb", "Db","Eb","Gb"]





const Options = ({setAb, setBb, setDb, setEb, setGb, enharmonics })=>{
    console.log("enharmonics")
    const handleClick = (e)=>{
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

            <div className="doubling-section">
                <label htmlFor="doubling-button">Doubling:</label>
                <input id="doubling-button" type="checkbox"></input>
            </div>

            <div className= "enharmonic-section">
                <p>Enharmonics: </p>
                {names.map((noteName,index)=>(
                        <button id={noteName} key={index} className="enharmonic-box" onClick={handleClick}>{enharmonics[index] ? flatNames[index] : sharpNames[index]}</button>
                    
                ))}
            </div>
              

        </div>
    )
}

export {Options}