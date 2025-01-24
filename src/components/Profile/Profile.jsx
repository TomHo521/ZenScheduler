
import React, { useState, useContext } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Bookings/Themes/ThemeContext';
import { themes } from '../Bookings/Themes/themes';
import './Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => {
    setTheme(theme === themes.default ? themes.dark : themes.default);
  };

  const profileCompletion = currentUser?.emailVerified ? 75 : 50;

  return (
    <div className="profile-drawer">
      <div className="profile-header">
        <h2>Profile</h2>
        <button className="close-button" onClick={() => navigate(-1)}>
          &times;
        </button>
      </div>
      <div className="profile-content">
        {currentUser ? (
          <>
            <div className="user-card">
              <div className="profile-picture-container">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="profile-picture"
                  />
                ) : (
                  <div className="profile-picture-placeholder">
                    {currentUser.email[0].toUpperCase()}
                  </div>
                )}
                <input
                  type="file"
                  id="profile-picture-upload"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profile-picture-upload" className="upload-label">
                  Upload Photo
                </label>
              </div>
              <div className="user-info">
                <h3>
                  {currentUser.email}
                  {currentUser.emailVerified && (
                    <span className="verified-badge">Verified</span>
                  )}
                </h3>
                <p>Member since: {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</p>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${profileCompletion}%` }}></div>
              </div>
              <p className="progress-text">{profileCompletion}% profile complete</p>
            </div>

            <div className="recent-activity">
              <h4>Recent Activity</h4>
              <ul>
                <li>Last login: {new Date(currentUser.metadata.lastSignInTime).toLocaleString()}</li>
                <li>Bookings made: 5</li>
              </ul>
            </div>

            <div className="profile-actions">
              <button className="profile-button" onClick={() => navigate('/change-email')}>
                Change Email
              </button>
              <button className="profile-button" onClick={() => navigate('/change-password')}>
                Change Password
              </button>
              <button className="profile-button" onClick={toggleDarkMode}>
                {theme === 'default' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <button className="profile-button logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

// import React, { useState, useContext } from 'react';
// import { useAuth } from '../Auth/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { ThemeContext } from '../Bookings/Themes/ThemeContext'; // Import ThemeContext
// import { themes } from '../Bookings/Themes/themes'; // Adjust the path as needed
// import './Profile.css';

// const Profile = () => {
//   const { currentUser, logout } = useAuth();
//   const { theme, setTheme } = useContext(ThemeContext); // Get theme context
//   const navigate = useNavigate();
//   const [profilePicture, setProfilePicture] = useState(null);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const toggleDarkMode = () => {
//     setTheme(theme === themes.default ? themes.dark : themes.default);
//   };

//   // Calculate profile completion (example: 50% complete)
//   const profileCompletion = currentUser?.emailVerified ? 75 : 50;

//   return (
//     <div className="profile-drawer">
//       <div className="profile-header">
//         <h2>Profile</h2>
//         <button className="close-button" onClick={() => navigate(-1)}>
//           &times;
//         </button>
//       </div>
//       <div className="profile-content">
//         {currentUser ? (
//           <>
//             {/* User Card */}
//             <div className="user-card">
//               <div className="profile-picture-container">
//                 {profilePicture ? (
//                   <img
//                     src={profilePicture}
//                     alt="Profile"
//                     className="profile-picture"
//                   />
//                 ) : (
//                   <div className="profile-picture-placeholder">
//                     {currentUser.email[0].toUpperCase()}
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   id="profile-picture-upload"
//                   accept="image/*"
//                   onChange={handleProfilePictureChange}
//                   style={{ display: 'none' }}
//                 />
//                 <label htmlFor="profile-picture-upload" className="upload-label">
//                   Upload Photo
//                 </label>
//               </div>
//               <div className="user-info">
//                 <h3>
//                   {currentUser.email}
//                   {currentUser.emailVerified && (
//                     <span className="verified-badge">Verified</span>
//                   )}
//                 </h3>
//                 <p>Member since: {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</p>
//               </div>
//               {/* Progress Bar */}
//               <div className="progress-bar-container">
//                 <div className="progress-bar" style={{ width: `${profileCompletion}%` }}></div>
//               </div>
//               <p className="progress-text">{profileCompletion}% profile complete</p>
//             </div>

//             {/* Recent Activity */}
//             <div className="recent-activity">
//               <h4>Recent Activity</h4>
//               <ul>
//                 <li>Last login: {new Date(currentUser.metadata.lastSignInTime).toLocaleString()}</li>
//                 <li>Bookings made: 5</li> {/* Example data */}
//               </ul>
//             </div>

//             {/* Profile Actions */}
//             <div className="profile-actions">
//               <button className="profile-button" onClick={() => navigate('/change-email')}>
//                 Change Email
//               </button>
//               <button className="profile-button" onClick={() => navigate('/change-password')}>
//                 Change Password
//               </button>
//               <button className="profile-button" onClick={toggleDarkMode}>
//                 {theme === 'default' ? 'Dark Mode' : 'Light Mode'}
//               </button>
//               <button className="profile-button logout-button" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </>
//         ) : (
//           <p>Please log in to view your profile.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;