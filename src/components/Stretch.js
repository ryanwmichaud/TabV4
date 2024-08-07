import React from 'react'

const StretchInput = ({changeStretch, stretch}) => {
  
    const handleChange = (e) => {
      e.preventDefault()
      changeStretch(parseInt(e.target.value))  
    }

    return (
      <div className='stretch-input'>
        <label>
          Max number of frets: 
          <select id='stretch-select' onChange={handleChange} value={stretch}>  
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>
  )
  
}

export {StretchInput}