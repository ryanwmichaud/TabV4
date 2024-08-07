import React, { useEffect, useState } from "react"

const ChordQuality = ({ chordTones, removeChordTone, addChordTone, root, quality, setRoot, setQuality, enharmonics}) => {

    const names = ["C",`${enharmonics[2]?"Db":"C#"}`,"D",`${enharmonics[3]?"Eb":"D#"}`,"E","F",`${enharmonics[4]?"Gb":"F#"}`,"G",`${enharmonics[0]?"Ab":"G#"}`,"A",`${enharmonics[1]?"Bb":"A#"}`,"B"]
    const sharpNames = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]

    const handleChange = (e) => {
        if (e.target.id === "root-select"){
            setRoot(e.target.value)
        }else{
            setQuality(e.target.value)
        }
    }

  return(

    <div className="chord-quality"> 
            <legend>Chord Quality: </legend>
            <div className= "chord-quality-section">
            <select id="root-select" className="root-select"  onChange={handleChange} value={root} aria-label="chord root select"> 
            
              <option value={"Select"}> Select </option>
              {names.map((name, index) => (
                <option key={index} value={sharpNames[index]}> {`${names[index]}`} </option>
              ))}
              
              
            </select>

            <select id="quality-select" className="quality-select"  onChange={handleChange} value={quality}  aria-label="chord quality select" > 
                <option value={"Select"}> Select </option>
                <option value={"Major"}> Major </option>
                <option value={"Minor"}> Minor </option>
                <option value={"Augmented"}> Augmented </option>
                <option value={"Diminished"}> Diminished </option>
            </select>
            
            </div>
    </div>

  )

        
  
    
}
  
  
  
  export {ChordQuality}
