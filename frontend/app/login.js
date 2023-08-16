import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/loginform.module.css'
import Products from './products';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 
  // const router =useRouter();

// const handleRouteChange=()=>{



// }



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        
        setIsLoggedIn(true);
        // router.push('/home');

        console.log("login succesfil")
      
        // Redirect to the home page (replace '/home' with your desired route)
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
if(isLoggedIn){
  return <Products/>
}
 

  return (
    <div className={styles.container}>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
      <div className={styles['form-group']}>
          <label>Email : </label>
          <input type="email" className="form-group" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles['form-group']}>
          <label>Password : </label>
          <input type="password" className="form-group" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button  type="submit" className={styles.button} onClick={handleLogin}>Login</button>
        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
      </form>
    </div>
  );
}
