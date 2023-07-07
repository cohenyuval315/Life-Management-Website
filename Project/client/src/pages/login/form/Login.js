import React,{useState,useEffect,useRef} from 'react'
import { useNavigate,Navigate, useLocation ,Link} from 'react-router-dom';
import Body from '../../../components/ui/Div/Body';
import { useUser } from '../../../context/UserProvider';
import { useFlash } from '../../../context/FlashProvider';
import InputField from '../../../components/ui/InputField/InputField';

const Login = () => {

    const { login } = useUser();
    const flash = useFlash();
    const navigate = useNavigate();
    const location = useLocation();

    const [formErrors, setFormErrors] = useState({});
    const usernameField = useRef();
    const passwordField = useRef();
    const rememberMe = useRef();

    useEffect(() => {
        // usernameField.current
    }, []);

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

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const username = usernameField.current.value;
        const password = passwordField.current.value;

        const errors = {};

        if (!username) {
        errors.username = 'Username must not be empty.';
        }
        if (username.length < 3) {
        errors.username = 'Username must be bigger than 3.';
        }
        if (!password) {
        errors.password = 'Password must not be empty.';
        }
        if (password.length < 3) {
        errors.password = 'Password must be bigger than 3.';
        }
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
        return;
        }

        const result = await login(username, password);
        console.log(result)
        if (result === 'warning') {
            flash('Invalid username or password', 'danger');
        }
        else if (result === 'ok') {
            // let next = '/';
            // if (location.state && location.state.next) {
            //     next = location.state.next;
            // }
            // navigate(next);
            console.log("success")
            navigate('/home');
        }
    };

    return(
        <Body>
        <div style={{position:"absolute",color:"black", backgroundColor:"white",border: "3px solid green", width:"300px",textAlign:"center",marginLeft:"auto",marginRight:"auto",left:"0",right:"0"}}>
            <div >
                <div align='center'>
                     <div style={avatarStyle}>icon</div>
                    <h2>Sign In</h2>
                </div>

                username : <InputField 
                     name="username" label="Username or email address"
                    error={formErrors.username} fieldRef={usernameField} 
                    fullWidth 
                    required
                    />
                <br/>
                password : 
                <InputField
                   name="password" label="Password" type="password"
                   error={formErrors.password} fieldRef={passwordField} fullWidth required/>

                <div
                    ref={rememberMe}
                    control={
                    <div
                        name="checkedB"
                        color="primary"

                    />
                    }
                    label="Remember me"
                 />
                <br/>
                <button style={{color:"black",backgroundColor:"gray"}} onClick={(e)=>onSubmit(e)}>Sign in</button>
                <div>
                     <Link style={{color:"blue"}} href="/forgot-password" >
                        Forgot password ?
                </Link>
                </div>
                <div > Do you have an account ?
                     <Link style={{color:"blue"}} href="/signup" >
                        Sign Up 
                </Link>
                </div>
            </div>
        </div>
        </Body>
    )
}

export default Login