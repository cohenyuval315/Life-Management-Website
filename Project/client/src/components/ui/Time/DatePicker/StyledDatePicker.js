import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './DatePicker.css'
import StyledTextField from '../TextField/StyledTextField';
import moment from 'moment';

const StyledDatePicker = ({value,onChange}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        inputFormat='DD/MM/YYYY'
        minDate={moment()}
        value={value}
        onChange={onChange}  
        renderInput={(params) => 
          <StyledTextField {...params}/>}
      />
    </LocalizationProvider>
  );
}

export default StyledDatePicker