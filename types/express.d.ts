import 'express';

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      role: string;
      testUser: boolean;
    }

    interface Request {
      user: UserPayload;
    }
  }
}

export {};
