const calculateValidity = (startDate, monthsToAdd) => {
    // Parse the input date (format: DD-MM-YY or other formats)
    const date = new Date(startDate);

    // Add the desired number of months
    date.setMonth(date.getMonth() + monthsToAdd);

    // Handle edge cases for month overflow
    const originalDay = new Date(startDate).getDate();
    if (date.getDate() < originalDay) {
        date.setDate(0); // Move to the last day of the previous month
    }

    // Format the date as YYYY-MM-DD for saving
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    return `${day}-${month}-${year}`;

};




module.exports = { calculateValidity }