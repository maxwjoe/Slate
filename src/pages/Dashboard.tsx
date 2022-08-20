import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import ArticleView from '../components/ArticleView';
import Header from '../components/Header';
import LeftTree from '../components/LeftTree';
import ListView from '../components/ListView';

function Dashboard() {

  const navigate = useNavigate();
  const {user} = useAppSelector((state) => state.auth);

  // useEffect to lock the dashboard to authorized users
  useEffect(() => {
    if(!user)
    {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className='flex flex-col w-full h-full bg-slate-dark'>
      <Header/>
      <div className='flex flex-row grow bg-slate-dark'>
        <LeftTree/>
        <ListView/>
      </div>
    </div>
  )
}

export default Dashboard