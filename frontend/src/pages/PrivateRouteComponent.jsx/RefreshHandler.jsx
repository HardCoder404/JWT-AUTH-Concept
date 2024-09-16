import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

export default function RefreshHandler({setisAuthenticated}) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('User')){
        setisAuthenticated(true);
        if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){
            navigate('/home', {replace: false});
        }
      }
    },[location,navigate,setisAuthenticated])

  return (
    null
  )
}
