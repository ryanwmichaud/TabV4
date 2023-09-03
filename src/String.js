import React from 'react';

class StringInput extends React.Component{

    constructor(props){
        super(props);
    }
    
    //handleChange(e) {
    //    e.preventDefault();
    //    this.setState({numStrings: e.target.value})
    //}

    render(){

        let stringSelects=[];
        for(let i=0;i<this.props.strings.length;i++){
            stringSelects = stringSelects.concat(<StringSelect key={i}/>);
        }

        return( 
        <div className='stringinput'>
            <label> 
                Number of Strings:
                <select onChange={this.handleChange}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                </select>
            </label>
            <div>
                {stringSelects}
            </div>
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
  
  


  export {StringInput, StringSelect}