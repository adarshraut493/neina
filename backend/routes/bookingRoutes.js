const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

const timeSlots = [
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
];

router.get('/available-slots', async (req, res) => {
    const { date } = req.query;
    console.log('Received date:', date);  // Log the date received
    
    try {
        const bookings = await Booking.find({ date });
        const bookedSlots = bookings.map(booking => booking.time);
        const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
  
        res.json({ availableSlots });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Create booking
router.post('/create', async (req, res) => {
    try {
        const { name, contact, date, time, guests } = req.body;
        const existingBooking = await Booking.findOne({ date, time });

        if (existingBooking) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const booking = new Booking({ name, contact, date, time, guests });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
