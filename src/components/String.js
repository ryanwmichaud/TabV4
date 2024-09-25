import React from "react"



const StringInput = ({changeNumStrings, changeOpen, n, strings, enharmonics, setStrings}) => {


    const handleNumStringsChange  = (e) => {
      e.preventDefault()
      changeNumStrings(e.target.value)
    }

    const handleTuningPresetChange = (e) => {
      e.preventDefault()
    
      switch(e.target.value) {
        case "Standard Guitar":
          changeNumStrings(6)
          setStrings(["E","A","D","G","B","E"])
          break;
        case "DADGAD":
          changeNumStrings(6)
          setStrings(["D","A","D","G","A","D"])
          break;
          case "Mandolin":
            changeNumStrings(4)
            setStrings(["G","D","A","E"])
            break;
        default:
          console.error("Error -", e.target.value, "not recognized");
          
      }
    }
    

    
    let stringSelects=[]
    for(let i=n-1;i>=0;i--){        
        stringSelects = stringSelects.concat(
        <StringSelect name={"String Select "+i}  index={i} changeOpen={changeOpen} key={i} displayed={strings[i]} enharmonics={enharmonics} />)
        
    }


    return( 
    <div className="string-input">
      <div>
        <label htmlFor="num-strings-select"> 
            Number of Strings:
        </label>
        <select id="num-strings-select" value={n} onChange={handleNumStringsChange}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </div>
      <div>
          {stringSelects}
      </div>

      <div>
        <label htmlFor="tuning-presets"> 
          Tuning Preset:
        </label>
        <select id="tuning-presets" onClick={handleTuningPresetChange}>
          <option value={"Standard Guitar"}>Standard Guitar</option>
          <option value={"DADGAD"}>DADGAD</option>
          <option value={"Mandolin"}>Mandolin</option>
        </select>
      </div>
      

    </div>
    )
}
  
const StringSelect = ({ name, changeOpen, index, displayed, enharmonics}) => {

    const names = ["C",`${enharmonics[2]?"Db":"C#"}`,"D",`${enharmonics[3]?"Eb":"D#"}`,"E","F",`${enharmonics[4]?"Gb":"F#"}`,"G",`${enharmonics[0]?"Ab":"G#"}`,"A",`${enharmonics[1]?"Bb":"A#"}`,"B"]
    const sharpNames = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
    

    const handleChange = (e) => {
      e.preventDefault()
      changeOpen(index, e.target.value)
    }


    return(
        <div >
            <select className="stringselect"  id={name} onChange={handleChange} value={displayed} aria-label={name}> 
              {names.map((name, index) => (
                <option key={index} value={sharpNames[index]}> {`${names[index]}`} </option>
              ))}
              <option value={"Ignore"}> Ignore </option>
            </select>

        </div>
    )
    
  }
  
  


  export {StringInput, StringSelect}