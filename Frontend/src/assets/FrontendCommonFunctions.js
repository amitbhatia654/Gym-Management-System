export const formatDateToInput = (date) => {
    // Convert DD-MM-YY to YYYY-MM-DD
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`; // Assuming "YY" represents years after 2000
};

export const formatDateToDisplay = (date) => {
    // Convert YYYY-MM-DD to DD-MM-YY
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year.slice(-2)}`;
};
