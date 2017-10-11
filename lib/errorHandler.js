// wrote this as a bonus for lab 2

let errorSeverity = {
    EvalError: 1,
    RangeError: 1,
    ReferenceError: 2,
    SyntaxError: 1,
    TypeError: 1,
    URIError: 2,
};

let lightError = (err) => {
    return {
        timestamp: new Date(),
        message: err.message,
        file: err.file,
        position: err.column,
        name: err.name,
        severity: errorSeverity[err.name],
    };
};

let heavyError = () => {
    return {
        devMessage: 'You really goofed this time',
        timestamp: new Date(),
        message: err.message,
        file: err.file,
        position: err.column,
        name: err.name,
        severity: errorSeverity[err.name],
    };
};


module.exports = (err) =>  {
    return (errorSeverity[err.name] > 1) ? lightError(err) : heavyError(err);
};