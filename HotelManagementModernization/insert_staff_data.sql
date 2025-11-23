-- Insert a dummy Admin user
INSERT INTO public.staff (name, role, email, phone, is_active)
VALUES 
('Admin User', 'admin', 'admin@hotel.com', '123-456-7890', true),
('Reception Staff', 'receptionist', 'reception@hotel.com', '098-765-4321', true);
