import { useRouter } from 'next/router';
export default function ConfirmationPage() {
    const router = useRouter();
    const { name, date, time, guests } = router.query;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
            <p>Thank you for your booking, {name}!</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Guests:</strong> {guests}</p>
        </div>
    );
}
