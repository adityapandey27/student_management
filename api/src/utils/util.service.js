

module.exports.ReE = async function (res, err, code) {
    if (typeof err == "object" && typeof err.message != "undefined") {
        err = err.message;
    }
    if (typeof code !== "undefined") res.statusCode = code;
    return res.json({ success: false, message: err });
};

module.exports.ReS =async function (res, msg, data) {
    let send_data = { success: true, message: msg, response: data };
    res.statusCode = 200;
   
    return res.json(send_data);
};

