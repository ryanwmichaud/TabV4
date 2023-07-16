import './App.css';
import React from 'react';


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
    this.state = {data: props.data}
  }
  
  generateDiagrams(){
    let diagrams = [];
    for(let i=0;i<this.state.data.length;i++){
        diagrams = diagrams.concat(
          <Diagram diagram_data={this.state.data[i]} key={i}/>
        );
    }
    return diagrams;
  }

  render(){
    return(
      <div>
        {this.generateDiagrams()}
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
        <Results  data = {[
  [
    0,
    [ ' ', ' ', ' ', 'C' ],
    [ 'E', ' ', ' ', 'G' ],
    [ 'C', ' ', 'D', ' ' ],
    [ 'G', ' ', ' ', ' ' ]
  ],
  [
    1,
    [ ' ', ' ', 'C', ' ' ],
    [ ' ', ' ', 'G', ' ' ],
    [ ' ', 'D', ' ', 'E' ],
    [ ' ', ' ', ' ', ' ' ]
  ],
  [
    2,
    [ ' ', 'C', ' ', 'D' ],
    [ ' ', 'G', ' ', ' ' ],
    [ 'D', ' ', 'E', ' ' ],
    [ ' ', ' ', ' ', 'C' ]
  ],
  [
    3,
    [ 'C', ' ', 'D', ' ' ],
    [ 'G', ' ', ' ', ' ' ],
    [ ' ', 'E', ' ', ' ' ],
    [ ' ', ' ', 'C', ' ' ]
  ],
  [
    4,
    [ ' ', 'D', ' ', 'E' ],
    [ ' ', ' ', ' ', ' ' ],
    [ 'E', ' ', ' ', 'G' ],
    [ ' ', 'C', ' ', 'D' ]
  ],
  [
    5,
    [ 'D', ' ', 'E', ' ' ],
    [ ' ', ' ', ' ', 'C' ],
    [ ' ', ' ', 'G', ' ' ],
    [ 'C', ' ', 'D', ' ' ]
  ],
  [
    6,
    [ ' ', 'E', ' ', ' ' ],
    [ ' ', ' ', 'C', ' ' ],
    [ ' ', 'G', ' ', ' ' ],
    [ ' ', 'D', ' ', 'E' ]
  ],
  [
    7,
    [ 'E', ' ', ' ', 'G' ],
    [ ' ', 'C', ' ', 'D' ],
    [ 'G', ' ', ' ', ' ' ],
    [ 'D', ' ', 'E', ' ' ]
  ],
  [
    8,
    [ ' ', ' ', 'G', ' ' ],
    [ 'C', ' ', 'D', ' ' ],
    [ ' ', ' ', ' ', ' ' ],
    [ ' ', 'E', ' ', ' ' ]
  ]
]} />
      </div>
    </div>
  );
}

/*
[ 0, [ 1, 3 ], [ 2, 4 ], [ 1 ], [ 1, 3 ] ]
[ 1, [ 2 ], [ 1, 3 ], [], [ 2 ] ]
[ 2, [ 1, 4 ], [ 2, 4 ], [ 4 ], [ 1, 4 ] ]

[
 [
    0,
    [ ' ', ' ', 'E', ' ' ],
    [ ' ', 'C', ' ', ' ' ],
    [ 'G', ' ', ' ', ' ' ],
    [ ' ', ' ', 'E', ' ' ]
  ],
  [
    1,
    [ ' ', 'E', ' ', ' ' ],
    [ 'C', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ' ],
    [ ' ', 'E', ' ', ' ' ]
  ],
  [
    2,
    [ 'E', ' ', ' ', 'G' ],
    [ ' ', ' ', ' ', 'E' ],
    [ ' ', ' ', ' ', 'C' ],
    [ 'E', ' ', ' ', 'G' ]
  ]
]

 
*/

export default App;
