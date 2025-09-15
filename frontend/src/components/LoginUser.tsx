import { Visibility, VisibilityOff, Error } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

export const LoginUser = () => {
  // TODO: route to home page after successful login and turn the Register and login
  // buttons into a logout button and profile button
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit called");
    event.preventDefault();
    const reqBody = {
      username: username,
      password: password
    };
    // setErrorMessage('');
  }

  return (
  
    <div className='flex w-full h-full '>
      <div className='w-[30%] h-full'></div>
      <div className="text-center w-[40%] h-[60%] mt-[2%] pt-[5%] text-2xl rounded-xl shadow-lg border border-black">
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-start text-center mt-[3%] mb-[3%] w-full h-[85%]'>
          <span className='font-bold text-5xl mb-[3%]'>User Login</span><br />
          <label htmlFor='username'>Username: <span className='text-red-500'>*</span></label>
          <input type='text' onChange={(event) => changeUsername(event)} required className=" focus:outline-none border border-black rounded-md" />

          <label htmlFor='password'>Password: <span className='text-red-500'>*</span></label>
          <div className='relative'>
          <input type={isPasswordVisible ? 'text' : 'password'} onChange={(event) => changePassword(event)} required className=" focus:outline-none border border-black rounded-md" />
          <button className='' onClick={() => setIsPasswordVisible(!isPasswordVisible)} type='button'>
              {isPasswordVisible ? <Visibility style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} />
                : <VisibilityOff style={{ position: 'absolute', right: '3%', bottom: '15%', cursor: 'pointer' }} />}
            </button>
          </div>
          <button disabled={!username || !password ? true : false} type='submit'
            className={`mt-[2%] mb-[2%] w-[15%] p-[1.5%] bg-blue-500 text-white rounded-md ${!username || !password ? 'cursor-not-allowed bg-gray-400' : 'hover:bg-blue-700 cursor-pointer'}`}>
            Login
          </button>
          <br />
          <div hidden={errorMessage ? false : true}><span hidden={errorMessage ? false : true} ><Error style={{ fill: 'red' }} /></span>{errorMessage}</div>
        </form>
        <div>Don't have an account? <Link to="/Registration" className='text-blue-500'>Register</Link></div>
      </div>
      
      <div className='w-[30%] h-full'></div>
    </div>
  )
}