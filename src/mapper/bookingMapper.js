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
            "Address": JSON.stringify(b.customerId?.lastServiceAddress?.houseNo) + b.customerId?.lastServiceAddress?.landmark,
        }
    })
    return mappedBookings
}

module.exports = {
    bookingHistoryMapper
}