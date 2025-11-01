import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { month: 'Jan', users: 500 },
  { month: 'Feb', users: 1200 },
  { month: 'Mar', users: 2500 },
  { month: 'Apr', users: 4600 },
  { month: 'May', users: 7800 },
];

const HappyUsersChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative bg-gradient-to-br from-[#0f051d] via-[#200f38] to-[#120a2a] rounded-3xl shadow-[0_0_40px_rgba(138,43,226,0.4)] p-8 my-12 max-w-5xl mx-auto overflow-hidden border border-purple-700/40"
    >
      {/* Soft glowing overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(138,43,226,0.6),transparent_50%)]" />

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          🚀 Our Growth Journey
        </h2>
        <p className="text-gray-300 mt-2 text-lg">
          Join <span className="text-purple-400 font-semibold">thousands of happy users</span> who trust{' '}
          <span className="text-pink-400 font-bold">MsTechHive</span> every month!
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid stroke="#3f2b6b" strokeDasharray="4 4" opacity={0.4} />
          <XAxis
            dataKey="month"
            stroke="#e2e8f0"
            tick={{ fill: '#e2e8f0', fontSize: 14 }}
          />
          <YAxis
            stroke="#e2e8f0"
            tick={{ fill: '#e2e8f0', fontSize: 14 }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(30, 41, 59, 0.9)',
              border: '1px solid #a855f7',
              borderRadius: '12px',
              color: '#fff',
              boxShadow: '0 0 12px rgba(168,85,247,0.4)',
            }}
            labelStyle={{ color: '#a855f7', fontWeight: 'bold' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#a855f7"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorUsers)"
            filter="url(#glow)"
            activeDot={{
              r: 10,
              stroke: '#fff',
              strokeWidth: 3,
              fill: '#a855f7',
              boxShadow: '0 0 12px #a855f7',
            }}
            dot={{ r: 5, fill: '#a855f7', stroke: '#fff', strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Floating glow circle */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
    </motion.div>
  );
};

export default HappyUsersChart;
