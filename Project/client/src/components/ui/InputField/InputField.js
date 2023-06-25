import React from 'react';
import './InputField.css'
// import {  TextField} from '@material-ui/core';


export default function InputField(
  { name, label, type, placeholder, error, fieldRef,...props }
) {
  // return (
  //   <div >
  //     <TextField
  //       type={type || 'text'}
  //       label={label}
  //       name={name}
  //       error={error ? true : false}
  //       inputRef={fieldRef}
  //       placeholder={placeholder}
  //       helperText={error}
  //       {...props}
  //     />
  //   </div>
  // );
  return (
    <div>
        <input ref={fieldRef}  placeholder="Type ItemCode or scan barcode" type="text" />
    </div>
  );
}