import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Smile,
    Frown,
    Meh,
    Heart,
    Wind,
    Play,
    Pause,
    RotateCcw,
    Check,
    Plus,
    Calendar,
    TrendingUp
} from 'lucide-react';
import { useMoodTracker } from '../hooks/useHealthData';
import { meditationSessions, breathingExercises, moodOptions, motivationalQuotes } from '../data/healthData';
import { getRandomItem } from '../utils/helpers';
import './MentalHealth.css';

export default function MentalHealth() {
    const { moods, addMood, getWeekMoods } = useMoodTracker();
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodNote, setMoodNote] = useState('');
    const [activeSession, setActiveSession] = useState(null);
    const [breathingActive, setBreathingActive] = useState(null);
    const [breathPhase, setBreathPhase] = useState('inhale');
    const [breathCount, setBreathCount] = useState(0);
    const [quote, setQuote] = useState(getRandomItem(motivationalQuotes));
    const breathInterval = useRef(null);

    const weekMoods = getWeekMoods();
    const todayMood = moods.filter(m =>
        m.timestamp.startsWith(new Date().toISOString().split('T')[0])
    );

    const averageMood = weekMoods.length > 0
        ? Math.round(weekMoods.reduce((sum, m) => sum + m.mood, 0) / weekMoods.length * 10) / 10
        : 0;

    const handleMoodSubmit = () => {
        if (selectedMood) {
            addMood(selectedMood, moodNote);
            setSelectedMood(null);
            setMoodNote('');
        }
    };

    const startBreathing = (exercise) => {
        setBreathingActive(exercise);
        setBreathPhase('inhale');
        setBreathCount(0);
        runBreathingCycle(exercise);
    };

    const runBreathingCycle = (exercise) => {
        const pattern = exercise.pattern;
        let phase = 'inhale';
        let totalCycles = 0;

        const runPhase = () => {
            setBreathPhase(phase);
            let duration;

            switch (phase) {
                case 'inhale':
                    duration = pattern.inhale * 1000;
                    phase = pattern.hold1 > 0 ? 'hold' : 'exhale';
                    break;
                case 'hold':
                    duration = pattern.hold1 * 1000;
                    phase = 'exhale';
                    break;
                case 'exhale':
                    duration = pattern.exhale * 1000;
                    phase = pattern.hold2 > 0 ? 'hold2' : 'inhale';
                    break;
                case 'hold2':
                    duration = pattern.hold2 * 1000;
                    phase = 'inhale';
                    totalCycles++;
                    setBreathCount(totalCycles);
                    break;
            }

            if (totalCycles < exercise.duration) {
                breathInterval.current = setTimeout(runPhase, duration);
            } else {
                setBreathingActive(null);
            }
        };

        runPhase();
    };

    const stopBreathing = () => {
        if (breathInterval.current) {
            clearTimeout(breathInterval.current);
        }
        setBreathingActive(null);
    };

    useEffect(() => {
        return () => {
            if (breathInterval.current) {
                clearTimeout(breathInterval.current);
            }
        };
    }, []);

    const getMoodEmoji = (value) => {
        const option = moodOptions.find(m => m.value === value);
        return option ? option.emoji : '😐';
    };

    return (
        <div className="mental-health-page">
            <div className="page-header">
                <div>
                    <h1>Mental Health</h1>
                    <p>Nurture your mind and find inner peace</p>
                </div>
            </div>

            {/* Mood Tracker */}
            <section className="mood-section">
                <motion.div
                    className="mood-tracker-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3>How are you feeling today?</h3>
                    <div className="mood-options">
                        {moodOptions.map((option) => (
                            <motion.button
                                key={option.value}
                                className={`mood-btn ${selectedMood === option.value ? 'selected' : ''}`}
                                onClick={() => setSelectedMood(option.value)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ '--mood-color': option.color }}
                            >
                                <span className="mood-emoji">{option.emoji}</span>
                                <span className="mood-label">{option.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedMood && (
                            <motion.div
                                className="mood-note-section"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <textarea
                                    placeholder="Add a note about how you're feeling..."
                                    value={moodNote}
                                    onChange={(e) => setMoodNote(e.target.value)}
                                />
                                <button className="submit-mood" onClick={handleMoodSubmit}>
                                    <Check size={18} />
                                    Log Mood
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="mood-summary-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="summary-header">
                        <h3>Mood Insights</h3>
                        <span className="time-range">Last 7 days</span>
                    </div>

                    <div className="mood-stats">
                        <div className="mood-stat">
                            <div className="stat-circle">
                                <span>{averageMood || '—'}</span>
                            </div>
                            <span className="stat-label">Avg Mood</span>
                        </div>
                        <div className="mood-stat">
                            <div className="stat-circle entries">{weekMoods.length}</div>
                            <span className="stat-label">Entries</span>
                        </div>
                        <div className="mood-stat">
                            <div className="stat-circle today">{todayMood.length}</div>
                            <span className="stat-label">Today</span>
                        </div>
                    </div>

                    <div className="mood-history">
                        {weekMoods.slice(-7).map((entry, i) => (
                            <div key={i} className="mood-history-item">
                                <span className="mood-dot" style={{ background: moodOptions.find(m => m.value === entry.mood)?.color }}>
                                    {getMoodEmoji(entry.mood)}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Daily Quote */}
            <motion.div
                className="quote-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="quote-icon">✨</div>
                <blockquote>"{quote.text}"</blockquote>
                <cite>— {quote.author}</cite>
                <button
                    className="new-quote-btn"
                    onClick={() => setQuote(getRandomItem(motivationalQuotes))}
                >
                    <RotateCcw size={14} />
                    New Quote
                </button>
            </motion.div>

            {/* Breathing Exercises */}
            <section className="breathing-section">
                <h2>
                    <Wind size={24} />
                    Breathing Exercises
                </h2>
                <p className="section-description">
                    Simple breathing techniques to reduce stress and anxiety
                </p>

                <div className="breathing-grid">
                    {breathingExercises.map((exercise) => (
                        <motion.div
                            key={exercise.id}
                            className="breathing-card"
                            whileHover={{ y: -4 }}
                        >
                            <h4>{exercise.name}</h4>
                            <p>{exercise.description}</p>
                            <span className="breathing-benefit">{exercise.benefits}</span>
                            <button
                                className="start-breathing"
                                onClick={() => startBreathing(exercise)}
                            >
                                <Play size={16} />
                                Start ({exercise.duration} cycles)
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Meditation Sessions */}
            <section className="meditation-section">
                <h2>
                    <Brain size={24} />
                    Guided Meditation
                </h2>
                <p className="section-description">
                    Find peace with guided meditation sessions
                </p>

                <div className="meditation-grid">
                    {meditationSessions.map((session) => (
                        <motion.div
                            key={session.id}
                            className="meditation-card"
                            whileHover={{ y: -4 }}
                            onClick={() => setActiveSession(session)}
                        >
                            <span className="session-icon">{session.icon}</span>
                            <h4>{session.name}</h4>
                            <p>{session.description}</p>
                            <div className="session-meta">
                                <span className="session-duration">{session.duration} min</span>
                                <span className="session-category">{session.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Breathing Exercise Modal */}
            <AnimatePresence>
                {breathingActive && (
                    <motion.div
                        className="breathing-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="breathing-modal"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        >
                            <h2>{breathingActive.name}</h2>

                            <div className="breathing-visual">
                                <motion.div
                                    className="breath-circle"
                                    animate={{
                                        scale: breathPhase === 'inhale' ? 1.5 : breathPhase === 'exhale' ? 1 : 1.25,
                                    }}
                                    transition={{ duration: breathingActive.pattern[breathPhase === 'hold' || breathPhase === 'hold2' ? 'hold1' : breathPhase] }}
                                >
                                    <span className="breath-phase">
                                        {breathPhase === 'inhale' && 'Breathe In'}
                                        {breathPhase === 'hold' && 'Hold'}
                                        {breathPhase === 'exhale' && 'Breathe Out'}
                                        {breathPhase === 'hold2' && 'Hold'}
                                    </span>
                                </motion.div>
                            </div>

                            <div className="breath-counter">
                                Cycle {breathCount + 1} of {breathingActive.duration}
                            </div>

                            <button className="stop-breathing" onClick={stopBreathing}>
                                Stop
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Meditation Session Modal */}
            <AnimatePresence>
                {activeSession && (
                    <motion.div
                        className="meditation-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveSession(null)}
                    >
                        <motion.div
                            className="meditation-modal"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="modal-session-icon">{activeSession.icon}</span>
                            <h2>{activeSession.name}</h2>
                            <p>{activeSession.description}</p>

                            <div className="meditation-timer">
                                <div className="timer-ring">
                                    <svg viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--neutral-200)" strokeWidth="4" />
                                        <circle
                                            cx="50" cy="50" r="45"
                                            fill="none"
                                            stroke="var(--accent-purple)"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeDasharray="283"
                                            strokeDashoffset="0"
                                        />
                                    </svg>
                                    <span className="timer-value">{activeSession.duration}:00</span>
                                </div>
                            </div>

                            <div className="meditation-controls">
                                <button className="meditation-play">
                                    <Play size={24} />
                                    Begin Session
                                </button>
                            </div>

                            <button
                                className="close-meditation"
                                onClick={() => setActiveSession(null)}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
