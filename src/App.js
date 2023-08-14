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
  }


  render(){

    let boxes = [];
    for(let i=0;i<this.props.rowData.length;i++){
      boxes = boxes.concat(<Box text={this.props.rowData[i]}></Box>);
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

    console.log("rendering diagram", this.props.diagram_data);
    let rows = [];
    for(let i=1; i<this.props.diagram_data.length;i++){
      rows = rows.concat(<Row rowData={this.props.diagram_data[i]}></Row>)
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
      //do I need to save these in state or is props enough?
      strings: props.strings,
      chordTones: props.chordTones,
      stretch: props.stretch,
    };
    
  }

  componentWillReceiveProps(props){
    this.setState({stretch: props.stretch});
  }


  
  render(){

    console.log("rendiering results",this.props.stretch)


    let data= generate(this.state.strings,this.props.chordTones,this.props.stretch);
    console.log(data);
    let diagrams = [];
    for(let i=0;i<data.length;i++){
        diagrams = diagrams.concat(<Diagram diagram_data={data[i]} key={i}/>);
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
    this.props.onChange();
    
  }

  render(){
    return (
      <form>
        <select onChange={this.handleChange}>  
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
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


  changeStretch(){
    this.setState({stretch:5})
    
  }



  render(){
    console.log("rendering");
    console.log(this.state);

    return (
      <div className="App">
        <header className="App-header">  
          <p>
            Heading
          </p>
      
        </header>
        <div className="main">
          <div className='input'>
          <StretchForm onChange={this.changeStretch}></StretchForm>
          </div>
          <div className='results'>Results:</div>
          <Results stretch={this.state.stretch} strings={this.state.strings} chordTones={this.state.chordTones}/>
        </div>
      </div>
    );
  }
}


export default App;
