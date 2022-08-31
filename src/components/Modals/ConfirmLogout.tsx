import React from 'react'
import { useNavigate } from 'react-router-dom';
import { resetAll } from '../../helper/authHelper';
import { IAuth } from '../../interfaces/IAuth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { getProfileImageFromAPI } from '../../services/profilePictureService';
import { getCurrentTheme } from '../../services/themeService';


interface Props {
  closeHandler : any;
}


function ConfirmLogout({closeHandler} : Props) {

  const curUser : IAuth = useAppSelector((state) => state.auth.user) as IAuth;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // logoutFunction : Handles user logout
  const logoutFunction = async () => {
    await dispatch(logout());
    closeHandler();
    resetAll(dispatch);
    navigate('/login');
  }


  return (
    <div className='flex flex-col items-center p-3 w-[40vw] min-h-[150px] h-[40vh]'>
      <div className='flex flex-col grow'>
        <p className='text-text-main text-2xl'>Confirm Logout?</p>
        <div className='flex flex-col space-y-3 grow items-center justify-center'>
          <img 
                      className='object-cover w-16 h-16 border-2 border-text-main rounded-md'
                      src={getProfileImageFromAPI(curUser?.profileImage)} 
                      alt="" />
          <p className='text-text-main text-lg'>{curUser?.username}</p>
        </div>
      </div>
      <div className='flex flex-row w-full justify-end space-x-3'>
          <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
           <button 
                    onClick={logoutFunction}
                    style = {{background : getCurrentTheme().accent}}
                    className='text-text-main w-24 h-10 font-bold border-2 border-none rounded-md'>Confirm</button>
      </div>
    </div>
  )
}

export default ConfirmLogout