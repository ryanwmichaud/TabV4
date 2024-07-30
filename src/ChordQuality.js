import React, { useEffect, useState } from "react"

const ChordQuality = ({ chordTones, removeChordTone, addChordTone, changeQuality }) => {

    const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]

    const [root, setRoot] = useState(null)
    const [quality, setQuality] = useState(null)

    useEffect(() =>{
        console.log(root, quality)
        changeQuality(root, quality)
      }, [root, quality])


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
            <select  aria-label="chord root select" id="root-select" className="root-select"  onChange={handleChange} > 
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

            <select  aria-label="chord quality select" id="quality-select" className="quality-select"  onChange={handleChange} > 
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
