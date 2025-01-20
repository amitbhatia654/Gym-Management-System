export const formatDateToInput = (inputDate) => {

    return new Date(inputDate).toISOString().split("T")[0]
};

export const formatDateToDisplay = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-GB").split('/').join('-');
    return formattedDate

};
