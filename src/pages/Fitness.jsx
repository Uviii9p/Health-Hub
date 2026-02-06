import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dumbbell,
    Play,
    Pause,
    RotateCcw,
    Clock,
    Flame,
    TrendingUp,
    Filter,
    Check,
    X,
    ChevronRight,
    Zap,
    Target
} from 'lucide-react';
import { useWorkoutTracker } from '../hooks/useHealthData';
import { workouts } from '../data/healthData';
import './Fitness.css';

const categories = ['All', 'Cardio', 'Strength', 'Yoga', 'Stretching'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

export default function Fitness() {
    const { completeWorkout, getTodayWorkouts, getWeekWorkouts } = useWorkoutTracker();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [activeWorkout, setActiveWorkout] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);

    const todayWorkouts = getTodayWorkouts();
    const weekWorkouts = getWeekWorkouts();

    const filteredWorkouts = workouts.filter(w => {
        const categoryMatch = selectedCategory === 'All' || w.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === 'All' || w.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });

    const todayStats = {
        workouts: todayWorkouts.length,
        calories: todayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0),
        duration: todayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
    };

    const startWorkout = (workout) => {
        setActiveWorkout(workout);
        setCurrentExercise(0);
        setIsPlaying(true);
        setTimer(0);
    };

    const finishWorkout = () => {
        if (activeWorkout) {
            completeWorkout(activeWorkout);
        }
        setActiveWorkout(null);
        setCurrentExercise(0);
        setIsPlaying(false);
        setTimer(0);
    };

    const nextExercise = () => {
        if (activeWorkout && currentExercise < activeWorkout.exercises.length - 1) {
            setCurrentExercise(prev => prev + 1);
        } else {
            finishWorkout();
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return '#4caf50';
            case 'Medium': return '#ff9800';
            case 'Hard': return '#f44336';
            default: return '#9e9e9e';
        }
    };

    const getCategoryEmoji = (category) => {
        switch (category) {
            case 'Cardio': return '🏃';
            case 'Strength': return '💪';
            case 'Yoga': return '🧘';
            case 'Stretching': return '🤸';
            default: return '🏋️';
        }
    };

    return (
        <div className="fitness-page">
            <div className="page-header">
                <div>
                    <h1>Fitness</h1>
                    <p>Stay active with guided workouts</p>
                </div>
            </div>

            {/* Today's Progress */}
            <div className="fitness-stats">
                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="stat-icon workouts-icon">
                        <Dumbbell size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{todayStats.workouts}</span>
                        <span className="stat-label">Workouts</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="stat-icon calories-icon">
                        <Flame size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{todayStats.calories}</span>
                        <span className="stat-label">Calories</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="stat-icon time-icon">
                        <Clock size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{todayStats.duration}</span>
                        <span className="stat-label">Minutes</span>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="stat-icon week-icon">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{weekWorkouts.length}</span>
                        <span className="stat-label">This Week</span>
                    </div>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="filter-group">
                    <span className="filter-label">Category:</span>
                    <div className="filter-options">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="filter-group">
                    <span className="filter-label">Difficulty:</span>
                    <div className="filter-options">
                        {difficulties.map((diff) => (
                            <button
                                key={diff}
                                className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                                onClick={() => setSelectedDifficulty(diff)}
                                style={diff !== 'All' ? { '--diff-color': getDifficultyColor(diff) } : {}}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Workouts Grid */}
            <div className="workouts-grid">
                {filteredWorkouts.map((workout) => (
                    <motion.div
                        key={workout.id}
                        className="workout-card"
                        whileHover={{ y: -4 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="workout-header">
                            <span className="workout-emoji">{getCategoryEmoji(workout.category)}</span>
                            <span
                                className="difficulty-badge"
                                style={{
                                    background: `${getDifficultyColor(workout.difficulty)}20`,
                                    color: getDifficultyColor(workout.difficulty)
                                }}
                            >
                                {workout.difficulty}
                            </span>
                        </div>
                        <h3>{workout.name}</h3>
                        <div className="workout-meta">
                            <span><Clock size={14} /> {workout.duration} min</span>
                            <span><Flame size={14} /> {workout.calories} cal</span>
                        </div>
                        <div className="workout-exercises">
                            {workout.exercises.slice(0, 3).map((ex, i) => (
                                <span key={i} className="exercise-tag">{ex.name}</span>
                            ))}
                            {workout.exercises.length > 3 && (
                                <span className="exercise-more">+{workout.exercises.length - 3}</span>
                            )}
                        </div>
                        <button
                            className="start-workout-btn"
                            onClick={() => startWorkout(workout)}
                        >
                            <Play size={16} />
                            Start Workout
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Active Workout Modal */}
            <AnimatePresence>
                {activeWorkout && (
                    <motion.div
                        className="workout-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="workout-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <button className="close-workout" onClick={() => setActiveWorkout(null)}>
                                <X size={24} />
                            </button>

                            <div className="workout-progress">
                                <div className="progress-bar">
                                    <motion.div
                                        className="progress-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentExercise + 1) / activeWorkout.exercises.length) * 100}%` }}
                                    />
                                </div>
                                <span>{currentExercise + 1} / {activeWorkout.exercises.length}</span>
                            </div>

                            <div className="current-exercise">
                                <span className="exercise-category">{activeWorkout.category}</span>
                                <h2>{activeWorkout.exercises[currentExercise].name}</h2>
                                <p className="exercise-reps">{activeWorkout.exercises[currentExercise].reps}</p>
                            </div>

                            <div className="exercise-visual">
                                <div className="exercise-circle">
                                    <span className="exercise-emoji-large">{getCategoryEmoji(activeWorkout.category)}</span>
                                </div>
                            </div>

                            <div className="workout-controls">
                                <button
                                    className="control-btn"
                                    onClick={() => setCurrentExercise(prev => Math.max(0, prev - 1))}
                                    disabled={currentExercise === 0}
                                >
                                    <RotateCcw size={20} />
                                </button>
                                <button
                                    className="control-btn play-btn"
                                    onClick={nextExercise}
                                >
                                    {currentExercise === activeWorkout.exercises.length - 1 ? (
                                        <Check size={24} />
                                    ) : (
                                        <ChevronRight size={24} />
                                    )}
                                </button>
                                <button
                                    className="control-btn"
                                    onClick={finishWorkout}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="upcoming-exercises">
                                <h4>Coming Up</h4>
                                <div className="upcoming-list">
                                    {activeWorkout.exercises.slice(currentExercise + 1, currentExercise + 4).map((ex, i) => (
                                        <div key={i} className="upcoming-item">
                                            <span className="upcoming-number">{currentExercise + i + 2}</span>
                                            <span className="upcoming-name">{ex.name}</span>
                                            <span className="upcoming-reps">{ex.reps}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
