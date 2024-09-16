import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { createUser } from '../../common/api.service';
import { REDIRECTION_ROUTES } from '../../common/constants';
import './Home.scss';
import banner from '../../assets/homepage/header-banner.png'
import homepageCard1 from '../../assets/homepage/homepage-card-1.png'
import homepageCard2 from '../../assets/homepage/homepage-card-2.png'
import homepageCard3 from '../../assets/homepage/homepage-card-3.png'
import homepageCard4 from '../../assets/homepage/homepage-card-4.png'
import homepageCard5 from '../../assets/homepage/homepage-card-5.png'
import homepageCard6 from '../../assets/homepage/homepage-card-6.png'
import homepageCard7 from '../../assets/homepage/homepage-card-7.png'


const Home = () => {
  const navigate = useNavigate();

  const handleSuccessLogin = async (credentialResponse: CredentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential || 'undefined');
    const { email, given_name } = decoded as { given_name: string, email: string, picture: string };
    const promise = await createUser({
      name: given_name,
      email,
      gender: 'F',
      age: '35',
    });
    const data = await promise.json();
    localStorage.setItem('user', JSON.stringify({ ...data }));
    navigate(REDIRECTION_ROUTES.FORMS);
  };

  const handleErrorLogin = () => {
    alert('Failed to login');
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/' + REDIRECTION_ROUTES.FORMS);
    }
  }, [navigate]);

  return (
    <main className='home-container' style={{ backgroundImage: `url(${banner}`, backgroundSize: 'content' }}>
      <h1>FormPilot: Streamline Your Workflow</h1>

      <b style={{ color: '#e1d8bc' }}>Explore by Zklogin</b>
      <GoogleLogin onSuccess={handleSuccessLogin} onError={handleErrorLogin}
        text="continue_with"
        shape="circle"
        theme="filled_black" />

      <div className="features-section">


        <Link target='_blank' to={REDIRECTION_ROUTES.MARKETPLACE}>
          <div className="feature">
            <img src={homepageCard1} alt="Affiliates Program" />
            <h3>Affiliates Program</h3>
            <p>Earn rewards by sharing and promoting forms, and grow your reach effortlessly.</p>
          </div>
        </Link>

        <div className="feature">
          <img src={homepageCard2} alt="Escrow Pools" />
          <h3>Escrow Pools</h3>
          <p>Secure and distribute giveaway tokens into escrow pools and manage claims through wallets.</p>
        </div>

        <div className="feature">
          <img src={homepageCard3} alt="Real-Time Rewards" />
          <h3>Real-Time Rewards</h3>
          <p>Send real-time rewards to users based on their interactions and submissions on your platform.</p>
        </div>

        <div className="feature">
          <img src={homepageCard4} alt="LLM Summarizer" />
          <h3>LLM Summarizer</h3>
          <p>Automatically generate concise summaries of user responses using AI-driven summarization.</p>
        </div>

        <div className="feature">
          <img src={homepageCard5} alt="Voting Mechanism" />
          <h3>Voting Mechanism</h3>
          <p>Create polls for users to vote on and gather their opinions on important topics.</p>
        </div>

        <div className="feature">
          <img src={homepageCard6} alt="Instant Airdrops" />
          <h3>Instant Airdrops</h3>
          <p>Distribute tokens as airdrops to users who submit forms, incentivizing participation.</p>
        </div>

        <Link target='_blank' to={REDIRECTION_ROUTES.MARKETPLACE}>
          <div className="feature">
            <img src={homepageCard7} alt="Marketplace" />
            <h3>Marketplace</h3>
            <p>Explore paid and unpaid forms in the marketplace to fill out and earn rewards.</p>
          </div>
        </Link>

        <div className="feature">
          <img src={homepageCard2} alt="Marketplace" />
          <h3>Coupon & giveaways</h3>
          <p>Create copoun or giveways form and enter code unlock rewards</p>
        </div>

        <div className="feature">
          <img src={homepageCard3} alt="Marketplace" />
          <h3>Multi chain</h3>
          <p>Supports ride range of blockchains from Evm to Non Evm chains</p>
        </div>
      </div>




      <footer className="footer">
        <p>© 2024 FormPilot. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
