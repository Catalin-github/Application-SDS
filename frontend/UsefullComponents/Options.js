import React from 'react';

function Options(props) {
  var optionElementArray = [];
  var i = 0;
  var iFloat = 0.0;
  while (i < props.array.length) {
    optionElementArray[i] = (
      <option
        key={props.id + iFloat}
        value={`${props.array[i]}`}
        className="option-dropdown-class"
        selected={props.array[i] === props.selectedOption ? 'selected' : false}
      >
        {props.array[i]}
      </option>
    );
    i++;
    iFloat++;
  }
  return optionElementArray;
}

export default Options;
