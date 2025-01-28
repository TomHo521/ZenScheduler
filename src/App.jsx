import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/Bookings/Themes/ThemeContext';
import { AuthProvider } from './components/Auth/AuthContext';
import Layout from './components/Bookings/TopBar/Layout';
import TempLandingPage from './components/Bookings/TempLandingPage';
import Bookings from './components/Bookings/Bookings';
import Settings from './components/Bookings/Themes/Settings';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import Profile from './components/Profile/Profile';
import './App.css';
import OwnerDashboard from './components/Bookings/OwnerDashboard/OwnerDashboard';
import LandingPage from './components/LandingPage';
// there is conflicting css in the bootstrap.. better without.
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div>
            <Routes>
              {/* Landing Page */}
              <Route
                path="/"
                element={
                  <Layout title="Home">
                    <TempLandingPage />
                  </Layout>
                }
              />

              {/* Front Page */}
              <Route path="/frontpage" element={
                  <LandingPage />
              }/>

              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Profile Page */}
              <Route
                path="/profile"
                element={
                  <Layout title="Profile">
                    <Profile />
                  </Layout>
                }
              />

              {/* Bookings Page */}
              <Route
                path="/bookings"
                element={
                  <Layout title="Bookings">
                    <Bookings />
                  </Layout>
                }
              />
              
              {/* Dashboard Page */}
                <Route
                path="/dashboard"
                element={
                  <Layout title="Dashboard">
                    <OwnerDashboard/>
                  </Layout>
                }
              />

              {/* Settings Page */}
              <Route
                path="/settings"
                element={
                  <Layout title="Settings">
                    <Settings />
                  </Layout>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;


// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import Calendar from './components/Calendar';
// import NewCalendar from './components/NewCalendar';
// import Bookings from './components/Bookings/Bookings';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         {/* <Route path="/book" element={<Calendar/>} /> */}
//         <Route path="/book" element={<Bookings/>} /> 
//       </Routes>
//     </Router>
//   );
// }

// export default App;
