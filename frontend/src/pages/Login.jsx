import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../services/api';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100 },
    },
};

export default function Login() {
    const [form, setForm] = useState({ phoneNumber: '', pin: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('[Login] Submitting login with:', form);

        try {
            const res = await login(form);
            console.log('[Login] Response:', res.data);

            if (res?.data?.success === true && res?.data?.data) {
                console.log('[Login] Login successful');
                const userData = res.data.data;

                localStorage.setItem('user', JSON.stringify(userData));
                console.log('[Login] User stored in localStorage');

                const saved = JSON.parse(localStorage.getItem('user'));
                console.log('[Login] Verified stored data:', saved);

                window.dispatchEvent(new Event('authChange'));
                console.log('[Login] Auth change event dispatched');

                setTimeout(() => {
                    console.log('[Login] Navigating to dashboard');
                    navigate('/dashboard', { replace: true });
                }, 150);
            } else {
                const errorMsg = res?.data?.message || 'Login failed';
                console.error('[Login] Server returned error:', errorMsg);
                setError(errorMsg);
            }
        } catch (err) {
            console.error('[Login] Catch block error:', err);
            const msg =
                err.response?.data?.message ||
                err.message ||
                'Could not connect to server. Is backend running?';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="centered-container relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
            {/* Animated Background Glows */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 30, -30, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-40 -left-40 w-96 h-96 bg-phonepe/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -50, 50, 0],
                    y: [0, -30, 30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-40 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="card-container relative z-10"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="inline-block mb-4"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="w-20 h-20 mx-auto bg-gradient-to-br from-phonepe to-phonepe-light rounded-3xl flex items-center justify-center shadow-2xl"
                        >
                            <div className="text-4xl">💳</div>
                        </motion.div>
                    </motion.div>
                    <h1 className="text-5xl font-black gradient-text mb-3">PhonePe</h1>
                    <p className="text-white/70 text-lg font-medium">Digital Wallet & Payments</p>
                </motion.div>

                {/* Card */}
                <motion.div variants={itemVariants} className="card-dark rounded-3xl p-8 shadow-2xl border border-phonepe/20">
                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, x: -20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ type: 'spring', stiffness: 120 }}
                            className="mb-6 rounded-2xl bg-red-500/20 p-4 border-l-4 border-red-500 text-sm text-red-300 font-medium backdrop-blur"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl flex-shrink-0">❌</span>
                                <div>
                                    <p className="font-semibold">Login Error</p>
                                    <p className="text-red-200/80">{error}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Phone Number Input */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                                <span>📱</span> Phone Number
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                autoComplete="tel"
                                required
                                value={form.phoneNumber}
                                onChange={handleChange}
                                className="input-modern w-full text-gray-900"
                                placeholder="9876543210"
                            />
                        </motion.div>

                        {/* PIN Input */}
                        <motion.div variants={itemVariants}>
                            <label htmlFor="pin" className="block text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                                <span>🔐</span> Security PIN (4-6 digits)
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                id="pin"
                                name="pin"
                                type="password"
                                autoComplete="current-password"
                                required
                                maxLength={6}
                                value={form.pin}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-phonepe focus:bg-white/15 focus:border-phonepe/50 transition-all duration-300"
                                placeholder="••••••"
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full mt-8 bg-gradient-to-r from-phonepe to-phonepe-light hover:from-phonepe-dark hover:to-phonepe text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-60 relative overflow-hidden group shadow-lg"
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {loading ? (
                                <>
                                    <div className="spinner inline-block mr-2"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-lg">Sign in</span>
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                                        →
                                    </motion.span>
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <motion.div variants={itemVariants} className="my-8 flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-sm text-white/50 font-medium">or</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </motion.div>

                    {/* Register Link */}
                    <motion.div variants={itemVariants} className="text-center">
                        <p className="text-white/70 text-sm">
                            Don't have an account?{' '}
                            <motion.a
                                href="/register"
                                whileHover={{ scale: 1.08, color: '#7e57c2' }}
                                whileTap={{ scale: 0.95 }}
                                className="font-bold gradient-text hover:underline cursor-pointer inline-block transition-all"
                            >
                                Sign up here
                            </motion.a>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.p variants={itemVariants} className="text-center text-xs text-white/60 mt-10 font-medium">
                    🔒 Your transactions are secured with 256-bit encryption
                </motion.p>
            </motion.div>
        </div>
    );
}