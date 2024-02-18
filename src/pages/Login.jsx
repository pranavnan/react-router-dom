import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../components/PageNav';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  function handleLogin(e) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  }

  useEffect(() => {
    isAuthenticated && navigate('/app', { replace: true }); // replace true means we came from login page we overwritten it with /app route so when we use back button of the browser it will goto the page where we come to login page.
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={e => handleLogin(e)}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
