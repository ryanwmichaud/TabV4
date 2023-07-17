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

function Row(props){
  return(
    <div className='row'>
        <Box text={props.rowData[0]}></Box>
        <Box text={props.rowData[1]}></Box>
        <Box text={props.rowData[2]}></Box>
        <Box text={props.rowData[3]}></Box>
    </div>
  )
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
  render(){
    return(
      <div className='diagram'>
        <p className='position_marker'>{this.state.diagram_data[0]}</p>
        <div className='diagram_box'>
            <Row rowData={this.state.diagram_data[1]}></Row>
            <Row rowData={this.state.diagram_data[2]}></Row>
            <Row rowData={this.state.diagram_data[3]}></Row>
            <Row rowData={this.state.diagram_data[4]}></Row>
            
        </div>
      </div> 
    )
  }
}

class Results extends React.Component{

  constructor(props){
    super(props)
    this.state = {data: generate(["C4","G4","D5","A5"],["F","A","C","G"])}
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
