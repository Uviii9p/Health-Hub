import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Calendar,
    TrendingUp,
    TrendingDown,
    Footprints,
    Droplets,
    Flame,
    Moon,
    Heart,
    Target,
    Award,
    Download
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useHealthStats, useMoodTracker, useWorkoutTracker } from '../hooks/useHealthData';
import { formatDate, getWeekDates, calculateStreak } from '../utils/helpers';
import './Analytics.css';

export default function Analytics() {
    const { history } = useHealthStats();
    const { moods } = useMoodTracker();
    const { workouts } = useWorkoutTracker();
    const [timeRange, setTimeRange] = useState('week');

    // Generate sample data if no history
    const weekDates = getWeekDates();
    const chartData = weekDates.map(date => {
        const dayData = history.find(h => h.date === date) || {};
        return {
            date: formatDate(date).split(',')[0],
            fullDate: date,
            steps: dayData.steps || Math.floor(Math.random() * 5000) + 5000,
            water: dayData.water || Math.floor(Math.random() * 5) + 4,
            calories: dayData.calories || Math.floor(Math.random() * 500) + 200,
            sleep: dayData.sleep || Math.floor(Math.random() * 3) + 6,
        };
    });

    // Calculate weekly stats
    const weeklyStats = {
        totalSteps: chartData.reduce((sum, d) => sum + d.steps, 0),
        avgSteps: Math.round(chartData.reduce((sum, d) => sum + d.steps, 0) / 7),
        totalWater: chartData.reduce((sum, d) => sum + d.water, 0),
        avgSleep: Math.round(chartData.reduce((sum, d) => sum + d.sleep, 0) / 7 * 10) / 10,
        totalCalories: chartData.reduce((sum, d) => sum + d.calories, 0),
        workouts: workouts.length,
    };

    // Goals data for pie chart
    const goalsData = [
        { name: 'Steps', value: 75, color: '#4caf50' },
        { name: 'Water', value: 85, color: '#2196f3' },
        { name: 'Sleep', value: 90, color: '#9c27b0' },
        { name: 'Exercise', value: 60, color: '#ff9800' },
    ];

    // Mood distribution
    const moodDistribution = [1, 2, 3, 4, 5].map(value => ({
        mood: value,
        count: moods.filter(m => m.mood === value).length || Math.floor(Math.random() * 5) + 1,
        color: ['#f44336', '#ff9800', '#ffc107', '#8bc34a', '#4caf50'][value - 1],
        label: ['Stressed', 'Low', 'Okay', 'Good', 'Excellent'][value - 1],
    }));

    const streak = calculateStreak(history) || 7;

    return (
        <div className="analytics-page">
            <div className="page-header">
                <div>
                    <h1>Analytics</h1>
                    <p>Track your progress and see insights</p>
                </div>
                <div className="time-range-selector">
                    {['week', 'month'].map((range) => (
                        <button
                            key={range}
                            className={`range-btn ${timeRange === range ? 'active' : ''}`}
                            onClick={() => setTimeRange(range)}
                        >
                            {range === 'week' ? 'This Week' : 'This Month'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Stats */}
            <div className="summary-stats">
                <motion.div
                    className="summary-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="summary-icon steps">
                        <Footprints size={24} />
                    </div>
                    <div className="summary-content">
                        <span className="summary-label">Total Steps</span>
                        <span className="summary-value">{weeklyStats.totalSteps.toLocaleString()}</span>
                        <span className="summary-change positive">
                            <TrendingUp size={14} />
                            +12% vs last week
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="summary-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="summary-icon water">
                        <Droplets size={24} />
                    </div>
                    <div className="summary-content">
                        <span className="summary-label">Water Intake</span>
                        <span className="summary-value">{weeklyStats.totalWater} glasses</span>
                        <span className="summary-change positive">
                            <TrendingUp size={14} />
                            +5% vs last week
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="summary-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="summary-icon sleep">
                        <Moon size={24} />
                    </div>
                    <div className="summary-content">
                        <span className="summary-label">Avg Sleep</span>
                        <span className="summary-value">{weeklyStats.avgSleep}h</span>
                        <span className="summary-change negative">
                            <TrendingDown size={14} />
                            -3% vs last week
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="summary-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="summary-icon streak">
                        <Award size={24} />
                    </div>
                    <div className="summary-content">
                        <span className="summary-label">Current Streak</span>
                        <span className="summary-value">{streak} days</span>
                        <span className="summary-badge">🔥 Keep going!</span>
                    </div>
                </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="charts-grid">
                {/* Steps Chart */}
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="chart-header">
                        <h3>
                            <Footprints size={20} />
                            Steps Overview
                        </h3>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="stepsGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-200)" />
                                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--neutral-200)',
                                        borderRadius: '8px',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="steps"
                                    stroke="#4caf50"
                                    strokeWidth={2}
                                    fill="url(#stepsGrad)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Water & Sleep Chart */}
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="chart-header">
                        <h3>
                            <Droplets size={20} />
                            Water & Sleep
                        </h3>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-200)" />
                                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis yAxisId="left" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--neutral-200)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="water" name="Water (glasses)" fill="#2196f3" radius={[4, 4, 0, 0]} />
                                <Bar yAxisId="right" dataKey="sleep" name="Sleep (hours)" fill="#9c27b0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Goals Progress */}
                <motion.div
                    className="chart-card goals-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="chart-header">
                        <h3>
                            <Target size={20} />
                            Weekly Goals
                        </h3>
                    </div>
                    <div className="goals-container">
                        <div className="pie-section">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={goalsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {goalsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="pie-center">
                                <span className="pie-value">78%</span>
                                <span className="pie-label">Average</span>
                            </div>
                        </div>
                        <div className="goals-legend">
                            {goalsData.map((goal) => (
                                <div key={goal.name} className="goal-item">
                                    <div className="goal-info">
                                        <span className="goal-dot" style={{ background: goal.color }} />
                                        <span className="goal-name">{goal.name}</span>
                                    </div>
                                    <span className="goal-value">{goal.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Mood Distribution */}
                <motion.div
                    className="chart-card mood-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className="chart-header">
                        <h3>
                            <Heart size={20} />
                            Mood Distribution
                        </h3>
                    </div>
                    <div className="mood-distribution">
                        {moodDistribution.map((item) => (
                            <div key={item.mood} className="mood-bar-item">
                                <span className="mood-emoji">
                                    {['😫', '😔', '😐', '🙂', '😊'][item.mood - 1]}
                                </span>
                                <div className="mood-bar-container">
                                    <motion.div
                                        className="mood-bar-fill"
                                        style={{ background: item.color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.count / Math.max(...moodDistribution.map(m => m.count))) * 100}%` }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    />
                                </div>
                                <span className="mood-count">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Insights */}
            <section className="insights-section">
                <h2>Personalized Insights</h2>
                <div className="insights-grid">
                    <motion.div
                        className="insight-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="insight-icon">🎯</span>
                        <h4>Great Progress!</h4>
                        <p>You've exceeded your daily step goal 5 times this week. Keep up the momentum!</p>
                    </motion.div>

                    <motion.div
                        className="insight-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="insight-icon">💧</span>
                        <h4>Hydration Tip</h4>
                        <p>Your water intake drops on weekends. Try setting reminders on Saturday and Sunday.</p>
                    </motion.div>

                    <motion.div
                        className="insight-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="insight-icon">😴</span>
                        <h4>Sleep Pattern</h4>
                        <p>You sleep better on days with more physical activity. Consider evening walks.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
