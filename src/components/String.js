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
        case "Open G Guitar":
          changeNumStrings(6)
          setStrings(["D","B","D","G","B","D"])
          break;
        case "Open D Guitar":
          changeNumStrings(6)
          setStrings(["D","A","D","F#","A","D"])
          break;
        case "Open E Guitar":
          changeNumStrings(6)
          setStrings(["E","B","E","G#","B","E"])
          break;
        case "Bass":
          changeNumStrings(4)
          setStrings(["E","A","D","G"])
          break;
          case "5 String Bass":
            changeNumStrings(5)
            setStrings(["B","E","A","D","G"])
            break;
          case "6 String Bass":
              changeNumStrings(6)
              setStrings(["B","E","A","D","G","C"])
              break;
        case "Ukulele":
            changeNumStrings(4)
            setStrings(["G","C","E","A"])
            break;
        case "Mandolin":
          changeNumStrings(4)
          setStrings(["G","D","A","E"])
          break;
        case "Mandola":
          changeNumStrings(4)
          setStrings(["C","G","D","A"])
          break;
        case "Cross A":
          changeNumStrings(4)
          setStrings(["A","E","A","E"])
          break;
        case "ADAE":
          changeNumStrings(4)
          setStrings(["A","D","A","E"])
          break;
        case "Irish Bouzouki":
          changeNumStrings(4)
          setStrings(["G","D","A","D"])
          break;
        case "7 String Guitar":
          changeNumStrings(7)
          setStrings(["B","E","A","D","G","B","E"])
          break;
        case "8 String Guitar":
          changeNumStrings(8)
          setStrings(["F#","B","E","A","D","G","B","E"])
          break;
        case "9 String Guitar":
          changeNumStrings(9)
          setStrings(["F#","B","E","A","D","G","B","E","A"])
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
      <p className="input-subtitle">Instrument</p>
      <div id="number-of-strings-section">
        <p className="input-subsubtitle"> Number of Strings: </p>
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
        <p className="input-subsubtitle"> Tuning: </p>

          {stringSelects}
      </div>

      <div>
        <p className="input-subsubtitle"> 
          Instrument Preset:
        </p>
        <select id="tuning-presets" onChange={handleTuningPresetChange}>
          <option value={"Standard Guitar"}>Standard Guitar</option>
          <option value={"DADGAD"}>DADGAD</option>
          <option value={"Open E Guitar"}>Open E Guitar</option>
          <option value={"Open G Guitar"}>Open G Guitar</option>
          <option value={"Open D Guitar"}>Open D Guitar</option>
          <option value={"Bass"}>Bass</option>
          <option value={"5 String Bass"}>5 String Bass</option>
          <option value={"6 String Bass"}>6 String Bass</option>
          <option value={"Ukulele"}>Ukulele</option>
          <option value={"Mandolin"}>Mandolin</option>
          <option value={"Mandola"}>Mandola</option>
          <option value={"Cross A"}>Cross A</option>
          <option value={"ADAE"}>ADAE</option>
          <option value={"Irish Bouzouki"}>Irish Bouzouki</option>
          <option value={"7 String Guitar"}>7 String Guitar</option>
          <option value={"8 String Guitar"}>8 String Guitar</option>
          <option value={"9 String Guitar"}>9 String Guitar</option>

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