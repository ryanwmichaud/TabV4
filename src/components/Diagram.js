
import React from 'react'

/*

Takes int stretch and diagramData

Diagram data given as:  
  [int position, int[] row1, int[] row2, int[] row3]
Where rows are:   
  [int fretoffset, String note] and X if string not used

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
      console.log(stretch, this.props.diagramData)
  
      let rows = [];
      for(let i=2; i<this.props.diagramData.length;i++){
        console.log("row ", i, " ",this.props.diagramData[i])
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