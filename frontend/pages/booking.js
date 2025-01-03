import { useState, useEffect } from 'react';

export default function BookingPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('/api/bookings')
            .then((res) => res.json())
            .then((data) => setBookings(data));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Bookings</h1>
            {bookings.map((booking) => (
                <div key={booking._id} className="border p-4 mb-4">
                    <p><strong>Name:</strong> {booking.name}</p>
                    <p><strong>Contact:</strong> {booking.contact}</p>
                    <p><strong>Date:</strong> {booking.date}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    <p><strong>Guests:</strong> {booking.guests}</p>
                </div>
            ))}
        </div>
    );
}
