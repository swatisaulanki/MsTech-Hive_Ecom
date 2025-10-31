import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', users: 500 },
  { month: 'Feb', users: 1200 },
  { month: 'Mar', users: 2500 },
  { month: 'Apr', users: 4600 },
  { month: 'May', users: 7800 },
];

const HappyUsersChart = () => {
  return (
    <div className="relative bg-gradient-to-br text-white from-[#351b45] to-[#091c25] rounded-2xl shadow-2xl p-8 my-12 max-w-4xl mx-auto overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]" />

      <h2 className="text-2xl md:text-4xl font-bold text-center text-purple-300 mb-2">
        🚀 Our Growth Journey
      </h2>
      <p className="text-center text-white mb-6">
        Join thousands of happy users who trust MsTechHive  every month!
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8a2be2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8a2be2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#8a2be2', color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8a2be2"
            strokeWidth={3}
            fill="url(#colorUsers)"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HappyUsersChart;
