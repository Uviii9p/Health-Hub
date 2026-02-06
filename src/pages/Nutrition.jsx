import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Utensils,
    Plus,
    Flame,
    Target,
    Coffee,
    Sun,
    Sunset,
    Moon as MoonIcon,
    Apple,
    Check,
    X,
    Info
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useMealTracker } from '../hooks/useHealthData';
import { mealSuggestions } from '../data/healthData';
import './Nutrition.css';

const mealTimes = [
    { id: 'breakfast', label: 'Breakfast', icon: Coffee, color: '#ff9800' },
    { id: 'lunch', label: 'Lunch', icon: Sun, color: '#4caf50' },
    { id: 'dinner', label: 'Dinner', icon: Sunset, color: '#9c27b0' },
    { id: 'snack', label: 'Snacks', icon: Apple, color: '#00bcd4' },
];

export default function Nutrition() {
    const { meals, addMeal, removeMeal, getTotalNutrition } = useMealTracker();
    const [selectedMealTime, setSelectedMealTime] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [newMeal, setNewMeal] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        mealTime: 'breakfast',
        image: '🍽️'
    });

    const totals = getTotalNutrition();
    const calorieGoal = 2000;
    const proteinGoal = 60;
    const carbsGoal = 250;
    const fatGoal = 65;

    const macroData = [
        { name: 'Protein', value: totals.protein, color: '#4caf50', goal: proteinGoal },
        { name: 'Carbs', value: totals.carbs, color: '#2196f3', goal: carbsGoal },
        { name: 'Fat', value: totals.fat, color: '#ff9800', goal: fatGoal },
    ];

    const calorieProgress = Math.min((totals.calories / calorieGoal) * 100, 100);

    const filteredSuggestions = selectedMealTime === 'all'
        ? mealSuggestions
        : mealSuggestions.filter(m => m.meal === selectedMealTime);

    const handleAddMeal = (meal) => {
        addMeal({
            name: meal.name,
            calories: Number(meal.calories),
            protein: Number(meal.protein),
            carbs: Number(meal.carbs),
            fat: Number(meal.fat),
            mealTime: meal.meal || meal.mealTime,
            image: meal.image || '🍽️',
        });
        setShowAddModal(false);
        setSelectedSuggestion(null);
        setNewMeal({
            name: '',
            calories: '',
            protein: '',
            carbs: '',
            fat: '',
            mealTime: 'breakfast',
            image: '🍽️'
        });
    };

    const handleNewMealSubmit = (e) => {
        e.preventDefault();
        handleAddMeal({
            ...newMeal,
            meal: newMeal.mealTime // map to expected property
        });
    };

    const getMealTimeInfo = (id) => mealTimes.find(m => m.id === id) || mealTimes[3];

    return (
        <div className="nutrition-page">
            <div className="page-header">
                <div>
                    <h1>Nutrition</h1>
                    <p>Track your meals and maintain a balanced diet</p>
                </div>
                <motion.button
                    className="add-meal-btn"
                    onClick={() => setShowAddModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Plus size={20} />
                    Log Meal
                </motion.button>
            </div>

            {/* Calorie Overview */}
            <div className="nutrition-overview">
                <motion.div
                    className="calorie-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="calorie-ring">
                        <svg viewBox="0 0 100 100">
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="var(--neutral-200)"
                                strokeWidth="8"
                            />
                            <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="url(#calorieGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${calorieProgress * 2.83} 283`}
                                transform="rotate(-90 50 50)"
                                style={{ transition: 'stroke-dasharray 0.5s ease' }}
                            />
                            <defs>
                                <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#4caf50" />
                                    <stop offset="100%" stopColor="#8bc34a" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="calorie-center">
                            <span className="calorie-value">{totals.calories}</span>
                            <span className="calorie-label">/ {calorieGoal} kcal</span>
                        </div>
                    </div>
                    <div className="calorie-info">
                        <h3>Daily Calories</h3>
                        <p>{calorieGoal - totals.calories > 0 ? `${calorieGoal - totals.calories} kcal remaining` : 'Goal reached!'}</p>
                    </div>
                </motion.div>

                {/* Macro Breakdown */}
                <motion.div
                    className="macros-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3>Macronutrients</h3>
                    <div className="macros-list">
                        {macroData.map((macro) => (
                            <div key={macro.name} className="macro-item">
                                <div className="macro-header">
                                    <span className="macro-name">{macro.name}</span>
                                    <span className="macro-value">{macro.value}g / {macro.goal}g</span>
                                </div>
                                <div className="macro-bar">
                                    <motion.div
                                        className="macro-fill"
                                        style={{ background: macro.color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((macro.value / macro.goal) * 100, 100)}%` }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Macro Pie Chart */}
                <motion.div
                    className="pie-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3>Macro Split</h3>
                    <div className="pie-container">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie
                                    data={macroData.filter(m => m.value > 0)}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {macroData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pie-legend">
                            {macroData.map((macro) => (
                                <div key={macro.name} className="legend-item">
                                    <span className="legend-dot" style={{ background: macro.color }} />
                                    <span>{macro.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Meal Times */}
            <div className="meal-times">
                <button
                    className={`meal-time-btn ${selectedMealTime === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedMealTime('all')}
                >
                    <Utensils size={18} />
                    All Meals
                </button>
                {mealTimes.map((time) => (
                    <button
                        key={time.id}
                        className={`meal-time-btn ${selectedMealTime === time.id ? 'active' : ''}`}
                        onClick={() => setSelectedMealTime(time.id)}
                        style={{ '--meal-color': time.color }}
                    >
                        <time.icon size={18} />
                        {time.label}
                    </button>
                ))}
            </div>

            {/* Today's Meals */}
            <section className="meals-section">
                <h2>Today's Meals</h2>
                {meals.length === 0 ? (
                    <div className="empty-state">
                        <Utensils size={48} className="empty-icon" />
                        <p>No meals logged today</p>
                        <span>Start tracking your nutrition</span>
                    </div>
                ) : (
                    <div className="meals-grid">
                        {meals
                            .filter(m => selectedMealTime === 'all' || m.mealTime === selectedMealTime)
                            .map((meal) => {
                                const timeInfo = getMealTimeInfo(meal.mealTime);
                                return (
                                    <motion.div
                                        key={meal.id}
                                        className="meal-card"
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="meal-emoji">{meal.image}</div>
                                        <div className="meal-content">
                                            <h4>{meal.name}</h4>
                                            <div className="meal-badge" style={{ background: `${timeInfo.color}20`, color: timeInfo.color }}>
                                                <timeInfo.icon size={12} />
                                                {timeInfo.label}
                                            </div>
                                            <div className="meal-macros">
                                                <span>{meal.calories} kcal</span>
                                                <span>P: {meal.protein}g</span>
                                                <span>C: {meal.carbs}g</span>
                                                <span>F: {meal.fat}g</span>
                                            </div>
                                        </div>
                                        <button
                                            className="remove-meal"
                                            onClick={() => removeMeal(meal.id)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                );
                            })}
                    </div>
                )}
            </section>

            {/* Meal Suggestions */}
            <section className="suggestions-section">
                <h2>Healthy Meal Ideas</h2>
                <div className="suggestions-grid">
                    {filteredSuggestions.map((meal) => {
                        const timeInfo = getMealTimeInfo(meal.meal);
                        return (
                            <motion.div
                                key={meal.id}
                                className="suggestion-card"
                                whileHover={{ y: -4 }}
                                onClick={() => setSelectedSuggestion(meal)}
                            >
                                <div className="suggestion-emoji">{meal.image}</div>
                                <div className="suggestion-content">
                                    <h4>{meal.name}</h4>
                                    <div className="suggestion-badge" style={{ background: `${timeInfo.color}20`, color: timeInfo.color }}>
                                        {timeInfo.label}
                                    </div>
                                    <div className="suggestion-info">
                                        <span><Flame size={14} /> {meal.calories} kcal</span>
                                    </div>
                                </div>
                                <button
                                    className="add-suggestion"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddMeal(meal);
                                    }}
                                >
                                    <Plus size={18} />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Meal Detail Modal */}
            {selectedSuggestion && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedSuggestion(null)}
                >
                    <motion.div
                        className="meal-detail-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-modal" onClick={() => setSelectedSuggestion(null)}>
                            <X size={20} />
                        </button>
                        <div className="modal-emoji">{selectedSuggestion.image}</div>
                        <h2>{selectedSuggestion.name}</h2>
                        <div className="modal-nutrition">
                            <div className="nutrition-item">
                                <span className="nutrition-value">{selectedSuggestion.calories}</span>
                                <span className="nutrition-label">Calories</span>
                            </div>
                            <div className="nutrition-item">
                                <span className="nutrition-value">{selectedSuggestion.protein}g</span>
                                <span className="nutrition-label">Protein</span>
                            </div>
                            <div className="nutrition-item">
                                <span className="nutrition-value">{selectedSuggestion.carbs}g</span>
                                <span className="nutrition-label">Carbs</span>
                            </div>
                            <div className="nutrition-item">
                                <span className="nutrition-value">{selectedSuggestion.fat}g</span>
                                <span className="nutrition-label">Fat</span>
                            </div>
                        </div>
                        <div className="modal-ingredients">
                            <h4>Ingredients</h4>
                            <ul>
                                {selectedSuggestion.ingredients.map((ing, i) => (
                                    <li key={i}><Check size={14} /> {ing}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="add-to-log"
                            onClick={() => handleAddMeal(selectedSuggestion)}
                        >
                            <Plus size={18} />
                            Add to Today's Log
                        </button>
                    </motion.div>
                </motion.div>
            )}

            {/* Add Custom Meal Modal */}
            {showAddModal && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAddModal(false)}
                >
                    <motion.div
                        className="meal-detail-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-modal" onClick={() => setShowAddModal(false)}>
                            <X size={20} />
                        </button>
                        <h2>Log Custom Meal</h2>
                        <form onSubmit={handleNewMealSubmit} className="custom-meal-form">
                            <div className="form-group">
                                <label>Meal Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Grilled Chicken Salad"
                                    value={newMeal.name}
                                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Meal Time</label>
                                <select
                                    value={newMeal.mealTime}
                                    onChange={(e) => setNewMeal({ ...newMeal, mealTime: e.target.value })}
                                >
                                    {mealTimes.map(t => (
                                        <option key={t.id} value={t.id}>{t.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Calories</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        placeholder="kcal"
                                        value={newMeal.calories}
                                        onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Protein (g)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="g"
                                        value={newMeal.protein}
                                        onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Carbs (g)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="g"
                                        value={newMeal.carbs}
                                        onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fat (g)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="g"
                                        value={newMeal.fat}
                                        onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="add-to-log">
                                <Plus size={18} />
                                Add Meal
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
