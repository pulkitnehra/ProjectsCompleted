import { supabase } from './supabase';
import { Room, RoomStatus, RoomType } from '../types';

export const roomService = {
    async getAll() {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .order('room_number', { ascending: true });

        if (error) throw error;
        return data as Room[];
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Room;
    },

    async create(room: Omit<Room, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('rooms')
            .insert(room)
            .select()
            .single();

        if (error) throw error;
        return data as Room;
    },

    async update(id: string, updates: Partial<Room>) {
        const { data, error } = await supabase
            .from('rooms')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Room;
    },

    async updateStatus(id: string, status: RoomStatus) {
        return this.update(id, { status });
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('rooms')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
