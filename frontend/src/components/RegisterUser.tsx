import { useRef, useState, useEffect, lazy, type ChangeEvent } from 'react';
import {Error, Check, Info, Visibility, VisibilityOff} from '@mui/icons-material'
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
  // TODO: add signin link + route
  // TODO: validate email by sending an email to it
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


  const [errorMessage, setErrorMesssage] = useState('');
  //const [success, setSuccess] = useState(false);

  useEffect(() => {
    const match = usernameRegexp.test(username);
    //check if username is unique in database
    setIsUsernameValid(match);
    setErrorMesssage('');
    //console.log(match);
  }, [username]);

  useEffect(() => {
    const match = emailRegexp.test(email);
    setIsEmailValid(match);
    setErrorMesssage('');
  }, [email]);

  useEffect(() => {
    const match = passwordRegexp.test(password);
    setIsPasswordValid(match);
    setIsConfirmPasswordValid(password === confirmPassword);
    setErrorMesssage('');
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
 
    const reqBody = { username, email, password, role: 'user' };
    //console.log(reqBody);
    const response = await axios.post('http://localhost:5000/registration', reqBody).catch((error) => {
      console.log(error);
      if (!error?.response) {
        setErrorMesssage("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMesssage(error.response.data['Client Error']);
      } else {
        setErrorMesssage("Registration Failed");
      }
    });
    console.log(response);
  };

  return (
    <>
      <div className='flex w-full h-full '>
      <div className='w-[30%] h-full'></div>
      <div className="text-center w-[40%] h-[90%] mt-[2%] pt-[5%] text-2xl rounded-xl shadow-lg border border-black">
          <form onSubmit={handleSubmit} action='#' className='flex flex-col items-center justify-start text-center mt-[3%] mb-[3%] w-full h-[85%]'>
            <span className='font-bold text-5xl mb-[3%]'>User Registration</span><br />
            <span className='text-xl'>Sign up for a free user account or login.</span><br />
          <label htmlFor='username'>Username: <span className='text-red-500'>*</span></label>
          <input type='text' onChange={(event) => changeUsername(event)} onFocus={() => setUsernameFocus(true)} onBlur={() => setUsernameFocus(false)}
            required className=" focus:outline-none border border-black rounded-md" />
          {isUsernameValid ? <span hidden={username ? false : true} ><Check style={{ fill: 'green' }} /></span> : <span hidden={username ? false : true} ><Error style={{ fill: 'red' }} /></span>}
            
          {usernameFocus && username && !isUsernameValid && 
            <div className='flex justify-center'>
              <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                Invalid Username:<br/>
                Username must be 3 to 20 characters long, start with a letter, and contain only letters, numbers, and underscores.
              </div>
            </div>
          }
            
            <label htmlFor='email'>Email: <span className='text-red-500'>*</span></label>
            <input type='text' onChange={(event) => changeEmail(event)} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
              required className=" focus:outline-none border border-black rounded-md" />
            {isEmailValid ? <span hidden={email ? false : true} ><Check style={{ fill: 'green' }} /></span> : <span hidden={email ? false : true} ><Error style={{ fill: 'red' }} /></span>}
            {emailFocus && email && !isEmailValid &&
              <div className='flex justify-center'>
                <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                  Invalid Email:<br />
                  Email must be a valid email address.
                </div>
              </div>
            }

            <label htmlFor='password'>Password: <span className='text-red-500'>*</span></label>
            <div className='relative'>
          <input type={isPasswordVisible ? 'text' : 'password'} onChange={(event) => changePassword(event)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}
                required className="focus:outline-none border border-black rounded-md" />
              <button className='' onClick={() => setIsPasswordVisible(!isPasswordVisible)} type='button'>
                {isPasswordVisible ? <Visibility style={{ position: 'absolute', right: '3%', bottom:'15%', cursor: 'pointer' }} /> : <VisibilityOff style={{ position: 'absolute', right: '3%', bottom:'15%', cursor: 'pointer' }} />}
              </button>
            </div>
          {isPasswordValid ? <span hidden={password ? false : true} ><Check style={{ fill: 'green' }} /></span> : <span hidden={password ? false : true} ><Error style={{ fill: 'red' }} /></span>}
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
            <input type={isConfirmPasswordVisible ? 'text' : 'password'} onChange={(event) => changeConfirmPassword(event)} onFocus={() => setConfirmPasswordFocus(true)} onBlur={() => setConfirmPasswordFocus(false)}
              required className=" focus:outline-none border border-black rounded-md" />
            <button className='' onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} type='button'>
                {isConfirmPasswordVisible ? <Visibility style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} /> : <VisibilityOff style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} />}
              </button>
              </div>
            {isConfirmPasswordValid ? <span hidden={confirmPassword ? false : true} ><Check style={{ fill: 'green' }} /></span> : <span hidden={confirmPassword ? false : true} ><Error style={{ fill: 'red' }} /></span>}
            {confirmPasswordFocus && confirmPassword && !isConfirmPasswordValid &&
              <div className='flex justify-center'>
                <div className='text-center text-xl bg-red-300 w-[20vw] rounded-md p-[2%] mt-[1%]'>
                  Invalid Password Confirmation:<br />
                  Password and Confirm Password must match.
                </div>
              </div>
            }
            
            {false && <div className='flex justify-center mt-[3%] text-xl'><div className='bg-gray-400 w-[60%] rounded-xl'><Info /><br />The <span className='text-red-500'>*</span> denotes a required field.</div></div>}
            <br />
            <button type='submit' disabled={!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid ? true : false}
              className={`w-[30%] h-[6%] rounded-lg hover:bg-gray-100 
              ${!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid ? 'bg-gray-100 text-gray-400 border border-black' : 'bg-green-300 font-bold text-black border border-black'}`}>Register</button>
            <br/>
            <div hidden={errorMessage ? false : true}><span hidden={errorMessage ? false : true} ><Error style={{ fill: 'red' }} /></span>{errorMessage}</div>
        </form>

      </div >
        <div className='w-[30%] h-full'></div>
      </div>
      </>
        
        
    )

}