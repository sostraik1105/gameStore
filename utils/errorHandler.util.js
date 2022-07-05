const errorHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).cathc(err => next(err));
    };
};

module.exports = { errorHandler };
