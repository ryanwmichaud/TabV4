import React from 'react';

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
            <select id='Stretch Select' onChange={this.handleChange} value={this.props.stretch}>  
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

  export {StretchInput}