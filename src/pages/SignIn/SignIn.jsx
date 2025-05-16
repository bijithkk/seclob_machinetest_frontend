import React, { useContext, useState } from 'react';
import styles from './SignIn.module.css'
import { Mail, Lock } from 'lucide-react';
import InputField from '../../components/SignUp/InputField';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
    const { backendUrl,navigate,setToken } = useContext(ProductContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async () => {
    try {
      console.log(email,password)
      const response = await axios.post(backendUrl + "/user/auth/login", {
        email,password
      });
      if(response.status === 200){
        setToken(response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);
        toast.success(response.data.message,{autoClose: 1500});
        navigate("/home");
      }
    } catch (error) {
      console.log("error",error)
      
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightPanel}>
        <div className={styles.rightContent}>
          <h1 className={styles.createTitle}>Sign In to Your Account</h1>
          
          <div className={styles.inputGroup}>
            <InputField type="email" placeholder="Email" Icon={Mail} onChange={(e) => setEmail(e.target.value)}/>
            <InputField type="password" placeholder="Password" Icon={Lock} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          
          <button onClick={handleSubmit} className={styles.signUpButton}>
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