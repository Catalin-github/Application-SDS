import React from 'react';
import 'components/Offers/Offers.css';
import 'index.css';

function Select(props) {
  var optionElementArray = [];
  var i = 0;
  var iFloat = 0.0;
  while (i < props.array.length) {
    optionElementArray[i] = (
      <option key={props.id + iFloat} value={`${props.array[i]}`} className="option-dropdown-class">
        {props.array[i].includes('-') ? props.array[i].split('-')[1] : props.array[i]}
      </option>
    );

    i++;
    iFloat++;
  }
  if (props.defaultValue === null) {
    return (
      <select
        name={props.name}
        className={'input-all'}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        style={props.style}
        disabled={props.disabled === true ? true : false}
      >
        <option>-</option>
        {optionElementArray}
      </select>
    );
  } else {
    return (
      <select
        name={props.name}
        className={'input-all'}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        style={props.style}
        disabled={props.disabled === true ? true : false}
      >
        {optionElementArray}
      </select>
    );
  }
}

export default Select;
