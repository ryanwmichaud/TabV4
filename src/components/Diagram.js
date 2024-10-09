
import React from 'react'



  
const Box = ({ text, vertical }) => {
  return (
    <div className={`box-container-${vertical ? 'v' : 'h'}`}>
      <div className='box'></div>
      {text && <div className='note'>{text}</div>}
    </div>
  )
}
  

const Row = ({stretch, rowData, enharmonics, vertical}) => {
  

  let boxes = []
  for(let i=0;i<stretch;i++){
    let noteName = rowData[1]
    //console.log(noteName, Db)
    if(noteName==="C#" && enharmonics[2]){
      noteName = "Db"      
    }
    if(noteName==="D#" && enharmonics[3]){
      noteName = "Eb"      
    }
    if(noteName==="F#" && enharmonics[4]){
      noteName = "Gb"      
    }
    if(noteName==="G#" && enharmonics[0]){
      noteName = "Ab"      
    }
    if(noteName==="A#" && enharmonics[1]){
      noteName = "Bb"      
    }
    if(i === rowData[0]){  //if ct is there, add it. else blank box
      boxes = boxes.concat(<Box text={noteName} vertical={vertical} key={i}></Box>)
    }else{
      boxes = boxes.concat(<Box text="" vertical={vertical} key={i}></Box>)
    }

    if(i !== stretch-1){  //if ct is there, add it. else blank box
      boxes = boxes.concat(
      <div className={`fret-container-${vertical ? 'v' : 'h'}`} key={'fret-container'+i}>
        <div className={`fret-${vertical ? 'v' : 'h'}`}>
        </div>
      </div>)
    }
    
  }

  return(
    <div className={`row-${vertical ? 'v' : 'h'}`}>
        {boxes}
    </div>
  )
}
  

const Diagram = ({diagram_data, stretch, enharmonics, vertical}) => {
    
    let rows = []
    if (vertical){
      for(let i=diagram_data.length-1; i>0; i--){
        rows = rows.concat(<div className={`string-container-${vertical ? 'v' : 'h'}`} key={'string-container'+i}> 
          <div className={`string-visible-${vertical ? 'v' : 'h'}`} key={'string-visible'+i}></div>
        </div>)
        rows = rows.concat(<Row stretch={stretch} rowData={diagram_data[i]} key={'row'+i} enharmonics={enharmonics} vertical={vertical}></Row>)
      }
    }else{
      for(let i=1; i<diagram_data.length;i++){
        rows = rows.concat(<div className={`string-container-${vertical ? 'v' : 'h'}`} key={'string-container'+i}> 
          <div className={`string-visible-${vertical ? 'v' : 'h'}`} key={'string-visible'+i}></div>
        </div>)
        rows = rows.concat(<Row stretch={stretch} rowData={diagram_data[i]} key={'row'+i} enharmonics={enharmonics} vertical={vertical}></Row>)
      }
    }

  
    return(
      <div className='diagram'>
        <p className='position-marker'>{"Position " + diagram_data[0]}</p>
        <div className={`diagram-box-${vertical ? 'v' : 'h'}`}>
            {rows}
        </div>
      </div> 
    )
    
  }

  
  export {Diagram}