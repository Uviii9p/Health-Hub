// Health quotes and tips data
export const motivationalQuotes = [
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "The greatest wealth is health.", author: "Virgil" },
    { text: "Happiness is the highest form of health.", author: "Dalai Lama" },
    { text: "Health is not valued till sickness comes.", author: "Thomas Fuller" },
    { text: "A healthy outside starts from the inside.", author: "Robert Urich" },
    { text: "Your body hears everything your mind says.", author: "Naomi Judd" },
    { text: "Sleep is the best meditation.", author: "Dalai Lama" },
    { text: "Movement is a medicine for creating change.", author: "Carol Welch" },
    { text: "The first wealth is health.", author: "Ralph Waldo Emerson" },
    { text: "Early to bed and early to rise makes a person healthy, wealthy and wise.", author: "Benjamin Franklin" },
];

export const healthTips = [
    "Drink a glass of water first thing in the morning",
    "Take a 5-minute stretching break every hour",
    "Practice deep breathing for 2 minutes when stressed",
    "Walk 10,000 steps today for better cardiovascular health",
    "Eat a variety of colorful vegetables with each meal",
    "Get 7-9 hours of quality sleep tonight",
    "Take the stairs instead of the elevator",
    "Limit screen time 1 hour before bedtime",
    "Practice gratitude by listing 3 things you're thankful for",
    "Stay hydrated - aim for 8 glasses of water daily",
];

export const workouts = [
    {
        id: 1,
        name: "Morning Stretch",
        duration: 10,
        calories: 30,
        difficulty: "Easy",
        category: "Stretching",
        exercises: [
            { name: "Neck Rolls", reps: "10 each direction" },
            { name: "Shoulder Shrugs", reps: "15 reps" },
            { name: "Cat-Cow Stretch", reps: "10 reps" },
            { name: "Hamstring Stretch", reps: "30 sec each" },
            { name: "Hip Circles", reps: "10 each direction" },
        ]
    },
    {
        id: 2,
        name: "Full Body Cardio",
        duration: 20,
        calories: 150,
        difficulty: "Medium",
        category: "Cardio",
        exercises: [
            { name: "Jumping Jacks", reps: "30 reps" },
            { name: "High Knees", reps: "30 sec" },
            { name: "Burpees", reps: "10 reps" },
            { name: "Mountain Climbers", reps: "30 sec" },
            { name: "Squat Jumps", reps: "15 reps" },
        ]
    },
    {
        id: 3,
        name: "Core Strength",
        duration: 15,
        calories: 100,
        difficulty: "Medium",
        category: "Strength",
        exercises: [
            { name: "Plank", reps: "45 sec" },
            { name: "Crunches", reps: "20 reps" },
            { name: "Bicycle Crunches", reps: "20 reps" },
            { name: "Leg Raises", reps: "15 reps" },
            { name: "Russian Twists", reps: "20 reps" },
        ]
    },
    {
        id: 4,
        name: "Relaxing Yoga",
        duration: 25,
        calories: 80,
        difficulty: "Easy",
        category: "Yoga",
        exercises: [
            { name: "Child's Pose", reps: "1 min" },
            { name: "Downward Dog", reps: "1 min" },
            { name: "Warrior I", reps: "30 sec each" },
            { name: "Tree Pose", reps: "30 sec each" },
            { name: "Corpse Pose", reps: "3 min" },
        ]
    },
    {
        id: 5,
        name: "Upper Body Blast",
        duration: 20,
        calories: 120,
        difficulty: "Hard",
        category: "Strength",
        exercises: [
            { name: "Push-ups", reps: "15 reps" },
            { name: "Diamond Push-ups", reps: "10 reps" },
            { name: "Tricep Dips", reps: "15 reps" },
            { name: "Pike Push-ups", reps: "10 reps" },
            { name: "Plank Shoulder Taps", reps: "20 reps" },
        ]
    },
    {
        id: 6,
        name: "Lower Body Power",
        duration: 25,
        calories: 180,
        difficulty: "Hard",
        category: "Strength",
        exercises: [
            { name: "Squats", reps: "20 reps" },
            { name: "Lunges", reps: "15 each leg" },
            { name: "Glute Bridges", reps: "20 reps" },
            { name: "Calf Raises", reps: "25 reps" },
            { name: "Wall Sit", reps: "45 sec" },
        ]
    },
];

export const mealSuggestions = [
    {
        id: 1,
        name: "Greek Yogurt Bowl",
        meal: "breakfast",
        calories: 350,
        protein: 20,
        carbs: 45,
        fat: 8,
        image: "🥣",
        ingredients: ["Greek yogurt", "Honey", "Mixed berries", "Granola", "Chia seeds"]
    },
    {
        id: 2,
        name: "Avocado Toast",
        meal: "breakfast",
        calories: 380,
        protein: 12,
        carbs: 35,
        fat: 22,
        image: "🥑",
        ingredients: ["Whole grain bread", "Avocado", "Eggs", "Cherry tomatoes", "Feta cheese"]
    },
    {
        id: 3,
        name: "Grilled Chicken Salad",
        meal: "lunch",
        calories: 420,
        protein: 35,
        carbs: 25,
        fat: 18,
        image: "🥗",
        ingredients: ["Grilled chicken breast", "Mixed greens", "Cucumbers", "Tomatoes", "Olive oil dressing"]
    },
    {
        id: 4,
        name: "Quinoa Buddha Bowl",
        meal: "lunch",
        calories: 480,
        protein: 18,
        carbs: 65,
        fat: 15,
        image: "🍲",
        ingredients: ["Quinoa", "Roasted vegetables", "Chickpeas", "Tahini dressing", "Fresh herbs"]
    },
    {
        id: 5,
        name: "Salmon with Vegetables",
        meal: "dinner",
        calories: 520,
        protein: 40,
        carbs: 30,
        fat: 25,
        image: "🐟",
        ingredients: ["Baked salmon", "Roasted broccoli", "Sweet potato", "Lemon", "Garlic"]
    },
    {
        id: 6,
        name: "Vegetable Stir Fry",
        meal: "dinner",
        calories: 380,
        protein: 15,
        carbs: 45,
        fat: 12,
        image: "🥦",
        ingredients: ["Tofu", "Mixed vegetables", "Brown rice", "Soy sauce", "Ginger"]
    },
    {
        id: 7,
        name: "Protein Smoothie",
        meal: "snack",
        calories: 280,
        protein: 25,
        carbs: 35,
        fat: 5,
        image: "🥤",
        ingredients: ["Protein powder", "Banana", "Almond milk", "Peanut butter", "Spinach"]
    },
    {
        id: 8,
        name: "Mixed Nuts & Fruit",
        meal: "snack",
        calories: 200,
        protein: 6,
        carbs: 20,
        fat: 12,
        image: "🥜",
        ingredients: ["Almonds", "Walnuts", "Dried cranberries", "Dark chocolate chips"]
    },
];

export const meditationSessions = [
    {
        id: 1,
        name: "Morning Calm",
        duration: 5,
        description: "Start your day with peace and clarity",
        category: "mindfulness",
        icon: "🌅"
    },
    {
        id: 2,
        name: "Stress Relief",
        duration: 10,
        description: "Release tension and find inner peace",
        category: "stress",
        icon: "🧘"
    },
    {
        id: 3,
        name: "Deep Focus",
        duration: 15,
        description: "Enhance concentration and mental clarity",
        category: "focus",
        icon: "🎯"
    },
    {
        id: 4,
        name: "Sleep Well",
        duration: 10,
        description: "Prepare your mind for restful sleep",
        category: "sleep",
        icon: "🌙"
    },
    {
        id: 5,
        name: "Anxiety Relief",
        duration: 8,
        description: "Calm anxious thoughts and find balance",
        category: "anxiety",
        icon: "💆"
    },
    {
        id: 6,
        name: "Gratitude Practice",
        duration: 5,
        description: "Cultivate appreciation and positivity",
        category: "gratitude",
        icon: "🙏"
    },
];

export const breathingExercises = [
    {
        id: 1,
        name: "Box Breathing",
        duration: 4,
        description: "Inhale 4s, Hold 4s, Exhale 4s, Hold 4s",
        pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
        benefits: "Reduces stress and improves focus"
    },
    {
        id: 2,
        name: "4-7-8 Technique",
        duration: 5,
        description: "Inhale 4s, Hold 7s, Exhale 8s",
        pattern: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
        benefits: "Promotes relaxation and better sleep"
    },
    {
        id: 3,
        name: "Deep Belly Breathing",
        duration: 3,
        description: "Deep diaphragmatic breathing",
        pattern: { inhale: 4, hold1: 2, exhale: 6, hold2: 0 },
        benefits: "Activates parasympathetic nervous system"
    },
];

export const moodOptions = [
    { value: 5, label: "Excellent", emoji: "😊", color: "#4caf50" },
    { value: 4, label: "Good", emoji: "🙂", color: "#8bc34a" },
    { value: 3, label: "Okay", emoji: "😐", color: "#ffc107" },
    { value: 2, label: "Low", emoji: "😔", color: "#ff9800" },
    { value: 1, label: "Stressed", emoji: "😫", color: "#f44336" },
];
