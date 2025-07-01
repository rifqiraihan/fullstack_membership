import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    membership_type: "A" | "B" | "C";
  };
}
