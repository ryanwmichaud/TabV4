import React from 'react';

class StringInput extends React.Component{

    constructor(props){
      super(props);
      this.changeNumStrings=this.changeNumStrings.bind(this);

    }
    
    changeNumStrings(e) {
      e.preventDefault();
      this.props.changeNumStrings(e.target.value)
    }

    render(){
        
        let stringSelects=[];
        for(let i=0;i<this.props.n;i++){        
            stringSelects = stringSelects.concat(<StringSelect name={"String Select "+i} changeOpen={this.props.changeOpen} key={i} displayed={this.props.strings[i]} />);
        }

        console.log(this.props.n)

        return( 
        <div className='stringinput'>
          <div>
              <label> 
                  Number of Strings:
                  <select id='Num Strings Select'  value={this.props.n} onChange={this.changeNumStrings}>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  </select>
              </label>
            </div>
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
      return(
        <div className='stringselect'>
            <select  aria-label={this.props.name} id={this.props.name} onChange={this.changeOpen} value={this.props.displayed.slice(0,-1)}> 
              
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