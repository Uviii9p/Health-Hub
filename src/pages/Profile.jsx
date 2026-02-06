import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Calendar,
    Ruler,
    Scale,
    Target,
    Save,
    Edit3,
    Award,
    TrendingUp,
    Heart,
    Settings,
    Bell,
    Shield,
    HelpCircle
} from 'lucide-react';
import { calculateBMI, calculateDailyCalories, calculateWaterIntake } from '../utils/helpers';
import './Profile.css';

export default function Profile({ user, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        age: user?.age || '',
        height: user?.height || '',
        weight: user?.weight || '',
        gender: user?.gender || 'male',
        activityLevel: user?.activityLevel || 'moderate',
        goal: user?.goal || 'maintain',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate({
            ...user,
            ...formData,
            age: parseInt(formData.age) || user.age,
            height: parseInt(formData.height) || user.height,
            weight: parseInt(formData.weight) || user.weight,
        });
        setIsEditing(false);
    };

    const bmi = calculateBMI(formData.weight, formData.height);
    const dailyCalories = calculateDailyCalories({
        weight: formData.weight,
        height: formData.height,
        age: formData.age,
        gender: formData.gender,
        activityLevel: formData.activityLevel,
    });
    const waterIntake = calculateWaterIntake(formData.weight);

    const achievements = [
        { icon: '🔥', label: '7 Day Streak', earned: true },
        { icon: '🏃', label: '10K Steps', earned: true },
        { icon: '💧', label: 'Hydration Hero', earned: true },
        { icon: '🧘', label: 'Zen Master', earned: true },
        { icon: '💪', label: 'Workout Warrior', earned: true },
        { icon: '😴', label: 'Sleep Champion', earned: true },
    ];

    return (
        <div className="profile-page">
            <div className="page-header">
                <div>
                    <h1>Profile</h1>
                    <p>Manage your personal information and goals</p>
                </div>
                {!isEditing ? (
                    <motion.button
                        className="edit-btn"
                        onClick={() => setIsEditing(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Edit3 size={18} />
                        Edit Profile
                    </motion.button>
                ) : (
                    <div className="edit-actions">
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                        <motion.button
                            className="save-btn"
                            onClick={handleSave}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Save size={18} />
                            Save Changes
                        </motion.button>
                    </div>
                )}
            </div>

            <div className="profile-content">
                {/* Profile Card */}
                <motion.div
                    className="profile-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="profile-avatar">
                        <span>{formData.name?.charAt(0).toUpperCase() || 'U'}</span>
                    </div>

                    {isEditing ? (
                        <div className="profile-form">
                            <div className="form-group">
                                <label>
                                    <User size={16} />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <Mail size={16} />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <Calendar size={16} />
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Years"
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

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <Ruler size={16} />
                                        Height (cm)
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="cm"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <Scale size={16} />
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="kg"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Activity Level</label>
                                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                                    <option value="sedentary">Sedentary (little or no exercise)</option>
                                    <option value="light">Light (1-3 days/week)</option>
                                    <option value="moderate">Moderate (3-5 days/week)</option>
                                    <option value="active">Active (6-7 days/week)</option>
                                    <option value="veryActive">Very Active (intense daily)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    <Target size={16} />
                                    Health Goal
                                </label>
                                <select name="goal" value={formData.goal} onChange={handleChange}>
                                    <option value="lose">Lose Weight</option>
                                    <option value="maintain">Maintain Weight</option>
                                    <option value="gain">Gain Muscle</option>
                                    <option value="health">Improve Overall Health</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-info">
                            <h2>{formData.name}</h2>
                            <p className="profile-email">{formData.email}</p>

                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Age</span>
                                    <span className="info-value">{formData.age || '—'} years</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Gender</span>
                                    <span className="info-value">{formData.gender || '—'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Height</span>
                                    <span className="info-value">{formData.height || '—'} cm</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Weight</span>
                                    <span className="info-value">{formData.weight || '—'} kg</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Health Metrics */}
                <motion.div
                    className="metrics-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3>Your Health Metrics</h3>

                    <div className="metrics-grid">
                        {bmi && (
                            <div className="metric-item">
                                <div className="metric-icon" style={{ background: `${bmi.color}20`, color: bmi.color }}>
                                    <Scale size={20} />
                                </div>
                                <div className="metric-content">
                                    <span className="metric-label">BMI</span>
                                    <span className="metric-value">{bmi.value}</span>
                                    <span className="metric-status" style={{ color: bmi.color }}>{bmi.category}</span>
                                </div>
                            </div>
                        )}

                        <div className="metric-item">
                            <div className="metric-icon calories">
                                <TrendingUp size={20} />
                            </div>
                            <div className="metric-content">
                                <span className="metric-label">Daily Calorie Need</span>
                                <span className="metric-value">{dailyCalories}</span>
                                <span className="metric-status">kcal/day</span>
                            </div>
                        </div>

                        <div className="metric-item">
                            <div className="metric-icon water">
                                <Heart size={20} />
                            </div>
                            <div className="metric-content">
                                <span className="metric-label">Water Intake</span>
                                <span className="metric-value">{waterIntake}</span>
                                <span className="metric-status">glasses/day</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    className="achievements-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>
                        <Award size={20} />
                        Achievements
                    </h3>

                    <div className="achievements-grid">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className={`achievement-item ${achievement.earned ? 'earned' : 'locked'}`}
                            >
                                <span className="achievement-icon">{achievement.icon}</span>
                                <span className="achievement-label">{achievement.label}</span>
                                {!achievement.earned && <span className="lock-badge">🔒</span>}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Settings Links */}
                <motion.div
                    className="settings-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3>
                        <Settings size={20} />
                        Settings
                    </h3>

                    <div className="settings-list">
                        <button className="settings-item">
                            <Bell size={18} />
                            <span>Notifications</span>
                        </button>
                        <button className="settings-item">
                            <Shield size={18} />
                            <span>Privacy & Security</span>
                        </button>
                        <button className="settings-item">
                            <HelpCircle size={18} />
                            <span>Help & Support</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
