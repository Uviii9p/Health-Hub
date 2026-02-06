import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Plus,
    Pill,
    Stethoscope,
    Syringe,
    Clock,
    Trash2,
    Check,
    X,
    Calendar,
    Repeat
} from 'lucide-react';
import { useReminders } from '../hooks/useHealthData';
import './Reminders.css';

const reminderTypes = [
    { id: 'medicine', label: 'Medicine', icon: Pill, color: '#4caf50' },
    { id: 'appointment', label: 'Doctor Appointment', icon: Stethoscope, color: '#2196f3' },
    { id: 'vaccination', label: 'Vaccination', icon: Syringe, color: '#9c27b0' },
    { id: 'water', label: 'Water Reminder', icon: Clock, color: '#00bcd4' },
    { id: 'custom', label: 'Custom', icon: Bell, color: '#ff9800' },
];

export default function Reminders() {
    const { reminders, addReminder, deleteReminder, toggleComplete } = useReminders();
    const [showModal, setShowModal] = useState(false);
    const [newReminder, setNewReminder] = useState({
        type: 'medicine',
        title: '',
        description: '',
        time: '09:00',
        date: new Date().toISOString().split('T')[0],
        repeat: 'daily',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReminder.title.trim()) return;

        addReminder(newReminder);
        setShowModal(false);
        setNewReminder({
            type: 'medicine',
            title: '',
            description: '',
            time: '09:00',
            date: new Date().toISOString().split('T')[0],
            repeat: 'daily',
        });
    };

    const activeReminders = reminders.filter(r => !r.completed);
    const completedReminders = reminders.filter(r => r.completed);

    const getTypeInfo = (type) => reminderTypes.find(t => t.id === type) || reminderTypes[4];

    return (
        <div className="reminders-page">
            <div className="page-header">
                <div>
                    <h1>Reminders</h1>
                    <p>Never miss your medications and appointments</p>
                </div>
                <motion.button
                    className="add-reminder-btn"
                    onClick={() => setShowModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Plus size={20} />
                    Add Reminder
                </motion.button>
            </div>

            {/* Reminder Type Cards */}
            <div className="reminder-types">
                {reminderTypes.map((type) => {
                    const count = reminders.filter(r => r.type === type.id && !r.completed).length;
                    return (
                        <motion.div
                            key={type.id}
                            className="type-card"
                            style={{ '--accent-color': type.color }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="type-icon" style={{ background: `${type.color}20`, color: type.color }}>
                                <type.icon size={24} />
                            </div>
                            <span className="type-label">{type.label}</span>
                            <span className="type-count">{count} active</span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Active Reminders */}
            <section className="reminders-section">
                <h2>Active Reminders ({activeReminders.length})</h2>
                <div className="reminders-list">
                    <AnimatePresence>
                        {activeReminders.length === 0 ? (
                            <div className="empty-state">
                                <Bell size={48} className="empty-icon" />
                                <p>No active reminders</p>
                                <span>Add a reminder to get started</span>
                            </div>
                        ) : (
                            activeReminders.map((reminder) => {
                                const typeInfo = getTypeInfo(reminder.type);
                                return (
                                    <motion.div
                                        key={reminder.id}
                                        className="reminder-card"
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        style={{ '--accent-color': typeInfo.color }}
                                    >
                                        <div className="reminder-icon" style={{ background: `${typeInfo.color}20`, color: typeInfo.color }}>
                                            <typeInfo.icon size={20} />
                                        </div>
                                        <div className="reminder-content">
                                            <h4>{reminder.title}</h4>
                                            {reminder.description && <p>{reminder.description}</p>}
                                            <div className="reminder-meta">
                                                <span className="reminder-time">
                                                    <Clock size={14} />
                                                    {reminder.time}
                                                </span>
                                                <span className="reminder-date">
                                                    <Calendar size={14} />
                                                    {new Date(reminder.date).toLocaleDateString()}
                                                </span>
                                                {reminder.repeat !== 'none' && (
                                                    <span className="reminder-repeat">
                                                        <Repeat size={14} />
                                                        {reminder.repeat}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="reminder-actions">
                                            <button
                                                className="action-btn complete"
                                                onClick={() => toggleComplete(reminder.id)}
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                className="action-btn delete"
                                                onClick={() => deleteReminder(reminder.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Completed Reminders */}
            {completedReminders.length > 0 && (
                <section className="reminders-section completed-section">
                    <h2>Completed ({completedReminders.length})</h2>
                    <div className="reminders-list">
                        {completedReminders.slice(0, 5).map((reminder) => {
                            const typeInfo = getTypeInfo(reminder.type);
                            return (
                                <motion.div
                                    key={reminder.id}
                                    className="reminder-card completed"
                                    layout
                                >
                                    <div className="reminder-icon" style={{ background: `${typeInfo.color}10`, color: typeInfo.color }}>
                                        <typeInfo.icon size={20} />
                                    </div>
                                    <div className="reminder-content">
                                        <h4>{reminder.title}</h4>
                                        <span className="completed-badge">
                                            <Check size={12} />
                                            Completed
                                        </span>
                                    </div>
                                    <button
                                        className="action-btn"
                                        onClick={() => toggleComplete(reminder.id)}
                                    >
                                        <Repeat size={18} />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Add Reminder Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            className="modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Add New Reminder</h3>
                                <button className="close-modal" onClick={() => setShowModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="modal-form">
                                <div className="form-group">
                                    <label>Type</label>
                                    <div className="type-selector">
                                        {reminderTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                className={`type-option ${newReminder.type === type.id ? 'selected' : ''}`}
                                                onClick={() => setNewReminder(prev => ({ ...prev, type: type.id }))}
                                                style={{ '--type-color': type.color }}
                                            >
                                                <type.icon size={18} />
                                                <span>{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        placeholder="e.g., Take vitamin D"
                                        value={newReminder.title}
                                        onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description (optional)</label>
                                    <textarea
                                        id="description"
                                        placeholder="Add notes..."
                                        value={newReminder.description}
                                        onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                                        rows={2}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="time">Time</label>
                                        <input
                                            type="time"
                                            id="time"
                                            value={newReminder.time}
                                            onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            value={newReminder.date}
                                            onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="repeat">Repeat</label>
                                    <select
                                        id="repeat"
                                        value={newReminder.repeat}
                                        onChange={(e) => setNewReminder(prev => ({ ...prev, repeat: e.target.value }))}
                                    >
                                        <option value="none">Don't repeat</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        Add Reminder
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
