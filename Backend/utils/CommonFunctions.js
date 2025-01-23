// const calculateValidity = (startDate, monthsToAdd) => {
//     // Parse the input date (format: DD-MM-YY or other formats)
//     const date = new Date(startDate);
//     // Add the desired number of months
//     date.setMonth(date.getMonth() + monthsToAdd);
//     console.log('-----convertinge', date)
//     return date;
// };

const calculateValidity = (startDate, monthsToAdd) => {
    // Parse the input date
    const date = new Date(startDate);

    // Add the desired number of months
    date.setMonth(date.getMonth() + monthsToAdd);

    // Convert the updated date to ISO 8601 format (UTC with Z)
    const validTill = date.toISOString();
    return validTill;
};



module.exports = { calculateValidity }