import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        date: '',
        time: '',
        guests: 1,
    });

    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        if (formData.date) {
            fetch(`http://localhost:5000/api/bookings/available-slots?date=${formData.date}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
                    }
                    return res.json();
                })
                .then((data) => setAvailableSlots(data.availableSlots))
                .catch((err) => {
                    console.error('Error fetching available slots:', err);
                    toast.error(`Error: ${err.message}`, { position: 'top-center' });
                });
        }
    }, [formData.date]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/bookings/create', formData);
            toast.success('🎉 Booking Successful!', {
                position: 'top-center',
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
                theme: 'dark',
            });

            setFormData({
                name: '',
                contact: '',
                date: '',
                time: '',
                guests: 1,
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking failed! Please try again.', { position: 'top-center' });
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Restaurant Table Booking</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter your name"
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        placeholder="Enter your contact number"
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Time Slot</label>
                    <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    >
                        <option value="">Select Time Slot</option>
                        {availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-800 font-semibold mb-2">Number of Guests</label>
                    <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        min="1"
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required
                    />
                </div>

                <button type="submit" className="bg-red-500 text-white px-6 py-3 rounded w-full hover:bg-red-600">
                    Book Table
                </button>
            </form>

            <ToastContainer />
        </div>
    );
}
