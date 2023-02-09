const bookingHistoryMapper = (bookings) => {
    let mappedBookings = bookings.map((b) => {
        return {
            "Name": b.customer?.name,
            "PhoneNumber": b.customer?.phoneNumber,
            "Email": b.customer?.email,
            "City": b.customerId?.cityName,
            "Pincode": b.customerId?.lastServiceAddress?.zipcode,
            "Booking Id": b.bookingId,
            "Service Category": b.serviceCategoryId?.name,
            "Service Date": b.serviceDate,
            "Is Cancelled": JSON.stringify(b.isCancelled),
            "Final Price": b.finalPrice,
            "Partner": b.serviceProviderName,
            "Coupon Code": b.coupon?.name,
            "Coupon Discount": "",
            "Address House No": b.customerId?.lastServiceAddress?.houseNo,
            "Address Landmark": b.customerId?.lastServiceAddress?.landmark
        }
    })
    return mappedBookings
}

module.exports = {
    bookingHistoryMapper
}