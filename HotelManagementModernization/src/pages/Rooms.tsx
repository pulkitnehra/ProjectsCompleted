import React, { useEffect, useState } from 'react';
import { roomService } from '../services/roomService';
import { Room, RoomStatus } from '../types';
import { Plus, Search, Filter, MoreVertical, BedDouble } from 'lucide-react';

const Rooms: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<RoomStatus | 'all'>('all');

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const data = await roomService.getAll();
            setRooms(data);
        } catch (error) {
            console.error('Failed to load rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: RoomStatus) => {
        switch (status) {
            case 'available': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'occupied': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            case 'dirty': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'maintenance': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const filteredRooms = filter === 'all'
        ? rooms
        : rooms.filter(r => r.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Room Management</h1>
                    <p className="text-slate-400">Manage hotel rooms and their status</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add Room</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-white/5">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="bg-slate-900 border border-slate-700 rounded-lg text-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="dirty">Dirty</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
            </div>

            {/* Room Grid */}
            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading rooms...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRooms.map((room) => (
                        <div key={room.id} className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                                    <BedDouble className="w-6 h-6" />
                                </div>
                                <button className="text-slate-500 hover:text-white">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-white">Room {room.room_number}</h3>
                                <p className="text-sm text-slate-400">{room.type}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(room.status)} capitalize`}>
                                    {room.status}
                                </span>
                                <span className="text-slate-300 font-medium">
                                    ${room.price_per_night}
                                    <span className="text-slate-500 text-xs font-normal">/night</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rooms;
