import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Guest } from '../types';
import { Search, Mail, Phone, User } from 'lucide-react';

const Guests: React.FC = () => {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGuests();
    }, []);

    const loadGuests = async () => {
        try {
            const { data, error } = await supabase
                .from('guests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setGuests(data as Guest[]);
        } catch (error) {
            console.error('Failed to load guests:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Guests</h1>
                    <p className="text-slate-400">Directory of all registered guests</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guests.map((guest) => (
                    <div key={guest.id} className="bg-slate-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold text-white">
                                {guest.full_name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white truncate">{guest.full_name}</h3>
                                <div className="mt-2 space-y-1">
                                    {guest.email && (
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Mail className="w-3 h-3" />
                                            <span className="truncate">{guest.email}</span>
                                        </div>
                                    )}
                                    {guest.phone && (
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Phone className="w-3 h-3" />
                                            <span>{guest.phone}</span>
                                        </div>
                                    )}
                                    {guest.id_proof_number && (
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <User className="w-3 h-3" />
                                            <span className="truncate">{guest.id_proof_type}: {guest.id_proof_number}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Guests;
