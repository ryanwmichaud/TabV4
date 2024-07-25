
import React from 'react'

  
const Box = ({ text }) => {
  return (
    <div className='box'>
      <div className='string'></div>
      {text && <div className='note'>{text}</div>}
    </div>
  )
}
  
const Row = ({stretch, rowData}) => {

  let boxes = [];
  for(let i=0;i<stretch;i++){
    if(i === rowData[0]){  //if ct is there, add it. else blank box
      boxes = boxes.concat(<Box text={rowData[1]} key={i}></Box>);
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
  

const Diagram = ({diagram_data, stretch}) => {
    
    let rows = [];
    for(let i=1; i<diagram_data.length;i++){
      rows = rows.concat(<Row stretch={stretch} rowData={diagram_data[i]} key={i}></Row>)
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