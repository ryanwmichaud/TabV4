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
    super(props);
    this.state = {
      //do I need to save these in state or is props enough?
      strings: this.props.strings,
      chordTones: this.props.chordTones,
      stretch: this.props.stretch,
    };
    
  }

  
  createResults(){
    let data= generate(this.props.strings,this.props.chordTones,this.props.stretch);
    console.log(data)
    let diagrams = [];
    for(let i=0;i<data.length;i++){
        diagrams = diagrams.concat(<Diagram diagram_data={data[i]} key={i}/>);
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






class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className='nameform' onSubmit={this.handleSubmit}>
        
        <label>
          Name:
          <input  type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        
        <input type="submit" value="Submit" />

      </form>
    );
  }
}




class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {stretch:4, strings: ["E4","A4","D5","G5","B5","E6"], chordTones: ["D","F#","A","C#"]};
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">  
          <p>
            Heading
          </p>
      
        </header>
        <div className="main">
          <div className='input'>
            <NameForm className="nameform"></NameForm>
          </div>
          <div className='results'>Results:</div>
          <Results stretch={this.state.stretch} strings={this.state.strings} chordTones={this.state.chordTones}/>
        </div>
      </div>
    );
  }
}


export default App;
