import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Heart,
    Sparkles,
    Activity,
    Apple,
    Moon,
    TrendingUp
} from 'lucide-react';
import './Login.css';

export default function Login({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        age: '',
        height: '',
        weight: '',
        gender: 'male',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (!formData.password || formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters';
        }
        if (isSignup && !formData.name) {
            newErrors.name = 'Name is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onLogin({
                email: formData.email,
                name: formData.name || formData.email.split('@')[0],
                age: parseInt(formData.age) || 30,
                height: parseInt(formData.height) || 170,
                weight: parseInt(formData.weight) || 70,
                gender: formData.gender,
            });
        }
    };

    const features = [
        { icon: Activity, label: 'Track Health Metrics', color: '#4caf50' },
        { icon: Apple, label: 'Nutrition Insights', color: '#ff6d00' },
        { icon: Moon, label: 'Sleep Analysis', color: '#9c27b0' },
        { icon: TrendingUp, label: 'Progress Analytics', color: '#2196f3' },
    ];

    return (
        <div className="login-page">
            {/* Animated Background */}
            <div className="bg-animation">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            {/* Left Side - Branding */}
            <motion.div
                className="login-branding"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="branding-content">
                    <motion.div
                        className="branding-logo"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        <Heart size={48} />
                    </motion.div>

                    <motion.h1
                        className="branding-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        HealthHub
                    </motion.h1>

                    <motion.p
                        className="branding-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Your personal companion for a healthier, happier life
                    </motion.p>

                    <motion.div
                        className="branding-features"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.label}
                                className="branding-feature"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <div className="branding-feature-icon" style={{ background: `${feature.color}30` }}>
                                    <feature.icon size={20} style={{ color: feature.color }} />
                                </div>
                                <span>{feature.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="branding-decoration">
                    <div className="deco-circle deco-1"></div>
                    <div className="deco-circle deco-2"></div>
                    <div className="deco-circle deco-3"></div>
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
                className="login-form-section"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="login-form-container">
                    <div className="form-header">
                        <motion.div
                            className="mobile-logo"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            <Heart size={32} />
                        </motion.div>
                        <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                        <p>{isSignup ? 'Start your health journey today' : 'Sign in to continue your journey'}</p>
                    </div>

                    {/* Form Tabs */}
                    <div className="form-tabs">
                        <button
                            className={`form-tab ${!isSignup ? 'active' : ''}`}
                            onClick={() => setIsSignup(false)}
                        >
                            Sign In
                        </button>
                        <button
                            className={`form-tab ${isSignup ? 'active' : ''}`}
                            onClick={() => setIsSignup(true)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <motion.div
                                className="form-group"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <label>
                                    <User size={16} />
                                    Full Name
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={errors.name ? 'error' : ''}
                                    />
                                </div>
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </motion.div>
                        )}

                        <div className="form-group">
                            <label>
                                <Mail size={16} />
                                Email Address
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={errors.email ? 'error' : ''}
                                />
                            </div>
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <Lock size={16} />
                                Password
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={errors.password ? 'error' : ''}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        {isSignup && (
                            <motion.div
                                className="profile-setup"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <h4>
                                    <Sparkles size={16} />
                                    Health Profile (Optional)
                                </h4>
                                <div className="profile-row">
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="30"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-row">
                                    <div className="form-group">
                                        <label>Height (cm)</label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            placeholder="170"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Weight (kg)</label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            placeholder="70"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            className="submit-btn"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Sparkles size={18} />
                            {isSignup ? 'Create Account' : 'Sign In'}
                        </motion.button>
                    </form>

                    <div className="demo-note">
                        <Sparkles size={14} />
                        <span>Demo Mode: Enter any email and password to explore</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
