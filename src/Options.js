
import React from "react";

const names = ["C#/Db","D#/Eb","F#/Gb","G#/Ab","A#/Bb"]
const sharpNames = ["C#","D#","F#","G#","A#"]
const flatNames = ["Db","Eb","Gb","Ab","Bb"]





const Options = ({setAb, setBb, setDb, setEb, setGb, enharmonics })=>{
    console.log(enharmonics)

    const handleClick = (e)=>{
        if(e.target.name === "C#/Db"){
            setDb(!enharmonics[2])
        }
        if(e.target.name === "D#/Eb"){
            setEb(!enharmonics[3])
        }
        if(e.target.name === "F#/Gb"){
            setGb(!enharmonics[4])
        }
        if(e.target.name === "G#/Ab"){
            setAb(!enharmonics[0])
        }
        if(e.target.name === "A#/Bb"){
            setBb(!enharmonics[1])
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