const handleErrors = (err) => {
    console.log("err", err.message, 'code', err.code);
    const errors = { err: 'Bad Request', message: err.message };
    if (err.code === 11000) {
        errors[Object.keys(err.keyValue)[0]] = `${Object.keys(err.keyValue)[0]} is not available`;
    }

    if (err.message.includes('user validation failed')) {
        if (Object.values(err.errors).length > 0) {
            Object.values(err.errors).forEach(({ path, message }) => errors[path] = message);
        }
    }
    return errors;
}

module.exports = handleErrors