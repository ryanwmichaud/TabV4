import './App.css';
import React from 'react';
import { generate} from './main';



function Box(props){
  return(
    <div className='box'>
      {props.text}
    </div>
  );
}

class Row extends React.Component{

  constructor(props){
    super(props);
    this.state = {rowData: this.props.rowData};
  }

  createRow(){
    let boxes = [];
    for(let i=0;i<this.state.rowData.length;i++){
      boxes = boxes.concat(<Box text={this.props.rowData[i]}></Box>);
    }
    
    
    console.log(boxes);
    return boxes;
  }

  render(){
    return(
      <div className='row'>
          {this.createRow()}
      </div>
    )
  }
}



class Diagram extends React.Component{
  constructor(props){
    super(props);
    this.state = {diagram_data: props.diagram_data}
  }
  componentDidMount(){

  }
  componentWillUnmount(){

  }

  createDiagram(){
    let rows = [];
    for(let i=1; i<this.state.diagram_data.length;i++){
      rows = rows.concat(<Row rowData={this.state.diagram_data[i]}></Row>)
    }
    
    return rows;
  }

  render(){
    return(
      <div className='diagram'>
        <p className='position_marker'>{this.state.diagram_data[0]}</p>
        <div className='diagram_box'>
            {this.createDiagram()}
        </div>
      </div> 
    )
  }
}

class Results extends React.Component{

  constructor(props){
    super(props)
    this.state = {data: generate(["C4","G4","D5","A5","E6"],["D","F#","A","C#"])}
  }
/*
  update(){
    this.setState({data: generate(["F4","A4","C4","G4"],["F","A","C","G"])});
  }
*/
  
  createResults(){
    let diagrams = [];
    for(let i=0;i<this.state.data.length;i++){
        diagrams = diagrams.concat(<Diagram diagram_data={this.state.data[i]} key={i}/>);
    }
    return diagrams;
  }


  
  render(){

    return(
      <div>
        {this.createResults()}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">  
        <p>
          Heading
        </p>
    
      </header>
      <div className="main">
        <div className='input'>
          <input type='text'>
          </input>
        </div>
        <div className='results'>Results:</div>
        <Results />
      </div>
    </div>
  );
}



export default App;
