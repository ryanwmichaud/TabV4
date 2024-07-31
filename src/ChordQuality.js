import React, { useEffect, useState } from "react"

const ChordQuality = ({ chordTones, removeChordTone, addChordTone, root, quality, setRoot, setQuality }) => {

    const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]





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
              <option value={"A"}> A </option>
              <option value={"A#"}> A# </option>
              <option value={"B"}> B </option>
              <option value={"C"}> C </option>
              <option value={"C#"}> C# </option>
              <option value={"D"}> D </option>
              <option value={"D#"}> D# </option>
              <option value={"E"}> E </option>
              <option value={"F"}> F </option>
              <option value={"F#"}> F# </option>
              <option value={"G"}> G </option>
              <option value={"G#"}> G# </option>
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
