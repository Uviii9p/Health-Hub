import { useState, useEffect } from 'react';

// Load data from localStorage with a key prefix
export function useLocalStorage(key, initialValue) {
    const prefixedKey = `health-app-${key}`;

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(prefixedKey);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(prefixedKey, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    return [storedValue, setValue];
}

// Hook for managing health stats
export function useHealthStats() {
    const today = new Date().toISOString().split('T')[0];

    const [stats, setStats] = useLocalStorage(`stats-${today}`, {
        steps: 0,
        water: 0,
        calories: 0,
        sleep: 0,
        weight: null,
    });

    const [history, setHistory] = useLocalStorage('stats-history', []);

    const updateStat = (key, value) => {
        setStats(prev => ({ ...prev, [key]: value }));
    };

    const incrementStat = (key, amount = 1) => {
        setStats(prev => ({ ...prev, [key]: (prev[key] || 0) + amount }));
    };

    // Save daily stats to history
    useEffect(() => {
        const existingIndex = history.findIndex(h => h.date === today);
        if (existingIndex >= 0) {
            const newHistory = [...history];
            newHistory[existingIndex] = { date: today, ...stats };
            setHistory(newHistory);
        } else if (stats.steps > 0 || stats.water > 0) {
            setHistory(prev => [...prev.slice(-29), { date: today, ...stats }]);
        }
    }, [stats]);

    return { stats, updateStat, incrementStat, history };
}

// Hook for managing reminders
export function useReminders() {
    const [reminders, setReminders] = useLocalStorage('reminders', []);

    const addReminder = (reminder) => {
        const newReminder = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            completed: false,
            ...reminder,
        };
        setReminders(prev => [...prev, newReminder]);
        return newReminder;
    };

    const updateReminder = (id, updates) => {
        setReminders(prev =>
            prev.map(r => r.id === id ? { ...r, ...updates } : r)
        );
    };

    const deleteReminder = (id) => {
        setReminders(prev => prev.filter(r => r.id !== id));
    };

    const toggleComplete = (id) => {
        setReminders(prev =>
            prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
        );
    };

    return { reminders, addReminder, updateReminder, deleteReminder, toggleComplete };
}

// Hook for mood tracking
export function useMoodTracker() {
    const [moods, setMoods] = useLocalStorage('moods', []);

    const addMood = (mood, note = '') => {
        const entry = {
            id: Date.now(),
            mood,
            note,
            timestamp: new Date().toISOString(),
        };
        setMoods(prev => [...prev, entry]);
        return entry;
    };

    const getTodayMood = () => {
        const today = new Date().toISOString().split('T')[0];
        return moods.filter(m => m.timestamp.startsWith(today));
    };

    const getWeekMoods = () => {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        return moods.filter(m => m.timestamp >= weekAgo);
    };

    return { moods, addMood, getTodayMood, getWeekMoods };
}

// Hook for meal tracking
export function useMealTracker() {
    const today = new Date().toISOString().split('T')[0];
    const [meals, setMeals] = useLocalStorage(`meals-${today}`, []);
    const [mealHistory, setMealHistory] = useLocalStorage('meal-history', []);

    const addMeal = (meal) => {
        const entry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...meal,
        };
        setMeals(prev => [...prev, entry]);
        return entry;
    };

    const removeMeal = (id) => {
        setMeals(prev => prev.filter(m => m.id !== id));
    };

    const getTotalNutrition = () => {
        return meals.reduce((acc, meal) => ({
            calories: acc.calories + (meal.calories || 0),
            protein: acc.protein + (meal.protein || 0),
            carbs: acc.carbs + (meal.carbs || 0),
            fat: acc.fat + (meal.fat || 0),
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    };

    return { meals, addMeal, removeMeal, getTotalNutrition, mealHistory };
}

// Hook for workout tracking
export function useWorkoutTracker() {
    const [workouts, setWorkouts] = useLocalStorage('completed-workouts', []);

    const completeWorkout = (workout) => {
        const entry = {
            id: Date.now(),
            completedAt: new Date().toISOString(),
            ...workout,
        };
        setWorkouts(prev => [...prev, entry]);
        return entry;
    };

    const getTodayWorkouts = () => {
        const today = new Date().toISOString().split('T')[0];
        return workouts.filter(w => w.completedAt.startsWith(today));
    };

    const getWeekWorkouts = () => {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        return workouts.filter(w => w.completedAt >= weekAgo);
    };

    return { workouts, completeWorkout, getTodayWorkouts, getWeekWorkouts };
}
