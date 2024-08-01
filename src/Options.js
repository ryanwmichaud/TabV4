
import React from "react";

const names = ["C#/Db","D#/Eb","F#/Gb","G#/Ab","A#/Bb"]



const Options = ({setAb, setBb, setDb, setEb, setGb, Ab, Bb, Db, Eb, Gb })=>{

    const handleClick = (e)=>{
        if(e.target.name === "C#/Db"){
            setDb(!Db)
        }
        if(e.target.name === "D#/Eb"){
            setEb(!Eb)
        }
        if(e.target.name === "F#/Gb"){
            setGb(!Gb)
        }
        if(e.target.name === "G#/Ab"){
            setAb(!Ab)
        }
        if(e.target.name === "A#/Bb"){
            setBb(!Bb)
        }
    }

    return(
        <div className="options-section">
            <legend>Enharmonics: </legend>
            <div className= "enharmonic-boxes">
            
                {names.map((noteName,index)=>(
                    <div className="enharmonic-box-container" key={index}>
                        <input type="button" name={noteName} className="enharmonic-box" onClick={handleClick}/>
                        <label for={noteName} className="enharmonic-label">{noteName}</label>
                    </div>

                ))}
            </div>
              

        </div>
    )
}

export {Options}