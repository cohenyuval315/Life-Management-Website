import * as React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './TimePicker.css'
import StyledTextField from '../../InputField/TextField/StyledTextField';


const StyledTimePicker = ({value,onChange}) => {
  return (
    <div className='TimeTextFieldContainer'> 
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
                ampm={false}
                value={value}
                onChange={onChange}
                renderInput={(params) => 
                <StyledTextField {...params} />}
            />
        </LocalizationProvider>
    </div>
  )
}

export default StyledTimePicker