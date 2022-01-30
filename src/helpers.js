exports.formatResponse = (records = null, code = 0, msg = "Success") => {
    return {
        code: code,
        msg: msg,
        records: records
    }
}