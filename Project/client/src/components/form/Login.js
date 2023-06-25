import React,{useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {login} from '../../auth';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    function handleUsernameOnChange(e){
        setUsername(e.target.value)
    }

    function handlePasswordOnChange(e){
        setPassword(e.target.value)
    }
    const handleLogin = (e) => {
            e.preventDefault();

            const requestOptions = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username":username,
                    "password":password
                }),
            }

            fetch('api/v1/auth/login', requestOptions)
            .then(res => res.json())
            .then(data =>{
                    login(data)
                    console.log("login",data)
            }) 
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' value={username} onChange={handleUsernameOnChange} placeholder='Enter username' fullWidth required/>
                <TextField label='Password' value={password} onChange={handlePasswordOnChange} placeholder='Enter password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={handleLogin} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login