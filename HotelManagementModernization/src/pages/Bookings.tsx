import React, { useEffect, useState } from 'react';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';
import { Plus, Search, Calendar, CheckCircle, LogOut } from 'lucide-react';
import { format } from 'date-fns';

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const data = await bookingService.getAll();
            setBookings(data);
        } catch (error) {
            console.error('Failed to load bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async (booking: Booking) => {
        if (!confirm('Confirm Check-in?')) return;
        try {
            await bookingService.checkIn(booking.id, booking.room_id);
            loadBookings();
        } catch (error) {
            console.error('Check-in failed:', error);
        }
    };

    const handleCheckOut = async (booking: Booking) => {
        if (!confirm('Confirm Check-out?')) return;
        try {
            await bookingService.checkOut(booking.id, booking.room_id);
            loadBookings();
        } catch (error) {
            console.error('Check-out failed:', error);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            checked_in: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            checked_out: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
            cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${styles[status as keyof typeof styles]}`}>
                {status.replace('_', ' ')}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Bookings</h1>
                    <p className="text-slate-400">Manage reservations and guest stays</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>New Booking</span>
                </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900/50 text-slate-400 font-medium">
                            <tr>
                                <th className="px-6 py-4">Guest</th>
                                <th className="px-6 py-4">Room</th>
                                <th className="px-6 py-4">Dates</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{booking.guests?.full_name}</div>
                                        <div className="text-xs text-slate-500">{booking.guests?.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono bg-slate-700 px-2 py-1 rounded text-xs">
                                                {booking.rooms?.room_number}
                                            </span>
                                            <span className="text-slate-400 text-xs">{booking.rooms?.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-slate-500" />
                                            {format(new Date(booking.check_in_date), 'MMM d')} - {format(new Date(booking.check_out_date), 'MMM d, yyyy')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(booking.status)}
                                    </td>
                                    <td className="px-6 py-4 text-white font-medium">
                                        ${booking.total_amount}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() => handleCheckIn(booking)}
                                                    className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                                                    title="Check In"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            {booking.status === 'checked_in' && (
                                                <button
                                                    onClick={() => handleCheckOut(booking)}
                                                    className="p-2 hover:bg-amber-500/20 text-amber-400 rounded-lg transition-colors"
                                                    title="Check Out"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
