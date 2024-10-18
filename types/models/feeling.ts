import { Mood } from "@prisma/client";

export interface Feeling {
    id: number;
    userId: number;
    date: Date;
    mood: Mood;
}