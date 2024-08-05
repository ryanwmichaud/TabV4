import React from "react"




const StringInput = ({changeNumStrings, changeOpen, n, strings, enharmonics}) => {


    
    const handleNumStringsChange  = (e) => {
      e.preventDefault()
      changeNumStrings(e.target.value)
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
                <option value={sharpNames[index]}> {`${names[index]}`} </option>
              ))}
              <option value={"Ignore"}> Ignore </option>

            </select>
        </div>
    )
    
  }
  
  


  export {StringInput, StringSelect}