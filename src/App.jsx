import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Reminders from './pages/Reminders';
import Nutrition from './pages/Nutrition';
import Fitness from './pages/Fitness';
import MentalHealth from './pages/MentalHealth';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('health-theme');
    return saved || 'light';
  });
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('health-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('health-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('health-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('health-user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout 
        user={user} 
        theme={theme} 
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile user={user} onUpdate={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;
