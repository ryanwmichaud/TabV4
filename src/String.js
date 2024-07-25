import React from 'react'

const StringInput = ({changeNumStrings, changeOpen, n, strings}) => {


    
    const handleNumStringsChange  = (e) => {
      e.preventDefault()
      changeNumStrings(e.target.value)
    }

    
    let stringSelects=[]
    for(let i=n-1;i>=0;i--){        
        stringSelects = stringSelects.concat(
        <StringSelect name={"String Select "+i}  index={i} changeOpen={changeOpen} key={i} displayed={strings[i]} />)
        
    }


    return( 
    <div className='stringinput'>
      <div>
          <label for="num-strings-selects"> 
              Number of Strings:
          </label>
          <select id='num-strings-select' value={n} onChange={handleNumStringsChange}>
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
  
  const StringSelect = ({ name, changeOpen, index, displayed }) => {



    const handleChange = (e) => {
      e.preventDefault()
      changeOpen(index, e.target.value)
    }


    return(
        <div className='stringselect'>
            <select  aria-label={name} id={name} onChange={handleChange} value={displayed}> 
              
              <option value={'A'}> A </option>
              <option value={'A#'}> A# </option>
              <option value={'B'}> B </option>
              <option value={'C'}> C </option>
              <option value={'C#'}> C# </option>
              <option value={'D'}> D </option>
              <option value={'D#'}> D# </option>
              <option value={'E'}> E </option>
              <option value={'F'}> F </option>
              <option value={'F#'}> F# </option>
              <option value={'G'}> G </option>
              <option value={'G#'}> G# </option>
              <option value={"Ignore"}> Ignore </option>
            </select>
        </div>
    )
    
  }
  
  


  export {StringInput, StringSelect}