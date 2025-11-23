import { supabase } from './supabase';
import { Booking, BookingStatus, Guest } from '../types';

export const bookingService = {
    async getAll() {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
        *,
        guests (*),
        rooms (*)
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Booking[];
    },

    async createBooking(booking: Partial<Booking>, guest: Partial<Guest>) {
        // 1. Create or Update Guest
        let guestId = guest.id;

        if (!guestId) {
            const { data: newGuest, error: guestError } = await supabase
                .from('guests')
                .insert(guest)
                .select()
                .single();

            if (guestError) throw guestError;
            guestId = newGuest.id;
        }

        // 2. Create Booking
        const { data: newBooking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
                ...booking,
                guest_id: guestId,
                status: 'confirmed'
            })
            .select()
            .single();

        if (bookingError) throw bookingError;

        // 3. Update Room Status if checking in immediately
        if (newBooking.status === 'checked_in') {
            await supabase
                .from('rooms')
                .update({ status: 'occupied' })
                .eq('id', newBooking.room_id);
        }

        return newBooking;
    },

    async checkIn(bookingId: string, roomId: string) {
        const { error: bookingError } = await supabase
            .from('bookings')
            .update({
                status: 'checked_in',
                checked_in_at: new Date().toISOString()
            })
            .eq('id', bookingId);

        if (bookingError) throw bookingError;

        const { error: roomError } = await supabase
            .from('rooms')
            .update({ status: 'occupied' })
            .eq('id', roomId);

        if (roomError) throw roomError;
    },

    async checkOut(bookingId: string, roomId: string) {
        const { error: bookingError } = await supabase
            .from('bookings')
            .update({
                status: 'checked_out',
                checked_out_at: new Date().toISOString()
            })
            .eq('id', bookingId);

        if (bookingError) throw bookingError;

        const { error: roomError } = await supabase
            .from('rooms')
            .update({ status: 'dirty' }) // Mark as dirty on checkout
            .eq('id', roomId);

        if (roomError) throw roomError;
    }
};
