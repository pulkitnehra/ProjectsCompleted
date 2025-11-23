import React from 'react';
import { Users, BedDouble, CalendarCheck, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard: React.FC = () => {
    // Mock data for the dashboard
    const stats = [
        { label: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign, color: 'from-blue-500 to-cyan-400' },
        { label: 'Occupancy Rate', value: '85%', change: '+5%', icon: BedDouble, color: 'from-purple-500 to-pink-500' },
        { label: 'Check-ins Today', value: '12', change: '-2', icon: CalendarCheck, color: 'from-amber-500 to-orange-400' },
        { label: 'Total Guests', value: '1,240', change: '+18%', icon: Users, color: 'from-emerald-500 to-teal-400' },
    ];

    const recentActivity = [
        { id: 1, user: 'John Doe', action: 'Checked in', room: '101', time: '2 mins ago', type: 'check-in' },
        { id: 2, user: 'Jane Smith', action: 'Booked a room', room: 'Suite 201', time: '15 mins ago', type: 'booking' },
        { id: 3, user: 'Mike Johnson', action: 'Checked out', room: '105', time: '1 hour ago', type: 'check-out' },
        { id: 4, user: 'Sarah Wilson', action: 'Requested cleaning', room: '103', time: '2 hours ago', type: 'service' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area (Placeholder for now) */}
                <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 min-h-[300px]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            Revenue Analytics
                        </h2>
                        <select className="bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 px-3 py-1 focus:outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                            <div key={i} className="w-full bg-slate-700/30 rounded-t-lg relative group h-full flex items-end">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-500 px-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex gap-4">
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 ring-4 ring-slate-900" />
                                    <div className="absolute top-4 left-1 w-px h-full bg-slate-800 -z-10" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-200">
                                        <span className="font-medium text-white">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">{activity.time} • Room {activity.room}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
