import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import AuthPage from '../AuthPage';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthPage title="Signup">
      <div className="auth-form-container">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup} className="auth-form">
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
            Signup
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </AuthPage>
  );
};

export default Signup;

// src/components/Auth/Signup/Signup.jsx
// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../../firebase';
// import { useNavigate } from 'react-router-dom';
// import AuthPage from '../AuthPage';
// import './Signup.css';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate('/');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <AuthPage title="Signup">
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSignup} className="auth-form">
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
//           Signup
//         </button>
//       </form>
//     </AuthPage>
//   );
// };

// export default Signup;