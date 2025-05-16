import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css'
import { Mail, Lock } from 'lucide-react';
import InputField from '../../components/SignUp/InputField';

const SignIn = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.rightPanel}>
        <div className={styles.rightContent}>
          <h1 className={styles.createTitle}>Sign In to Your Account</h1>
          
          <div className={styles.inputGroup}>
            <InputField type="email" placeholder="Email" Icon={Mail}/>
            <InputField type="password" placeholder="Password" Icon={Lock}/>
          </div>
          
          <button className={styles.signUpButton}>
            SIGN IN
          </button>
        </div>
      </div>

      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <h1 className={styles.welcomeTitle}>Hello Friend!</h1>
          <p className={styles.welcomeText}>
            Enter your personal details and start your journey with us
          </p>
          <button onClick={() => navigate('/')} className={styles.signInButton}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;