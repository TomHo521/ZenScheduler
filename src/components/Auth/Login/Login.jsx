import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import AuthPage from '../AuthPage';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user); // Log success
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Login failed:', error.message); // Log failure
      setError(error.message); // Display error message
    }
  };

  return (
    <AuthPage title="Login">
      <div className="auth-form-container">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div className="auth-links">
          <Link to="/signup">Don't have an account? Sign up</Link>
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </div>
    </AuthPage>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../../firebase';
// import { useNavigate, Link } from 'react-router-dom'; // Import Link
// import AuthPage from '../AuthPage';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <AuthPage title="Login">
//       <div className="auth-form-container">
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleLogin} className="auth-form">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="auth-input"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="auth-input"
//           />
//           <button type="submit" className="auth-button">
//             Login
//           </button>
//         </form>
//         <div className="auth-links">
//           <Link to="/signup">Don't have an account? Sign up</Link>
//           <Link to="/forgot-password">Forgot your password?</Link>
//         </div>
//       </div>
//     </AuthPage>
//   );
// };

// export default Login;

// src/components/Auth/Login/Login.jsx
// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../../firebase';
// import { useNavigate } from 'react-router-dom';
// import AuthPage from '../AuthPage';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <AuthPage title="Login">
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleLogin} className="auth-form">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="auth-input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="auth-input"
//         />
//         <button type="submit" className="auth-button">
//           Login
//         </button>
//       </form>
//     </AuthPage>
//   );
// };

// export default Login;