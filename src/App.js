import './App.css';


function Box(props){
  return(
    <div className='box'>
      X
    </div>
  );
}

function Row(props){
  return(
    <div className='row'>
        <Box></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
    </div>
  )
}

function Diagram(props){
  return(
    <div className='diagram'>
        <Row></Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
    </div>
  )
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
        <Diagram></Diagram>
        <Diagram></Diagram>
        <Diagram></Diagram>
        
      </div>
    </div>
  );
}



export default App;
