function responseHandler(req, res, next) {
  res.success = function (status = 200, data) {
    res.status(status).json({
      success: true,
      data,
    });
  };

  res.error = function (status = 500, message) {
    res.status(status).json({
      success: false,
      message,
    });
  };
  next();
}

export { responseHandler };
