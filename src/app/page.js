'use client'
import { useRouter } from 'next/navigation';
import useAuth  from './_components/useauth';
import LandingPage from './_landing-page/landing_page';

function getUserTypeFromToken(){
  
  const myCookie = getCookie('token');
  if(!myCookie) return false 

  const parts = myCookie.split('.');
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  if(payload && payload.userType !== undefined){
    return  payload.userType
  }else{
    return false
  }
}
function getCookie(name) {

  if(typeof document === 'undefined'){
      return false;
  }

  if(!document){
      return false;
  }
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
          return decodeURIComponent(cookieValue);
      }
  }
  return null;
}


export default function Home() {
  const user  = useAuth();
  const router = useRouter();
  const userType  =getUserTypeFromToken()
  console.log(userType)
  if(user){
    if(userType == 'coach'){
      router.push('/coach-dashboard');
    }else if(userType == 'club'){
      router.push('/club-dashboard');
    } else{
      console.log(userType)
      router.push('/dashboard');
    }
  }else{
    console.log("no user")
  }
  return (
    <LandingPage />
  );
}

