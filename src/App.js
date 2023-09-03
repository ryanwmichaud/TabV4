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
    
    //console.log(data)
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

class StringInput extends React.Component{
  render(){

    return( 
    <div className='stringinput'>
      <label> 
          Number of Strings:
          <select>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </label>
      <StringSelect></StringSelect>
      <StringSelect></StringSelect>
      <StringSelect></StringSelect>
      <StringSelect></StringSelect>
      <StringSelect></StringSelect>
      <StringSelect></StringSelect>

    </div>
    )
  }
}

class StringSelect extends React.Component{
  render(){
    return(
      <div className='stringselect'>
          <select>
            <option value={'A'}> A </option>
            <option value={'A#'}> A# </option>
            <option value={'B'}> B </option>
            <option value={'C'}> C </option>
            <option value={'C#'}> C# </option>
            <option value={'D'}> D </option>
            <option value={'D#'}> D# </option>
            <option value={'E'}> E </option>
            <option value={'F'}> F </option>
            <option value={'F#'}> F# </option>
            <option value={'G'}> G </option>
            <option value={'G#'}> G# </option>
          </select>

        </div>
    )
  }
}

class ChordToneInput extends React.Component{

  handleChange(){
    this.props.changeChordTones();
  }


  render(){
    return(
      <div >
        <fieldset className='ctinput'> 
            <legend>Chord Tones: </legend>
            <label>A<input type='checkbox' id='A' name='ct'></input></label>
            <label>A#<input type='checkbox' id='A#' name='ct'></input></label>
            <label>B<input type='checkbox' id='B' name='ct'></input></label>
            <label>C<input type='checkbox' id='C' name='ct'></input></label>
            <label>C#<input type='checkbox' id='C#' name='ct'></input></label>
            <label>D<input type='checkbox' id='D' name='ct'></input></label>
            <label>D#<input type='checkbox' id='D#' name='ct'></input></label>
            <label>E<input type='checkbox' id='E' name='ct'></input></label>
            <label>F<input type='checkbox' id='F' name='ct'></input></label>
            <label>F#<input type='checkbox' id='F#' name='ct'></input></label>
            <label>G<input type='checkbox' id='G' name='ct'></input></label>
            <label>G#<input type='checkbox' id='G#' name='ct'></input></label>
          </fieldset>         
        
      </div>

      

    );
  }
}



class StretchInput extends React.Component{

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.changeStretch(parseInt(e.target.value));  
  }

  render(){
    return (
      <div>
        <label>
          Max number of frets: 
          <select onChange={this.handleChange} value={this.props.stretch}>  
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>

      </div>
       

    );

  } 
}

class InputSection extends React.Component{



  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <StretchInput changeStretch={this.props.changeStretch} stretch={this.props.stretch}></StretchInput>
        <ChordToneInput changeChordTones={this.props.changeChordTones} chordTones={this.props.chordTones}></ChordToneInput>
        
        <StringInput></StringInput>

        <input type='submit' value={"Go"}></input>

      </form>
      
    )
  }
}



class App extends React.Component{

  constructor(props){
    super(props);
    this.changeStretch = this.changeStretch.bind(this);
    this.state = {stretch:4, strings: ["E5","A4","D4","G4","B5","D5"], chordTones: ["G","B","D"]};
  }


  changeStretch(value){
    this.setState({stretch:value});
  }
  changeChordTones(x){
    this.setState({chordTones: x});
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
          <InputSection 
            changeStretch={this.changeStretch} 
            stretch={this.state.stretch}>
            changeChordTones={this.changeChordTones}
            chordTones={this.chordTones}
          </InputSection>
          </div>
          <div className='results'>Results:</div>
          <Results stretch={this.state.stretch} strings={this.state.strings} chordTones={this.state.chordTones}/>
        </div>
      </div>
    );
  }
}


export default App;
