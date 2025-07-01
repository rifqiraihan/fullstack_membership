// src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface User {
      id: number;
      membership_type: "A" | "B" | "C";
    }
  }
}
