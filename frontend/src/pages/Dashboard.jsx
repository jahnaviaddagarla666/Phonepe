import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getBalance, addMoney, sendMoney, getHistory } from '../services/api';

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

export default function Dashboard({ user }) {
    const [balance, setBalance] = useState(0);
    const [history, setHistory] = useState([]);
    const [addAmount, setAddAmount] = useState('');
    const [sendForm, setSendForm] = useState({ receiverUpi: '', amount: '' });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('[Dashboard] Mounted with user:', user);

        if (!user?.upiId) {
            console.error('[Dashboard] No valid user data, redirecting to login');
            navigate('/login', { replace: true });
            return;
        }

        loadData();
    }, [user?.upiId, navigate]);

    const loadData = async () => {
        setLoading(true);
        try {
            console.log('[Dashboard] Loading data for UPI:', user.upiId);
            const [balRes, histRes] = await Promise.all([
                getBalance(user.upiId),
                getHistory(user.upiId)
            ]);

            console.log('[Dashboard] Balance response:', balRes.data);
            console.log('[Dashboard] History response:', histRes.data);

            const balanceAmount = balRes.data?.data?.balance;
            const historyData = histRes.data?.data || [];

            setBalance(typeof balanceAmount === 'number' ? balanceAmount : 0);
            setHistory(Array.isArray(historyData) ? historyData : []);

            console.log('[Dashboard] Data loaded successfully');
        } catch (err) {
            console.error('[Dashboard] Error loading data:', err);
            const errorMsg = err.response?.data?.message || 'Failed to load wallet data';
            setMessage({ text: errorMsg, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    const handleAddMoney = async (e) => {
        e.preventDefault();
        if (addAmount <= 0) return showMessage('Enter valid amount', 'error');
        setLoading(true);
        try {
            await addMoney({ upiId: user.upiId, amount: Number(addAmount) });
            showMessage('Money added successfully! 💰');
            setAddAmount('');
            loadData();
        } catch (err) {
            showMessage(err.response?.data?.message || 'Failed to add money', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSendMoney = async (e) => {
        e.preventDefault();
        if (!sendForm.receiverUpi || sendForm.amount <= 0) {
            return showMessage('Fill all fields correctly', 'error');
        }
        setLoading(true);
        try {
            await sendMoney({
                senderUpi: user.upiId,
                receiverUpi: sendForm.receiverUpi,
                amount: Number(sendForm.amount),
            });
            showMessage('Money sent successfully! ✅');
            setSendForm({ receiverUpi: '', amount: '' });
            loadData();
        } catch (err) {
            showMessage(err.response?.data?.message || 'Transaction failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        console.log('[Dashboard] Logout clicked');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 100);
    };

    if (loading && balance === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-phonepe to-phonepe-light flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        >
            {/* Animated Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, -100, 0],
                        y: [0, 50, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 -left-32 w-80 h-80 bg-phonepe/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 100, 0],
                        y: [0, -50, 50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-32 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="glass-dark border-b border-gray-700 sticky top-0 z-50"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white">PhonePe</h1>
                                <p className="text-sm text-gray-400">Wallet</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="btn-danger text-sm px-4 py-2"
                        >
                            Logout
                        </motion.button>
                    </div>
                </motion.header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl font-bold text-white mb-2">
                            Welcome back, <span className="gradient-text">{user.name}</span>
                        </h2>
                        <p className="text-gray-400 flex items-center gap-2">
                            <span>🏦</span> {user.upiId}
                        </p>
                    </motion.div>

                    {/* Message Toast */}
                    <AnimatePresence>
                        {message.text && (
                            <motion.div
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -100, opacity: 0 }}
                                className={`fixed top-4 right-4 rounded-lg shadow-lg z-50 p-4 flex items-center gap-3 max-w-md ${message.type === 'error'
                                    ? 'bg-red-500/90 text-white border border-red-400'
                                    : 'bg-green-500/90 text-white border border-green-400'
                                    }`}
                            >
                                <span>{message.type === 'error' ? '❌' : '✅'}</span>
                                {message.text}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Balance Card */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-8"
                    >
                        <div className="card-dark rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-phonepe/20 to-blue-500/20 opacity-50" />
                            <div className="relative z-10">
                                <p className="text-gray-400 text-sm font-medium mb-2">Available Balance</p>
                                <motion.div
                                    key={balance}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 className="text-6xl font-bold text-white mb-2">
                                        ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </h3>
                                </motion.div>
                                <p className="text-gray-400 text-sm">Ready to spend</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tab Navigation */}
                    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
                        <div className="flex gap-4 border-b border-gray-700">
                            {['overview', 'transactions'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 font-semibold transition-all relative capitalize ${activeTab === tab
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {tab === 'overview' ? '💼 Overview' : '📊 Transactions'}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-phonepe to-blue-500"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Add Money */}
                                    <motion.div variants={itemVariants} className="card-dark rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                                <span className="text-xl">💰</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">Add Money</h3>
                                        </div>
                                        <form onSubmit={handleAddMoney} className="space-y-4">
                                            <input
                                                type="number"
                                                value={addAmount}
                                                onChange={(e) => setAddAmount(e.target.value)}
                                                placeholder="Enter amount"
                                                min="1"
                                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={loading || !addAmount}
                                                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                                            >
                                                Add Money
                                            </motion.button>
                                        </form>
                                    </motion.div>

                                    {/* Send Money */}
                                    <motion.div variants={itemVariants} className="card-dark rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                <span className="text-xl">📤</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">Send Money</h3>
                                        </div>
                                        <form onSubmit={handleSendMoney} className="space-y-4">
                                            <input
                                                placeholder="Receiver UPI ID"
                                                value={sendForm.receiverUpi}
                                                onChange={(e) => setSendForm({ ...sendForm, receiverUpi: e.target.value })}
                                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                min="1"
                                                value={sendForm.amount}
                                                onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={loading || !sendForm.receiverUpi || !sendForm.amount}
                                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                                            >
                                                Send Now
                                            </motion.button>
                                        </form>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'transactions' && (
                            <motion.div
                                key="transactions"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div variants={itemVariants} className="card-dark rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <span>📜</span> Recent Transactions
                                    </h3>
                                    <AnimatePresence>
                                        {history.length === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-12 text-gray-400"
                                            >
                                                <p className="text-lg">No transactions yet</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                className="space-y-3 max-h-96 overflow-y-auto"
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.05,
                                                        },
                                                    },
                                                }}
                                            >
                                                {history.map((tx) => (
                                                    <motion.div
                                                        key={tx.id || Math.random()}
                                                        variants={{
                                                            hidden: { opacity: 0, x: -20 },
                                                            visible: { opacity: 1, x: 0 },
                                                        }}
                                                        whileHover={{ scale: 1.01 }}
                                                        className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-phonepe/50 transition"
                                                    >
                                                        <div className="flex items-center gap-4 flex-1">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.senderUpi === user.upiId
                                                                ? 'bg-red-500/20'
                                                                : 'bg-green-500/20'
                                                                }`}>
                                                                {tx.senderUpi === user.upiId ? '📤' : '📥'}
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-medium">
                                                                    {tx.senderUpi === user.upiId ? 'Sent to' : 'Received from'}
                                                                </p>
                                                                <p className="text-sm text-gray-400">
                                                                    {tx.senderUpi === user.upiId ? tx.receiverUpi : tx.senderUpi}
                                                                </p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {new Date(tx.date).toLocaleString('en-IN', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`text-lg font-bold ${tx.senderUpi === user.upiId
                                                                ? 'text-red-400'
                                                                : 'text-green-400'
                                                                }`}
                                                        >
                                                            {tx.senderUpi === user.upiId ? '-' : '+'}
                                                            {' '}
                                                            ₹{tx.amount.toLocaleString('en-IN')}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}