declare global {
  namespace Express {
    interface Request {
      user?: {id: string , roles: string[]} // replace with actual type of user object
    }
  }
}

export {};