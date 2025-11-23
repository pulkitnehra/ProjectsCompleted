export type Role = 'admin' | 'receptionist' | 'manager' | 'housekeeping';

export interface Staff {
    id: string;
    created_at: string;
    name: string;
    role: Role;
    email: string;
    phone?: string;
    is_active: boolean;
}

export type RoomStatus = 'available' | 'occupied' | 'dirty' | 'maintenance';
export type RoomType = 'Single' | 'Double' | 'Suite';

export interface Room {
    id: string;
    created_at: string;
    room_number: string;
    type: RoomType;
    price_per_night: number;
    status: RoomStatus;
    description?: string;
}

export interface Guest {
    id: string;
    created_at: string;
    full_name: string;
    email?: string;
    phone?: string;
    id_proof_type?: string;
    id_proof_number?: string;
    address?: string;
    notes?: string;
}

export type BookingStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

export interface Booking {
    id: string;
    created_at: string;
    guest_id: string;
    room_id: string;
    check_in_date: string;
    check_out_date: string;
    status: BookingStatus;
    total_amount: number;
    paid_amount: number;
    checked_in_at?: string;
    checked_out_at?: string;

    // Joins
    guests?: Guest;
    rooms?: Room;
}
