import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function BookingsContent() {
  const [groupedBookings, setGroupedBookings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://travel-tour-mlya.onrender.com/api/admin/bookings"
        );
        const bookings = response.data.bookings;
        console.log("All Bookings:", bookings);

        // Group bookings by user
        const grouped = bookings.reduce((acc, booking) => {
          const userId = booking.user._id;
          if (!acc[userId]) {
            acc[userId] = {
              user: booking.user,
              bookings: [],
            };
          }
          acc[userId].bookings.push(booking);
          return acc;
        }, {});

        console.log("Grouped Bookings:", grouped);
        setGroupedBookings(grouped);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading bookings, please wait...
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Bookings
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peoples
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(groupedBookings).length > 0 ? (
              Object.values(groupedBookings).map((userGroup) => (
                <UserBookingGroup
                  key={userGroup.user._id}
                  user={userGroup.user}
                  bookings={userGroup.bookings}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No Bookings Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserBookingGroup({ user, bookings }) {
  return (
    <>
      <tr>
        <td className="px-6 py-4 font-bold text-gray-900" colSpan="7">
          {user.firstName} {user.lastName}
        </td>
      </tr>
      {bookings.map((booking) => (
        <BookingRow
          key={booking._id}
          id={booking._id}
          peoples={booking.numberOfPeople}
          cost={booking.totalPrice}
          destination={booking.destination.name}
          date={booking.bookingDate}
          status="Confirmed" // Adjust if needed
        />
      ))}
    </>
  );
}

function BookingRow({ id, destination, date, status, peoples, cost }) {
  const statusStyles = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Default: "bg-gray-100 text-gray-800",
  };
  const statusClass = statusStyles[status] || statusStyles.Default;

  // Format the date to MM-DD-YYYY
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <tr>
      <td className="px-6 py-4"></td>{" "}
      {/* Empty cell to align rows under the user */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{destination}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{peoples}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">₹ {cost}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

UserBookingGroup.propTypes = {
  user: PropTypes.object,
  bookings: PropTypes.arrayOf(PropTypes.object),
};

BookingRow.propTypes = {
  id: PropTypes.string,
  destination: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  peoples: PropTypes.number,
  cost: PropTypes.number,
};
