
import React from 'react'

/*

Takes in an array diagramData. mulit dimensional int array

Diagram data given as:  
  [int position, int stretch, int[] row1, int[] row2, int[] row3...]
Where rows are:   
  [int fretoffset, String note] and null if string not used

  Example:
  [1, 4, [0,'E'],[1,'C'],[0,'G'],['null','null']]
  means: 
    position 1, 
    stretch of 4 frets, 
    first string 0th fret E, 
    second string first 1rst fret C 
    third string 0th fret G, 
    fourth string no notes used 

*/

function Box(props){
    return(
      <div className='box'>
        {props.text}
      </div>
    );
  }
  
  class Row extends React.Component{
  
    
    render(){
  
      let boxes = [];
      for(let i=0;i<this.props.stretch;i++){
        if(i === this.props.rowData[0]){  //if ct is there, add it. else blank box
          boxes = boxes.concat(<Box text={this.props.rowData[1]} key={i}></Box>);
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
  }
  
  
  
  class Diagram extends React.Component{
    
  
  
    render(){
      let position=this.props.diagramData[0]
      let stretch=this.props.diagramData[1]
  
      let rows = [];
      for(let i=2; i<this.props.diagramData.length;i++){
        rows = rows.concat(<Row stretch={stretch} rowData={this.props.diagramData[i]} key={i}></Row>)
      }
  
      return(
        <div className='diagram'>
          <p className='position_marker'>{"Position " + position}</p>
          <div className='diagram_box'>
              {rows}
          </div>
        </div> 
      )
    }
  }

  
  export {Diagram}