import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Footprints,
    Droplets,
    Flame,
    Moon,
    Plus,
    TrendingUp,
    Target,
    Award,
    Sparkles,
    Heart,
    Zap,
    Calendar,
    Minus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { useHealthStats } from '../hooks/useHealthData';
import { motivationalQuotes, healthTips } from '../data/healthData';
import { getGreeting, getRandomItem, formatDate, calculateBMI } from '../utils/helpers';
import './Dashboard.css';

export default function Dashboard({ user }) {
    const { stats, updateStat, history } = useHealthStats();
    const [quote] = useState(() => getRandomItem(motivationalQuotes));
    const [tip] = useState(() => getRandomItem(healthTips));

    const weekData = [
        { day: 'Mon', steps: 8200, water: 7 },
        { day: 'Tue', steps: 6500, water: 6 },
        { day: 'Wed', steps: 9100, water: 8 },
        { day: 'Thu', steps: 7800, water: 7 },
        { day: 'Fri', steps: 10200, water: 9 },
        { day: 'Sat', steps: 5400, water: 5 },
        { day: 'Sun', steps: stats.steps, water: stats.water },
    ];

    const bmi = user?.height && user?.weight
        ? calculateBMI(user.weight, user.height)
        : null;

    const quickActions = [
        { label: 'Add Steps', icon: Footprints, color: '#4caf50', stat: 'steps', amount: 1000 },
        { label: 'Add Water', icon: Droplets, color: '#2196f3', stat: 'water', amount: 1 },
        { label: 'Log Calories', icon: Flame, color: '#ff6d00', stat: 'calories', amount: 100 },
        { label: 'Log Sleep', icon: Moon, color: '#9c27b0', stat: 'sleep', amount: 0.5 },
    ];

    const activities = [
        { icon: '🏃', title: 'Morning Walk', desc: '2.5km completed', time: '7:30 AM' },
        { icon: '💧', title: 'Hydration Goal', desc: '6 glasses done', time: '12:00 PM' },
        { icon: '🥗', title: 'Healthy Lunch', desc: '450 calories', time: '1:30 PM' },
        { icon: '🧘', title: 'Evening Yoga', desc: '20 min session', time: '6:00 PM' },
    ];

    return (
        <motion.div
            className="dashboard-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Hero Section */}
            <div className="dashboard-hero">
                <div className="hero-content">
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Sparkles size={14} />
                        <span>{formatDate(new Date())}</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {getGreeting()}, <span className="gradient-name">{user?.name?.split(' ')[0] || 'Friend'}</span>! 👋
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        "{quote.text}"
                    </motion.p>
                </div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="hero-circle">
                        <div className="circle-content">
                            <Heart className="heart-icon" size={32} />
                            <span className="circle-value">85%</span>
                            <span className="circle-label">Health Score</span>
                        </div>
                        <svg className="circle-progress" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="white"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray="240 283"
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <StatCard
                    title="Steps"
                    value={stats.steps.toLocaleString()}
                    unit="steps"
                    icon={Footprints}
                    color="green"
                    target={10000}
                    current={stats.steps}
                />
                <StatCard
                    title="Water"
                    value={stats.water}
                    unit="glasses"
                    icon={Droplets}
                    color="blue"
                    target={8}
                    current={stats.water}
                />
                <StatCard
                    title="Calories"
                    value={stats.calories}
                    unit="kcal"
                    icon={Flame}
                    color="orange"
                    target={500}
                    current={stats.calories}
                />
                <StatCard
                    title="Sleep"
                    value={stats.sleep}
                    unit="hours"
                    icon={Moon}
                    color="purple"
                    target={8}
                    current={stats.sleep}
                />
            </div>

            {/* Quick Actions */}
            <section className="quick-actions-section">
                <h2 className="section-title">
                    <Zap size={24} className="title-icon" />
                    Quick Log
                </h2>
                <div className="quick-actions-grid">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={action.label}
                            className="quick-action"
                            style={{ '--action-color': action.color, '--action-bg': `${action.color}15` }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="quick-action-icon">
                                <action.icon size={24} />
                            </div>
                            <span className="quick-action-label">{action.label}</span>

                            <div className="action-controls">
                                <button
                                    className="control-btn minus"
                                    onClick={() => updateStat(action.stat, Math.max(0, stats[action.stat] - action.amount))}
                                    title="Decrease"
                                >
                                    <Minus size={18} />
                                </button>
                                <button
                                    className="control-btn plus"
                                    onClick={() => updateStat(action.stat, stats[action.stat] + action.amount)}
                                    title="Increase"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Chart Card */}
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="card-header">
                        <h3>
                            <TrendingUp size={20} />
                            Weekly Progress
                        </h3>
                        <span className="card-badge">+12%</span>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weekData}>
                                <defs>
                                    <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4caf50" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    stroke="var(--text-muted)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--neutral-200)',
                                        borderRadius: '12px',
                                        boxShadow: 'var(--shadow-lg)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="steps"
                                    stroke="#4caf50"
                                    strokeWidth={3}
                                    fill="url(#stepsGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Summary Card */}
                <motion.div
                    className="summary-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3>
                        <Target size={20} />
                        Health Summary
                    </h3>
                    <div className="summary-items">
                        {bmi && (
                            <div className="summary-item">
                                <div className="summary-icon bmi" style={{ background: `${bmi.color}20`, color: bmi.color }}>
                                    <Target size={20} />
                                </div>
                                <div className="summary-content">
                                    <span className="summary-label">BMI</span>
                                    <span className="summary-value">{bmi.value}</span>
                                </div>
                                <span className="summary-status" style={{ color: bmi.color }}>{bmi.category}</span>
                            </div>
                        )}
                        <div className="summary-item">
                            <div className="summary-icon goals">
                                <TrendingUp size={20} />
                            </div>
                            <div className="summary-content">
                                <span className="summary-label">Goals Met</span>
                                <span className="summary-value">3/4</span>
                            </div>
                            <span className="summary-status success">75%</span>
                        </div>
                        <div className="summary-item">
                            <div className="summary-icon streak">
                                <Award size={20} />
                            </div>
                            <div className="summary-content">
                                <span className="summary-label">Current Streak</span>
                                <span className="summary-value">7 days</span>
                            </div>
                            <span className="summary-status fire">🔥</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Health Tip */}
            <motion.div
                className="tip-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="tip-icon">💡</div>
                <div className="tip-content">
                    <h4>Daily Health Tip</h4>
                    <p>{tip}</p>
                </div>
            </motion.div>

            {/* Activities */}
            <section className="activities-section">
                <h3>
                    <Calendar size={20} />
                    Today's Activities
                </h3>
                <div className="activities-list">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            className="activity-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ x: 8 }}
                        >
                            <div className="activity-icon">{activity.icon}</div>
                            <div className="activity-content">
                                <span className="activity-title">{activity.title}</span>
                                <span className="activity-desc">{activity.desc}</span>
                            </div>
                            <span className="activity-time">{activity.time}</span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}
