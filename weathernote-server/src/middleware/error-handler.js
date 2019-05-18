module.exports = function (err, req, res, next) {
    console.error(err);

    res.sendStatus(err.status ? err.status : 500);
    // next(err);
};
