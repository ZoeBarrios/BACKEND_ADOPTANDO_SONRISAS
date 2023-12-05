function responseHandler(req, res, next) {
  res.success = function (status = 200, data) {
    res.status(status).json({
      success: true,
      data,
    });
  };

  res.error = function (error_name, status = 500, message) {
    res.status(status).json({
      success: false,
      name: error_name,
      message: message,
    });
  };
  next();
}

export { responseHandler };
