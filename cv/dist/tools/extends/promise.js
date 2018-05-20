var _this = this;
Promise.prototype.catchOnly = function (type, callback) {
    return _this.catch(function (err) {
        if (err instanceof type ||
            typeof err === "number" && type === Number ||
            typeof err === "string" && type === String)
            return callback(err);
        throw err;
    });
};
