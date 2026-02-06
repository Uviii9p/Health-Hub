// Utility functions for health calculations and formatting

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {object} BMI value and category
 */
export function calculateBMI(weight, height) {
    if (!weight || !height) return null;

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category, color;
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#2196f3';
    } else if (bmi < 25) {
        category = 'Normal';
        color = '#4caf50';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#ff9800';
    } else {
        category = 'Obese';
        color = '#f44336';
    }

    return { value: Math.round(bmi * 10) / 10, category, color };
}

/**
 * Calculate daily calorie needs (Mifflin-St Jeor Equation)
 * @param {object} params - User parameters
 * @returns {number} Estimated daily calorie needs
 */
export function calculateDailyCalories({ weight, height, age, gender, activityLevel }) {
    if (!weight || !height || !age) return 2000;

    // BMR calculation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
    };

    return Math.round(bmr * (multipliers[activityLevel] || 1.55));
}

/**
 * Calculate water intake recommendation
 * @param {number} weight - Weight in kg
 * @returns {number} Recommended water in glasses (250ml each)
 */
export function calculateWaterIntake(weight) {
    if (!weight) return 8;
    // Roughly 30-35ml per kg of body weight
    const mlNeeded = weight * 33;
    return Math.round(mlNeeded / 250); // Convert to glasses
}

/**
 * Format duration in minutes to readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export function formatDuration(minutes) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Format time to readable string
 * @param {string|Date} date - Date/time to format
 * @returns {string} Formatted time
 */
export function formatTime(date) {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Get greeting based on time of day
 * @returns {string} Appropriate greeting
 */
export function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
}

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {*} Random item
 */
export function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total/target value
 * @returns {number} Percentage (0-100)
 */
export function calculatePercentage(value, total) {
    if (!total) return 0;
    return Math.min(Math.round((value / total) * 100), 100);
}

/**
 * Get week dates for analytics
 * @returns {Array} Array of date strings for past 7 days
 */
export function getWeekDates() {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
}

/**
 * Get month dates for analytics
 * @returns {Array} Array of date strings for past 30 days
 */
export function getMonthDates() {
    const dates = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
}

/**
 * Calculate streak (consecutive days)
 * @param {Array} history - Array of entries with dates
 * @returns {number} Current streak count
 */
export function calculateStreak(history) {
    if (!history || history.length === 0) return 0;

    const sortedDates = history
        .map(h => h.date || h.timestamp?.split('T')[0])
        .sort()
        .reverse();

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = new Date(today);

    for (const date of sortedDates) {
        const expectedDate = currentDate.toISOString().split('T')[0];
        if (date === expectedDate) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (date < expectedDate) {
            break;
        }
    }

    return streak;
}
