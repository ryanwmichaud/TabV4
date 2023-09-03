import React from 'react';

class StringInput extends React.Component{

    constructor(props){
        super(props);
    }
    

    handleChange(e){
        this.props.changeNumStrings(e.target.value);
    }


    render(){


        let strings=[];
        for(let i=0;i<3;i++){
            strings.concat(<StringSelect></StringSelect>);
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
                {strings}
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