import './App.css';
import React from 'react';
import { solve} from './main';



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
  }


  render(){

    let boxes = [];
    for(let i=0;i<this.props.stretch;i++){
      if(i === this.props.rowData[0]){
        boxes = boxes.concat(<Box text={this.props.rowData[1]}></Box>);
      }else{
        boxes = boxes.concat(<Box text=""></Box>);
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
  constructor(props){
    super(props);
  }


  render(){


    let rows = [];
    for(let i=1; i<this.props.diagram_data.length;i++){
      rows = rows.concat(<Row stretch={this.props.stretch} rowData={this.props.diagram_data[i]}></Row>)
    }

    return(
      <div className='diagram'>
        <p className='position_marker'>{this.props.diagram_data[0]}</p>
        <div className='diagram_box'>
            {rows}
        </div>
      </div> 
    )
  }
}

class Results extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      strings: props.strings,
      chordTones: props.chordTones,
      stretch: props.stretch,
    };
    
  }

  componentWillReceiveProps(props){
    this.setState({stretch: props.stretch});
  }


  
  render(){

    let data= solve(this.state.strings,this.state.chordTones,this.state.stretch);
    
    console.log(data)
    let diagrams = [];
    for(let i=0;i<data.length;i++){
        diagrams = diagrams.concat(<Diagram stretch={this.state.stretch} diagram_data={data[i]} key={i}/>);
    }

    return(
      <div>
        {diagrams}
      </div>
    );
  }
}


class StretchForm extends React.Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    e.preventDefault();
    this.props.onStretchChange(parseInt(e.target.value));  
  }

  render(){
    return (
      <form>
        <select onChange={this.handleChange} value={this.props.stretch}>  
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </form>
    );

  } 
}



class App extends React.Component{

  constructor(props){
    super(props);
    this.changeStretch = this.changeStretch.bind(this);
    this.state = {stretch:4, strings: ["E4","A4","D5","G5","B5","E6"], chordTones: ["D","F#","A","C#"]};
  }


  changeStretch(value){
    this.setState({stretch:value});
  }



  render(){
 
    return (
      <div className="App">
        <header className="App-header">  
          <p>
            Chords
          </p>
      
        </header>
        <div className="main">
          <div className='input'>
          <StretchForm onStretchChange={this.changeStretch} stretch={this.state.stretch}></StretchForm>
          </div>
          <div className='results'>Results:</div>
          <Results stretch={this.state.stretch} strings={this.state.strings} chordTones={this.state.chordTones}/>
        </div>
      </div>
    );
  }
}


export default App;
