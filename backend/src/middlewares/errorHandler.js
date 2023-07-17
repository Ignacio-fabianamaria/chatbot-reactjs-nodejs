const errorHandler = (err, req, res, next) => {
  console.error(err); 

  
  let statusCode = 500;
  if (err instanceof SyntaxError) {
    statusCode = 400; 
  } else if (err instanceof NotFoundError) {
    statusCode = 404; // Not Found
  }

  
  res.status(statusCode).json({ error: err.message });
};

module.exports = errorHandler;
