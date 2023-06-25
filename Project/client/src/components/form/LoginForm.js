import React from 'react'
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {useForm} from 'react-hook-form';
import {login} from '../../auth';



import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';

const LoginForm = () => {
    const {register,handleSubmit,formState:{errors},reset} = useForm();
    const navigate = useNavigate();

    function login(user){
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
        fetch('/auth/login', requestOptions)
        .then(res => res.json().then(data =>({status: res.status, body:data})))
        .then(data =>{
            if (data.status > 400){
                console.log(data.status)
                console.log(data.body)
                return data.body
            }
            
            if(data.status === 200){
                console.log(data.body)
                login(data.body)
                navigate('/')
            }
          }) 
        .catch(err => console.error(err))
    }   

    const handleLogin = (data,e) => {
        e.preventDefault();

        console.log(data, e);

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        fetch('/auth/login', requestOptions)
        .then(res => res.json().then(data =>({status: res.status, body:data})))
        .then(data =>{
            if (data.status > 400){
                console.log(data.status)
                console.log(data.body)
                return data.body
            }
            
            if(data.status === 200){
                console.log(data.body)
                login(data.body)
                navigate('/')
            }
          }) 
        .catch(err => console.error(err))
        reset()
        

    }
    return (
    <div className="container">
        <div className="form">
        <Form  onSubmit={(e) => {handleSubmit(handleLogin)(e).catch(() => {});}}>
            <Form.Group className="mb-3" controlId="formUsername" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" 
                {...register('username', {required:true,maxLength:25,minLength:4})}/>
                {errors.username && <p style={{color: 'red'}}><small>Username is required </small></p>}
                {errors.username?.type === "maxLength" &&  <p style={{color: 'red'}}><small> max characters should be 25</small></p>}
                {errors.username?.type === "minLength" &&  <p style={{color: 'red'}}><small> min characters should be 4</small></p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" 
                {...register("password",{required:true,maxLength:25,minLength:8})}/>
                {errors.password && <p style={{color: 'red'}}><small>Password is required </small></p>}
                {errors.password?.type === "maxLength" &&  <p style={{color: 'red'}}><small> max characters should be 25</small></p>}
                {errors.password?.type === "minLength" &&  <p style={{color: 'red'}}><small> min characters should be 8</small></p>}
                
            </Form.Group>
            <Form.Group>
                <Button  variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
            <Form.Group>
                <small>Do not have Account? <Link to='/signup'>Create one</Link></small>
            </Form.Group>
        </Form>
        </div>
    </div>
    )
}

// eslint-disable-next-line
const LoginFormhtml = () => {
    return (

        <form class="form-floating needs-validation" novalidate>
            <div class="mb-3">
                <label for="usernameInput" class="form-label">Username</label>
                <input type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="username" required />

            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" id="inputPassword" class="form-control" aria-describedby="passwordHelpBlock" placeholder="password" required />
                <div id="passwordHelpBlock" class="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>

            <div class="mb-3 form-check">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="staySignInCheckbox" />
                    <label class="form-check-label" for="staySignInCheckbox">
                        Stay Signed In
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="agreeTermsCheckbox" required />
                    <label class="form-check-label" for="agreeTermsCheckbox">
                        Agree to terms and conditions
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default LoginForm