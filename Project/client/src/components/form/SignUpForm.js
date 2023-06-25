import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';


const SignUpForm = () => {

    const { register, handleSubmit, watch,reset ,formState: { errors } } = useForm();

    const submitForm= (data) => {
        const body={
            "username":data.username,
            "password":data.password,
            "firstname":data.firstname,
            "lastname":data.lastname,
            "date_of_birth":data.date_of_birth,
            "email":data.email,
        }
        console.log(JSON.stringify(body))
// confirmPassword: "12345678"
// date: "1997-08-11"
// email: "cyuvalsilver@gmail.com"
// firstName: "yuval"
// lastName: "cohen"
// password: "12345678"
// username: "cohenyuval"
        if (data.password ===data.confirmPassword){
            const requestOptions = {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
            
            fetch('/auth/signup', requestOptions)
            .then(res => res.json())
            .then(data => console.log(data)) 
            .catch(err => console.error(err))
        }
        else{
            alert("passwords does not match")
        }
        reset()

    }

    return (
        <div className="container-xxl">
            <div className="form">
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" 
                        {...register("username",{required:true,maxLength:25,minLength:4})}/>
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

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Control type="password" placeholder="Confirm Password" 
                        {...register("confirmPassword",{required:true,maxLength:25,minLength:8,validate: (val) => {
                            if (watch('password') !== val) {
                              return "Your passwords do no match";
                            }
                        }
                        })}
                            />
                        {errors.confirmPassword && <p style={{color: 'red'}}><small>Confirm password is required,</small></p>}
                        {errors.confirmPassword?.type === "maxLength" &&  <p style={{color: 'red'}}><small> max characters should be 25</small></p>}
                        {errors.confirmPassword?.type === "minLength" &&  <p style={{color: 'red'}}><small> min characters should be 8</small></p>}
                        {errors.confirmPassword?.type === "validate" &&  <p style={{color: 'red'}}><small> Passwords do not match</small></p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                        {...register("email",{required:true,maxLength:25,minLength:8})}/>
                        {errors.email && <p style={{color: 'red'}}><small> email is required</small></p>}
                        {errors.email?.type === "maxLength" &&  <p style={{color: 'red'}}><small> max characters should be 25</small></p>}
                        {errors.email?.type === "minLength" &&  <p style={{color: 'red'}}><small> min characters should be 8</small></p>}
                    </Form.Group>

                    <Form.Group className="mb-3 row" controlId="formFirstName">
                        <Form.Control className="col" type="text" placeholder="Enter first name"  {...register("firstname",{required:true, minLength:2, maxLength:25})}/>
                        {errors.firstname && <p style={{color: 'red'}}><small>First name is required</small></p>}
                        {errors.firstname?.type === "maxLength" &&  <p style={{color: 'red'}}><small> max characters should be 25</small></p>}
                        {errors.firstname?.type === "minLength" &&  <p style={{color: 'red'}}><small> min characters should be 2</small></p>}
                    </Form.Group>

                    <Form.Group className="mb-3 row" controlId="formLastName">
                        <Form.Control className="col" type="text" placeholder="Enter last name"  {...register("lastname",{required:true, minLength:2, maxLength:25})}/>
                        {errors.lastname && <p style={{color: 'red'}}><small>Last name is required</small></p>}
                        {errors.lastname?.type === "maxLength" &&  <p style={{color: 'red'}}><small> max characters should be 25</small></p>}
                        {errors.lastname?.type === "minLength" &&  <p style={{color: 'red'}}><small> min characters should be 2</small></p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>date of birth</Form.Label>
                        <Form.Control type="date"
                        {...register("date_of_birth",{required:true})}/>
                        {errors.date_of_birth && <p style={{color: 'red'}}><small> choose valid date</small></p>}
                    </Form.Group>   

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Use Default Settings" />
                    </Form.Group>
                    <Form.Group>
                        <Button as='sub'variant="primary" type="submit" onClick={handleSubmit(submitForm)}>
                            Submit
                        </Button>
                    </Form.Group>
                    <Form.Group>
                    <small>Already have Account? <Link to='/login'>Log in</Link></small>
                </Form.Group>
                </Form>
            </div>
        </div>
    );
}

// eslint-disable-next-line
const SignUpFormhtml = () => {
    return (
        <form class="form-floating">

            <div class="mb-3">
                <label for="inputUsername" class="form-label">Username</label>
                <input type="text" id="inputUsername" class="form-control" aria-describedby="usernameHelpBlock" placeholder='username' />
                <div id="usernameHelpBlock" class="form-text">
                    Your username must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" id="inputPassword" class="form-control" aria-describedby="passwordHelpBlock" placeholder='password' />

            </div>
            <div class="mb-3">
                <input type="password" id="inputPasswordConfirm" class="form-control" aria-describedby="passwordHelpBlock" placeholder='password confirm' />
                <div id="passwordHelpBlock" class="form-text">
                    Your password must match the current.
                </div>
                <div id="passwordHelpBlock" class="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
                </div>
            </div>
            <br />
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder='name@example.com' />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3 form-check">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled />
                    <label class="form-check-label" for="flexCheckCheckedDisabled">
                        creating default workspace
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default SignUpForm