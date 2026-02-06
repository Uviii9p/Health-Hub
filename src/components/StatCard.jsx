import { motion } from 'framer-motion';
import './StatCard.css';

export default function StatCard({
    title,
    value,
    unit,
    icon: Icon,
    color = 'green',
    target,
    current
}) {
    const percentage = target && current ? Math.min(Math.round((current / target) * 100), 100) : 0;

    return (
        <motion.div
            className={`stat-card ${color}`}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.15 }}
        >
            <div className="stat-card-inner">
                <div className="stat-header">
                    <motion.div
                        className="stat-icon"
                        whileHover={{ rotate: -10, scale: 1.1 }}
                    >
                        <Icon size={24} />
                    </motion.div>
                    <span className="stat-title">{title}</span>
                </div>

                <div className="stat-content">
                    <div className="stat-value-wrapper">
                        <motion.span
                            className="stat-value"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={value}
                        >
                            {value}
                        </motion.span>
                        <span className="stat-unit">{unit}</span>
                    </div>

                    {target && (
                        <span className="stat-target">of {target.toLocaleString()} goal</span>
                    )}
                </div>

                {target && current && (
                    <div className="stat-progress">
                        <div className="progress-bar-bg">
                            <motion.div
                                className="progress-bar-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                        </div>
                        <span className="progress-label">{percentage}%</span>
                    </div>
                )}
            </div>

            {/* Decorative elements */}
            <div className="stat-decoration">
                <div className="deco-circle-1"></div>
                <div className="deco-circle-2"></div>
            </div>
        </motion.div>
    );
}
