import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';
import { Link } from 'react-router-dom'; // Import Link
import AuthPage from '../AuthPage';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthPage title="Forgot Password">
      <div className="auth-form-container">
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleResetPassword} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Reset Password
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </AuthPage>
  );
};

export default ForgotPassword;

// src/components/Auth/ForgotPassword/ForgotPassword.jsx
// import React, { useState } from 'react';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../../../firebase';
// import AuthPage from '../AuthPage';
// import './ForgotPassword.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMessage('Check your inbox for further instructions');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <AuthPage title="Forgot Password">
//       {message && <p className="success-message">{message}</p>}
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleResetPassword} className="auth-form">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="auth-input"
//         />
//         <button type="submit" className="auth-button">
//           Reset Password
//         </button>
//       </form>
//     </AuthPage>
//   );
// };

// export default ForgotPassword;