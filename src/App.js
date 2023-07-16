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
    this.state = {data: props.data}
  }
  componentDidMount(){

  }
  componentWillUnmount(){

  }
  render(){
    return(
      <div className='diagram'>
        <p className='position_marker'>{this.state.data[0]}</p>
        <div className='diagram_box'>
            <Row rowData={this.state.data[1]}></Row>
            <Row rowData={this.state.data[2]}></Row>
            <Row rowData={this.state.data[3]}></Row>
            <Row rowData={this.state.data[4]}></Row>
            
        </div>
      </div>
      
    )

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
        <Diagram  data = { [
    0,
    [ ' ', ' ', 'E', ' ' ],
    [ ' ', 'C', ' ', ' ' ],
    [ 'G', ' ', ' ', ' ' ],
    [ ' ', ' ', 'E', ' ' ]
  ]}/>
        <Diagram  data = {[
    1,
    [ ' ', 'E', ' ', ' ' ],
    [ 'C', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ' ],
    [ ' ', 'E', ' ', ' ' ]
  ]}/>
        <Diagram  data = {  [
    2,
    [ 'E', ' ', ' ', 'G' ],
    [ ' ', ' ', ' ', 'E' ],
    [ ' ', ' ', ' ', 'C' ],
    [ 'E', ' ', ' ', 'G' ]
  ]}/>
        
      </div>
    </div>
  );
}

/*
[ 0, [ 1, 3 ], [ 2, 4 ], [ 1 ], [ 1, 3 ] ]
[ 1, [ 2 ], [ 1, 3 ], [], [ 2 ] ]
[ 2, [ 1, 4 ], [ 2, 4 ], [ 4 ], [ 1, 4 ] ]


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

 
*/

export default App;
