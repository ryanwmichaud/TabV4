import React from 'react';

class StringInput extends React.Component{

    constructor(props){
      super(props);

    }
    
    changeNumStrings(e) {
      e.preventDefault();
      this.props.changeNumStrings(e.target.key, e.target.value)
    }

    render(){

        let stringSelects=[];
        for(let i=0;i<this.props.strings.length;i++){
            stringSelects = stringSelects.concat(<StringSelect changeOpen={this.props.changeOpen} key={i} displayed={this.props.strings[i]} />);
        }

        return( 
        <div className='stringinput'>
            <label> 
                Number of Strings:
                <select  value={this.props.strings.length} onChange={this.changeNumStrings}>
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

    constructor(props){
      super(props);
      this.changeOpen=this.changeOpen.bind(this);

    }

    changeOpen(e) {
      e.preventDefault();
      this.props.changeOpen(e.target.key, e.target.value);
    }


    render(){
      console.log("render w", this.props.displayed)
      return(
        <div className='stringselect'>
            <select  onChange={this.changeOpen} value={this.props.displayed.slice(0,-1)}>
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