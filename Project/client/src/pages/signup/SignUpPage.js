
import React,{ useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlash } from '../../context/FlashProvider'
import { useApi } from '../../context/ApiProvider';
import InputField from '../../components/ui/InputField/InputField';
import Body from '../../components/ui/Div/Body';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function onlyLetters(str) {
  return /^[A-Za-z]*$/.test(str);
}
const SignUpPage = () => {

    const [formErrors, setFormErrors] = useState({});
    const usernameField = useRef();
    const emailField = useRef();
    const passwordField = useRef();
    const password2Field = useRef();
    const firstNameField = useRef();
    const lastNameField = useRef();
    const dateOfBirthField = useRef();

    const navigate = useNavigate();
    const api = useApi();
    const flash = useFlash();

  useEffect(() => {
    usernameField.current.focus();
  }, []);

  function validation(){
    if (passwordField.current.value !== password2Field.current.value) {
        setFormErrors({password2: "Passwords don't match"});
        return false
    }
    if (usernameField.current.value.length < 4) {
        setFormErrors({username: "Username length < 4"});
        return false
    }
    if (emailField.current.value.length < 10) {
        setFormErrors({email: "email length < 10"});
        return false
    }
    if (!validateEmail(emailField.current.value)) {
        setFormErrors({email: "email invalid"});
        return false
    }
    if (firstNameField.current.value.length < 2) {
        setFormErrors({firstName: "first name length < 2"});
        return false
    }
    if (!onlyLetters(firstNameField.current.value)) {
        setFormErrors({firstName: "first name only letters"});
        return false
    }
    if (!onlyLetters(lastNameField.current.value.length)) {
        setFormErrors({lastName: "last name only letters"});
        return false
    }
    if (firstNameField.current.value) {
        setFormErrors({firstName: "first name length < 2"});
        return false
    }
    if (passwordField.current.value.length < 8) {
        setFormErrors({password: "Password length < 8"});
        return false
    }
    // if (Date(dateOfBirthField.current.value)) {
    //     setFormErrors({dateOfBirth: "date invalid"});
    //     return false
    // }
    return true
  }
  const onSubmit = async (event) => {
    event.preventDefault();

    if (passwordField.current.value !== password2Field.current.value) {
      setFormErrors({password2: "Passwords don't match"});
    }
    if (!validation()){

    }
    else {

      const data = await api.post('/users', {
        username: usernameField.current.value,
        firstName: firstNameField.current.value,
        lastName: lastNameField.current.value,
        dateOfBirth:dateOfBirthField.current.value,
        email: emailField.current.value,
        password: passwordField.current.value
      });

      if (!data.ok) {
        setFormErrors(data.body.errors.json);
      }
      else {
        setFormErrors({});
        flash('You have successfully registered!', 'success');
        navigate('/login');
      }
    }
  };

  return (
    <Body >
      <div style={{color:"black",backgroundColor:"white"}}>
      <h1>Register</h1>
      <form>
        username :<InputField
          name="username" label="Username"
          error={formErrors.username} fieldRef={usernameField} />
        email <InputField
          name="email" label="Email address"
          error={formErrors.email} fieldRef={emailField} />
        firstName<InputField
          name="firstName" label="first name"
          error={formErrors.firstName} fieldRef={firstNameField} />
        lastName<InputField
          name="lastName" label="last name"
          error={formErrors.lastName} fieldRef={lastNameField} />
        date of birth :<InputField
          name="dateOfBirth" type={"date"}
          error={formErrors.dateOfBirth} fieldRef={dateOfBirthField} defaultValue={"2000-01-01"}  />
        password<InputField
          name="password" label="Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        password check<InputField
          name="password2" label="Password again" type="password"
          error={formErrors.password2} fieldRef={password2Field} />
        <button onClick={onSubmit}>Register</button>
      </form>
      </div>
    </Body>
  );

}

export default SignUpPage