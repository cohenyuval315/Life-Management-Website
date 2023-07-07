import React,{ useState, useEffect, useRef } from 'react';
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Body from '../components/ui/Div/Body';
import InputField from '../components/ui/InputField/InputField';
import { useApi } from '../context/ApiProvider';
import { useFlash } from '../context/FlashProvider';

export default function ForgotPasswordPage() {
  const [formErrors, setFormErrors] = useState({});
  const oldPasswordField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    oldPasswordField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordField.current.value !== password2Field.current.value) {
        setFormErrors({password2: "New passwords don't match"});
    }
    else {
      const response = await api.put('/me', {
        old_password: oldPasswordField.current.value,
        password: passwordField.current.value
      });
      if (response.ok) {
        setFormErrors({});
        flash('Your password has been updated.', 'success');
        navigate('/me');
      }
      else {
        setFormErrors(response.body.errors.json);
      }
    }
  };

  return (<>
    <Body sidebar={true}>
      <h1>Change Your Password</h1>
      <form onSubmit={onSubmit}>
        <InputField
          name="oldPassword" label="Old Password" type="password"
          error={formErrors.old_password} fieldRef={oldPasswordField} />
        <InputField
          name="password" label="New Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <InputField
          name="password2" label="New Password Again" type="password"
          error={formErrors.password2} fieldRef={password2Field} />
        <Button variant="primary" type="submit">Change Password</Button>
      </form>
    </Body></>
  );
}