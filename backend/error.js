class ExpressError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
      super(message, 401);
    }
  }
  
  /** 400 BAD REQUEST error. */
  
  class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
      super(message, 400);
    }
  }
  
  /** 403 BAD REQUEST error. */
  
  class ForbiddenError extends ExpressError {
    constructor(message = "Bad Request") {
      super(message, 403);
    }
  }
  
  module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
  };