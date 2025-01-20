const calculateValidity = (startDate, monthsToAdd) => {
    // Parse the input date (format: DD-MM-YY or other formats)
    const date = new Date(startDate);
    // Add the desired number of months
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
};



module.exports = { calculateValidity }