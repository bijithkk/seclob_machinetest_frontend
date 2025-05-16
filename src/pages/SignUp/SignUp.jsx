// LoginSignupUI.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css'
import { User, Mail, Lock } from 'lucide-react';
import InputField from '../../components/SignUp/InputField';

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <h1 className={styles.welcomeTitle}>Welcome Back!</h1>
          <p className={styles.welcomeText}>
            To keep connected with us please login with your personal info
          </p>
          <button onClick={() => navigate('/signin')} className={styles.signInButton}>
            SIGN IN
          </button>
        </div>
      </div>
      
      <div className={styles.rightPanel}>
        <div className={styles.rightContent}>
          <h1 className={styles.createTitle}>Create Account</h1>
          
          <div className={styles.inputGroup}>
            <InputField type="text" placeholder="Name" Icon={User}/>
            <InputField type="email" placeholder="Email" Icon={Mail}/>
            <InputField type="password" placeholder="Password" Icon={Lock}/>
          </div>
          
          <button className={styles.signUpButton}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;