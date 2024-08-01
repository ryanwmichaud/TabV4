
import React from 'react'

const accidentals = ["C#","D#","F#","G#","A#"]


  
const Box = ({ text }) => {
  return (
    <div className='box'>
      <div className='string'></div>
      {text && <div className='note'>{text}</div>}
    </div>
  )
}
  
const Row = ({stretch, rowData, Ab, Bb, Db, Eb, Gb}) => {

  let boxes = [];
  for(let i=0;i<stretch;i++){
    let noteName = rowData[1]
    //console.log(noteName, Db)
    if(noteName==="C#" && Db){
      noteName = "Db"      
    }
    if(noteName==="D#" && Eb){
      noteName = "Eb"      
    }
    if(noteName==="F#" && Gb){
      noteName = "Gb"      
    }
    if(noteName==="G#" && Ab){
      noteName = "Ab"      
    }
    if(noteName==="A#" && Bb){
      noteName = "Bb"      
    }
    if(i === rowData[0]){  //if ct is there, add it. else blank box
      boxes = boxes.concat(<Box text={noteName} key={i}></Box>);
    }else{
      boxes = boxes.concat(<Box text="" key={i}></Box>);
    }
  }

  return(
    <div className='row'>
        {boxes}
    </div>
  )
}
  

const Diagram = ({diagram_data, stretch, Ab, Bb, Db, Eb, Gb}) => {
    
    let rows = [];
    for(let i=1; i<diagram_data.length;i++){
      rows = rows.concat(<Row stretch={stretch} rowData={diagram_data[i]} key={i} Ab={Ab} Bb={Bb} Db={Db} Eb={Eb} Gb={Gb}></Row>)
    }
  
    return(
      <div className='diagram'>
        <p className='position-marker'>{"Position " + diagram_data[0]}</p>
        <div className='diagram_box'>
            {rows}
        </div>
      </div> 
    )
    
  }

  
  export {Diagram}