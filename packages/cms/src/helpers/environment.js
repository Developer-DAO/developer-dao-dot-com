const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

module.exports = {
  isDevelopment,
};
