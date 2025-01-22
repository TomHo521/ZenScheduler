// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/Bookings/Themes/ThemeContext'; // Import ThemeProvider
import Layout from './components/Bookings/TopBar/Layout'; // Import the Layout component
import TempLandingPage from './components/Bookings/TempLandingPage'; // Import TempLandingPage
import Bookings from './components/Bookings/Bookings'; // Import Bookings component
import Settings from './components/Bookings/Themes/Settings'; // Import Settings component
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
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

            {/* Bookings Page */}
            <Route
              path="/bookings"
              element={
                <Layout title="Bookings">
                  <Bookings />
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
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<LandingPage />} />
//     //     {/* <Route path="/book" element={<Calendar/>} /> */}
//     //     <Route path="/book" element={<Bookings/>} /> 
//     //   </Routes>
//     // </Router>
//     <div>
//     <Bookings />
//     </div>
//   );
// }

// export default App;
