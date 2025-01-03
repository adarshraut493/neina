import BookingForm from '../components/BookingForm';

export default function index() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Restaurant Table Booking</h1>
            <BookingForm />
        </div>
    );
}
