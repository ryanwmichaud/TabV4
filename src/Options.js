
import React from "react";

const names = ["G#/Ab","A#/Bb","C#/Db","D#/Eb","F#/Gb"]
const sharpNames = ["G#","A#","C#","D#","F#"]
const flatNames = ["Ab","Bb", "Db","Eb","Gb"]





const Options = ({setAb, setBb, setDb, setEb, setGb, enharmonics })=>{

    const handleClick = (e)=>{
        if(e.target.name === "G#/Ab"){
            setAb(!enharmonics[0])
        }
        if(e.target.name === "A#/Bb"){
            setBb(!enharmonics[1])
        }
        if(e.target.name === "C#/Db"){
            setDb(!enharmonics[2])
        }
        if(e.target.name === "D#/Eb"){
            setEb(!enharmonics[3])
        }
        if(e.target.name === "F#/Gb"){
            setGb(!enharmonics[4])
        }
        
    }

    return(
        <div className="options-section">
            <legend>Enharmonics: </legend>
            <div className= "enharmonic-boxes">
                {names.map((noteName,index)=>(
                        <button name={noteName} key={index} className="enharmonic-box" onClick={handleClick}>{enharmonics[index] ? flatNames[index] : sharpNames[index]}</button>
                    
                ))}
            </div>
              

        </div>
    )
}

export {Options}