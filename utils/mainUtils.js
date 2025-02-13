/**
 * Sender et succesrespons til klienten.
 *
 * @param {Object} res - Express response-objektet, som bruges til at sende svaret tilbage.
 * @param {any} data - De data, der skal sendes som svar (f.eks. en liste af byer eller en enkelt by).
 * @param {string} [message="Success"] - En valgfri besked, der beskriver svaret (default er "Success").
 * @param {number} [statusCode=200] - HTTP-statuskode for svaret (default er 200 OK).
 */
export const successResponse = (res, data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({ message, data });
};

/**
 * Sender et fejlrespons til klienten.
 *
 * @param {Object} res - Express response-objektet, som bruges til at sende svaret tilbage.
 * @param {string} [message="Internal Server Error"] - En valgfri fejlbesked, der beskriver fejlen (default er "Internal Server Error").
 * @param {number} [statusCode=500] - HTTP-statuskode for fejlen (default er 500 Internal Server Error).
 */
export const errorResponse = (res, message = "Internal Server Error", error = {}, statusCode = 500) => {
    let accError = { message: message }
    if (error.name === "SequelizeValidationError") {
        accError.sequlize_validation_errors = error.errors.map(err => ({
            field: err.path,
            message: err.message
        }));
    }
    res.status(statusCode).json(accError);
};