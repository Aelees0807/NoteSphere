import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    // ...existing code...
    setError('');
    // Email se username nikalte hain (jaise: 'example@email.com' -> 'example')
    const username = email.split('@')[0];
    const userData = { name: username };
    onLogin(userData);
    navigate('/notes');
  };

  // Handler for Google Login
  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Call backend to login and get JWT
      const res = await axios.post(`${API_URL}/auth/login`, { email: user.email, password: 'provided_by_google' });
      localStorage.setItem('token', res.data.token);
      const username = user.email.split('@')[0];
      onLogin({ name: username });
      navigate('/notes');
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
      console.error(err);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-6 bg-black/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <div className="inline-block p-3 bg-pink-500/20 rounded-xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Sign In</h2>
        </div>
        {error && <p className="text-neon-magenta text-center bg-black/30 p-2 rounded-md">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className="w-full px-4 py-3 text-white bg-white/10 border-2 border-transparent rounded-lg placeholder:text-gray-300 focus:outline-none focus:border-pink-500 transition"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full px-4 py-3 text-white bg-white/10 border-2 border-transparent rounded-lg placeholder:text-gray-300 focus:outline-none focus:border-pink-500 transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200"
          >
            Sign In
          </button>
        </form>
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 mt-2 font-bold text-charcoal-blue dark:text-white bg-white/80 dark:bg-black/20 border border-gray-400/50 dark:border-white/30 rounded-md hover:bg-white dark:hover:bg-black/30 transition-all duration-300 disabled:bg-gray-500"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.22-11.283-7.614l-6.522 5.025A20.02 20.02 0 0 0 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.683 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
          Login with Google
        </button>
        <p className="text-sm text-center text-gray-300">
          Don't have an account?{' '}
          <RouterLink to="/register" className="font-medium text-pink-400 hover:underline">
            Sign Up
          </RouterLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;