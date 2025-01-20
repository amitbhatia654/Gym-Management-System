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

// to return in format 02-5-2025
const getCurrentDate = () => {
    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const [day1, month1, year1] = formattedDate.split('-');
    return new Date(`${year1}-${month1}-${day1}`);
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD for Date object
}





module.exports = { calculateValidity, getCurrentDate, parseDate }