
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
// Added ArrowRight to the imports from lucide-react
import { Users, Calendar, Newspaper, Heart, TrendingUp, ArrowUpRight, DollarSign, Activity, ArrowRight } from 'lucide-react';

const data = [
  { name: 'Jan', donations: 4000, visits: 2400 },
  { name: 'Feb', donations: 3000, visits: 1398 },
  { name: 'Mar', donations: 2000, visits: 9800 },
  { name: 'Apr', donations: 2780, visits: 3908 },
  { name: 'May', donations: 1890, visits: 4800 },
  { name: 'Jun', donations: 2390, visits: 3800 },
];

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Players', value: '42', icon: Users, color: 'bg-blue-600', growth: '+12%' },
    { label: 'Matches Played', value: '18', icon: Activity, color: 'bg-indigo-600', growth: '+2%' },
    { label: 'News Posts', value: '156', icon: Newspaper, color: 'bg-violet-600', growth: '+8%' },
    { label: 'Donations (INR)', value: '₹4.2L', icon: DollarSign, color: 'bg-rose-600', growth: '+24%' },
  ];

  return (
    <div className="p-10 bg-gray-50/50 min-h-screen font-sans">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Club Console</h1>
          <p className="text-slate-500 font-medium">Real-time control center for Narmada Valley Football Club.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
             <Calendar className="w-4 h-4" /> Manage Fixtures
           </button>
           <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
             Create News Post
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="flex items-center text-sm font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">
                {stat.growth} <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase italic">Donation Analytics</h3>
            <div className="flex gap-2">
               <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold">W</button>
               <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">M</button>
               <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold">Y</button>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'}} 
                />
                <Area type="monotone" dataKey="donations" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorDon)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-slate-300 text-white relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-white text-xl tracking-tight uppercase italic">Store Performance</h3>
              <TrendingUp className="text-nv-yellow h-6 w-6" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
               <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Total Sales (MTD)</p>
               <h4 className="text-5xl font-black mb-8">₹1.85L</h4>
               <div className="space-y-6">
                  {[
                    { label: 'Home Jersey', val: 78, color: 'bg-nv-yellow' },
                    { label: 'Away Kit', val: 42, color: 'bg-blue-400' },
                    { label: 'Scarf', val: 95, color: 'bg-emerald-400' },
                  ].map((item, idx) => (
                    <div key={idx}>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                          <span>{item.label}</span>
                          <span>{item.val}% Stock</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <button className="mt-12 w-full bg-white text-slate-900 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-nv-yellow transition-all">
               Inventory Management
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Recent Feed */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-black text-slate-900 uppercase tracking-tighter text-xl italic">Recent Transactions</h3>
          <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 text-left text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
              <tr>
                <th className="px-8 py-6">Reference</th>
                <th className="px-8 py-6">Member Name</th>
                <th className="px-8 py-6">Purpose</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Timestamp</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {[
                { id: 'TXN-9021', name: 'Amit Sharma', purpose: 'Donation (Academy)', amount: '₹5,000', time: '2 mins ago', status: 'verified' },
                { id: 'TXN-9020', name: 'Priya Verma', purpose: 'Home Jersey Purchase', amount: '₹1,499', time: '1 hour ago', status: 'pending' },
                { id: 'TXN-9019', name: 'Rahul K.', purpose: 'Match Ticket (Bengaluru FC)', amount: '₹450', time: '3 hours ago', status: 'verified' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6 font-mono text-xs text-slate-400">{row.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-500 uppercase">{row.name.charAt(0)}</div>
                       <span className="font-bold text-slate-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-medium">{row.purpose}</td>
                  <td className="px-8 py-6 font-black text-slate-900">{row.amount}</td>
                  <td className="px-8 py-6 text-slate-400 font-bold text-xs">{row.time}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                       <ArrowRight className="h-4 w-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
