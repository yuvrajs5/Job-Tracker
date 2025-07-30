import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';

function Landing() {
  const { user } = useAppContext();
  return (
    <>
      {user && <Navigate to='/' />}
      
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">

          <div className="info">
             <h1>Job <span>Tracking</span> App</h1>
            <h4>Stay Organized. Stay Motivated. Land That Job.</h4>
            <p>
              Searching for a job can feel overwhelming — dozens of applications, countless follow-ups, and the stress of staying on top of it all. That’s why this app exists — to simplify your journey and bring structure to the chaos.

              Track every application, follow your progress, and stay focused. Whether you're just starting out or deep in the job search grind, this tool helps you stay organized and confident.

              You're not falling behind — you're finding your path. Keep going. Keep applying. And let this app support you every step of the way. <strong>“The future depends on what you do today.” – Mahatma Gandhi</strong>
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>

          <img src={main} alt="job hunt" className='img main-img'></img>

        </div>
      </Wrapper>
    </>
  );
}

export default Landing 