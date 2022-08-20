import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import ArticleView from '../components/ArticleView';
import Header from '../components/Header';
import LeftTree from '../components/LeftTree';
import ListView from '../components/ListView';
import toast from 'react-hot-toast';
import { RDX_getSources } from '../redux/slices/sourceSlice';

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useAppSelector((state) => state.auth);
  const {sources, isLoading, isError, message} = useAppSelector((state) => state.sources);

  // useEffect to handle auth access and source data pull on load
  useEffect(() => {
    
    if(!user)
    {
      navigate('/login')
      return;
    }
    
    if(isError)
    {
      console.log(sources);
      toast.error("There was an error fetching your data")
    }
    
    dispatch(RDX_getSources());

  }, [user, navigate, isError, message, dispatch])

  return (
    <div className='flex flex-col w-full h-full bg-slate-dark'>
      <Header/>
      <div className='flex flex-row grow bg-slate-dark'>
        <LeftTree/>
      </div>
    </div>
  )
}

export default Dashboard