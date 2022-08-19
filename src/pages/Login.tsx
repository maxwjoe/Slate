import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {loginViewModel} from '../viewModels/authViewModels'
function Login() {

  const [formData, setFormData] = useState<loginViewModel>({
    email : '',
    password : ''
  })

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : loginViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // onSubmit : Handles login form submission
  const onSubmit = (e : any) => {
    e.preventDefault();

    const userData = {
      email : formData.email,
      password : formData.password,
    }

    //dispatch(login(userData))

  }

  const navigate = useNavigate();


  return (
    <div className='flex items-center justify-center w-full h-full bg-slate-dark'>
      <div className='flex flex-col items-center justify-center w-1/3 p-3 bg-slate-lightdark rounded-md'>
        <p className='text-3xl font-bold text-text-main'>Login to Slate</p>
        <form className='flex flex-col w-full h-full space-y-5 p-6'>
          <input 
                value={formData.email}
                className = "w-full h-12 outline-none border-none text-text-tertiary bg-slate-dark rounded-md p-3" 
                type="email"
                name="email"
                placeholder='Email' 
                onChange={onChange}

          />
          <input 
                value={formData.password}
                className = "w-full h-12 outline-none border-none text-text-tertiary bg-slate-dark rounded-md p-3" 
                type="text"
                name="password"
                placeholder='Password' 
                onChange={onChange}
          />
          <button type="submit" className='w-full h-12 rounded-md bg-text-main text-slate-dark text-xl font-medium hover:bg-text-secondary hover:text-text-main'>
            Login
          </button>
        </form>
        <p className='text-text-main'>
          No Account? <span 
            onClick = {() => navigate('/register')}
            className='underline cursor-pointer'
            >
              Click Here
          </span>
          </p>
      </div>
    </div> 
  )
}

export default Login