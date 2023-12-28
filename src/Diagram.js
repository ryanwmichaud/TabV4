
import React from 'react'

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
  
  
      let rows = [];
      for(let i=1; i<this.props.diagram_data.length;i++){
        rows = rows.concat(<Row stretch={this.props.stretch} rowData={this.props.diagram_data[i]} key={i}></Row>)
      }
  
      return(
        <div className='diagram'>
          <p className='position_marker'>{"Position " + this.props.diagram_data[0]}</p>
          <div className='diagram_box'>
              {rows}
          </div>
        </div> 
      )
    }
  }

  
  export {Diagram}