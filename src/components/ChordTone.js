import React from "react"

const ChordPreset = ({root, quality, setRoot, setQuality, enharmonics}) => {

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
          <legend className="input-subsubtitle">Chord Preset: </legend>
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

)
  
}

const ChordToneInput = ({ chordTones, removeChordTone, addChordTone, enharmonics, root, quality, setRoot, setQuality }) => {

  const sharpNames = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
  const flatNames = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]
  let boolNames = [false, enharmonics[2],false,enharmonics[3],false,false,enharmonics[4],false,enharmonics[0],false,enharmonics[1],false]

  const handleClick = (e) => {
    let index = e.target.id
    if(chordTones[index] === true){
      removeChordTone(index)      
    }else{
      addChordTone(index)
    }
    
  }


  return(

    <div className="ctinput"> 
      <p className="input-subtitle">Chord</p>
      <legend className="input-subsubtitle">Chord Tones: </legend>
      <div className= "ct-boxes">
        {chordTones.map((isChecked, index) => (
          
          <button 
          id={index} 
          className={`ct-button${chordTones[index] ? '-checked' : ''}`}  
          key={`${index}`}
          onClick={handleClick}>
            {( boolNames[index]) ? flatNames[index]: sharpNames[index]}
          </button>

        ))}
      
    </div>
    <ChordPreset id="" enharmonics={enharmonics}
                  addChordTone={addChordTone} removeChordTone={removeChordTone} chordTones={chordTones} 
                  root={root} quality={quality} setRoot={setRoot} setQuality={setQuality}>
    </ChordPreset>

    </div>

  )

        
  
    
}
  


  
  
  export {ChordToneInput}


  /*
            {chordTones.map((isChecked, index) => (
                <div className="ct-container" key={`${index}`}>
                <input type="checkbox" id={index} name="ct" className="ct-input"  checked={chordTones[index]} onChange={handleClick}/>
                <label htmlFor={`${index}`} className="ct-label">
                  {( boolNames[index]) ? flatNames[index]: sharpNames[index]}
                </label>
                </div>
              ))}
  
  */