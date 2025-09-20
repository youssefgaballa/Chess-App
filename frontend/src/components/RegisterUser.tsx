import {  useState, useEffect,  type ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from "react-router";

import {Error, Check, Visibility, VisibilityOff} from '@mui/icons-material'
import axios from 'axios';

// Username can be 3 to 20 characters long and consist of letters, numbers, underscores
// The username must start with a letter

// Password must be at least 8 characters long and contain
// an uppercase letter, lowercase letter, a number, and a symbol
const usernameRegexp: RegExp = /^[A-z]\w{2,20}$/;
const passwordRegexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,255}$/;
// Please note that this email regex is not RFC 5322 compliant. 
// Best way to validate email is to send a confirmation email to it.
const emailRegexp: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RegisterUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // TODO: add signin link + route
  // TODO: validate email by sending an email to it
  // TODO: route to login page after successful registration
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [role, setRole] = useState('user'); // default role is 'user'


  const [errorMessage, setErrorMessage] = useState('');
  //const [success, setSuccess] = useState(false);

  useEffect(() => {
    const match = usernameRegexp.test(username);
    //check if username is unique in database
    setIsUsernameValid(match);
    setErrorMessage('');
    //console.log(match);
  }, [username]);

  useEffect(() => {
    const match = emailRegexp.test(email);
    setIsEmailValid(match);
    setErrorMessage('');
  }, [email]);

  useEffect(() => {
    const match = passwordRegexp.test(password);
    setIsPasswordValid(match);
    setIsConfirmPasswordValid(password === confirmPassword);
    setErrorMessage('');
    //console.log(match);
  }, [password, confirmPassword]); 

  const changeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    //console.log("username = " + username);
  };

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    //console.log("email = " + email);
  }
  const changeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    const match = /^[A-Za-z]{1,}$/.test(event.target.value);
    setIsFirstNameValid(match);
    //console.log("firstName = " + firstName);
  }

  const changeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    const match = /^[A-Za-z]{1,}$/.test(event.target.value);
    setIsLastNameValid(match);
    //console.log("lastName = " + lastName);
  }


  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    //console.log("password = " + password);
  };

  const changeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    //console.log("confirmPassword = " + confirmPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    //console.log("handleSubmit()");
    event.preventDefault();

    const reqBody = { username, email, firstName, lastName, password, role };
    //console.log(reqBody);
    const response = await axios.post('http://localhost:5000/registration', reqBody).catch((error) => {
      console.log(error);
      if (!error?.response) {
        setErrorMessage("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMessage(error.response.data['Client Error']);
      } else {
        setErrorMessage("Registration Failed");
      }
      return;
    });
    console.log(response);
    if (!errorMessage && response?.status === 200) {
      //console.log("successful registration");
      navigate('/login', { replace: true });
    }
  };

  return (

    <div className='flex w-full h-full '>
      <div className='w-[30vw] h-full'></div>
      <div className="text-center w-[40vw] h-[80vh] mt-[2%] pt-[5%] text-2xl rounded-xl shadow-lg border border-black overflow-auto">
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-start text-center mt-[3%] mb-[3%] w-full h-[85%]'>
          <span className='font-bold text-5xl mb-[3%]'>User Registration</span><br />
          <span className='text-xl'>Sign up for a free user account or login.</span><br />

          <label htmlFor='username'>Username: <span className='text-red-500'>*</span></label>
          <input id='username' type='text' onChange={(event) => changeUsername(event)} onFocus={() => setUsernameFocus(true)} onBlur={() => setUsernameFocus(false)}
            required className=" focus:outline-none border border-black rounded-md" />
          {isUsernameValid ? <span hidden={username ? false : true} ><Check style={{ fill: 'green' }} /></span>
            : <span hidden={username ? false : true} ><Error style={{ fill: 'red' }} /></span>}

          {usernameFocus && username && !isUsernameValid &&
            <div className='flex justify-center'>
              <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                Invalid Username:<br />
                Username must be 3 to 20 characters long, start with a letter, and contain only letters, numbers, and underscores.
              </div>
            </div>
          }

          <label htmlFor='email'>Email: <span className='text-red-500'>*</span></label>
          <input id='email' type='text' onChange={(event) => changeEmail(event)} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
            required className=" focus:outline-none border border-black rounded-md" />
          {isEmailValid ? <span hidden={email ? false : true} ><Check style={{ fill: 'green' }} /></span>
            : <span hidden={email ? false : true} ><Error style={{ fill: 'red' }} /></span>}
          {emailFocus && email && !isEmailValid &&
            <div className='flex justify-center'>
              <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                Invalid Email:<br />
                Email must be a valid email address.
              </div>
            </div>
          }


          <label htmlFor='firstName'>First Name: <span className='text-red-500'>*</span></label>
          <input id='firstName' type='text' onChange={(event) => changeFirstName(event)} onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)}
            required className=" focus:outline-none border border-black rounded-md" />
          {isFirstNameValid ? <span hidden={firstName ? false : true} ><Check style={{ fill: 'green' }} /></span>
            : <span hidden={firstName ? false : true} ><Error style={{ fill: 'red' }} /></span>}
          {firstNameFocus && firstName && !isFirstNameValid &&
            <div className='flex justify-center'>
              <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                Invalid First Name:<br />
                First Name must be at least 1 character long and can only contain letters.
              </div>
            </div>
          }

          <label htmlFor='lastName'>Last Name: <span className='text-red-500'>*</span></label>
          <input id='lastName' type='text' onChange={(event) => changeLastName(event)} onFocus={() => setLastNameFocus(true)} onBlur={() => setLastNameFocus(false)}
            required className=" focus:outline-none border border-black rounded-md" />
          {isLastNameValid ? <span hidden={lastName ? false : true} ><Check style={{ fill: 'green' }} /></span>
            : <span hidden={lastName ? false : true} ><Error style={{ fill: 'red' }} /></span>}
          {lastNameFocus && lastName && !isLastNameValid &&
            <div className='flex justify-center'>
              <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                Invalid Last Name:<br />
                Last Name must be at least 1 character long and can only contain letters.
              </div>
            </div>
          }

          <label htmlFor='password'>Password: <span className='text-red-500'>*</span></label>
          <div className='relative'>
            <input id='password' type={isPasswordVisible ? 'text' : 'password'} onChange={(event) => changePassword(event)}
              onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}
              required className="focus:outline-none border border-black rounded-md" />
            <button className='' onClick={() => setIsPasswordVisible(!isPasswordVisible)} type='button'>
              {isPasswordVisible ? <Visibility style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} />
                : <VisibilityOff style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} />}
            </button>
          </div>
          {isPasswordValid ? <span hidden={password ? false : true} ><Check style={{ fill: 'green' }} /></span>
            : <span hidden={password ? false : true} ><Error style={{ fill: 'red' }} /></span>}
          {passwordFocus && password && !isPasswordValid &&
            <div className='flex justify-center'>
              <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                Invalid Password:<br />
                Password must be at least 8 characters long and contain
                an uppercase letter, lowercase letter, a number, and a symbol (!@#$%^&*()).
              </div>
            </div>
          }
          <label htmlFor='confirmPassword'>Confirm Password: <span className='text-red-500'>*</span></label>
          <div className='relative'>
            <input id='confirmPassword' type={isConfirmPasswordVisible ? 'text' : 'password'} onChange={(event) => changeConfirmPassword(event)}
              onFocus={() => setConfirmPasswordFocus(true)} onBlur={() => setConfirmPasswordFocus(false)}
              required className=" focus:outline-none border border-black rounded-md" />
            <button className='' onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} type='button'>
              {isConfirmPasswordVisible ? <Visibility style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} />
                : <VisibilityOff style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} />}
            </button>
          </div>
          {isConfirmPasswordValid ? <span hidden={confirmPassword ? false : true} ><Check style={{ fill: 'green' }} /></span>
            : <span hidden={confirmPassword ? false : true} ><Error style={{ fill: 'red' }} /></span>}
          {confirmPasswordFocus && confirmPassword && !isConfirmPasswordValid &&
            <div className='flex justify-center'>
              <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                Invalid Password Confirmation:<br />
                Password and Confirm Password must match.
              </div>
            </div>
          }

          <label htmlFor='role'>Role:</label>
          <select id='role' value={role} onChange={(event) => setRole(event.target.value)} required className="focus:outline-none border border-black rounded-md">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="gamer">Gamer</option>
            <option value="spectator">Spectator</option>
          </select>

          {/* && <div className='flex justify-center mt-[3%] text-xl'><div className='bg-gray-400 w-[60%] rounded-xl'><Info /><br />
            The <span className='text-red-500'>*</span> denotes a required field.</div></div> */}
          <br />
          <button type='submit' disabled={!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid ? true : false}
            className={`mt-[2%] mb-[2%] w-[25%] p-[1.5%] bg-blue-500 text-white rounded-md
              ${!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid ? 'cursor-not-allowed bg-gray-400' : 'hover:bg-blue-700 cursor-pointer'}`}>Register</button>
          <br />
          <div hidden={errorMessage ? false : true}><span hidden={errorMessage ? false : true} ><Error style={{ fill: 'red' }} /></span>{errorMessage}</div>
          <div>Already have an account? <Link to="/Login" state={{ from: location }} className='text-blue-500'>Login</Link></div>
        </form>
        
      </div >
      <div className='w-[30vw] h-full'></div>
    </div>



  )

}