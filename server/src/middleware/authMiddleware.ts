import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const decoded = jwt.decode(token) as DecodedToken;

      if (!decoded) {
        res.status(400).json({ message: "Invalid token" });
        return;
      }

      const userRole = decoded["custom:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }

      next();
    } catch (err) {
      console.error("Error in auth middleware:", err);
      res.status(400).json({ message: "Invalid token" });
    }
  };
};
