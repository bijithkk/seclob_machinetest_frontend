// LoginSignupUI.jsx
import React, { useContext, useState } from "react";
import styles from "./SignUp.module.css";
import { User, Mail, Lock } from "lucide-react";
import InputField from "../../components/SignUp/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductContext } from "../../context/ProductContext";

const SignUp = () => {
  const { backendUrl,navigate } = useContext(ProductContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    try {
      console.log(name,email,password)
      const response = await axios.post(backendUrl + "/user/auth/register", {
        name,email,password
      })
      console.log(response)
      if(response.status === 201){
        toast.success(response.data.message,{
            autoClose: 1500,
          });
        navigate("/signin");
      } else {
        toast.error(response.data.message,{
            autoClose: 1500,
          });
      }
    } catch (error) {
      console.log("error",error)
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <h1 className={styles.welcomeTitle}>Welcome Back!</h1>
          <p className={styles.welcomeText}>
            To keep connected with us please login with your personal info
          </p>
          <button
            onClick={() => navigate("/signin")}
            className={styles.signInButton}
          >
            SIGN IN
          </button>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.rightContent}>
          <h1 className={styles.createTitle}>Create Account</h1>

          <div className={styles.inputGroup}>
            <InputField
              type="text"
              placeholder="Name"
              Icon={User}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              type="email"
              placeholder="Email"
              Icon={Mail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Password"
              Icon={Lock}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.signUpButton} onClick={handleSubmit}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
