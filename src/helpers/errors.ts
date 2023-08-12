export class ApiError extends Error {
   public readonly statusCode: number = 0;

   constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
   }
}

export class BadRequestError extends ApiError {
   constructor(message: string) {
      super(message, 400);
   }
}

export class UnauthorizedRequestError extends ApiError {
   constructor(message: string) {
      super(message, 401);
   }
}
export class ForbiddenRequestError extends ApiError {
   constructor(message: string) {
      super(message, 403);
   }
}

export class NotFoundRequestError extends ApiError {
   constructor(message: string) {
      super(message, 404);
   }
}

export class ConflictRequestError extends ApiError {
   constructor(message: string) {
      super(message, 409);
   }
}

export class InternalServerError extends ApiError {
   constructor(message: string) {
      super(message, 500);
   }
}

export class YupValidattionError extends ApiError {
   constructor(message: string) {
      super(message, 500);
   }
}
