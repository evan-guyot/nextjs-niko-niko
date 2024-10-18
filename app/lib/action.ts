"use server";

import { Mood, PrismaClient } from '@prisma/client';
import FeelingFormData from '../form/feelingFormData';
import { FormStatus } from '@/types/models/form';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

function truncateToStartOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

async function getUserId(): Promise<number> {
  const session = await getServerSession();
  
  if (session && session.user && session.user.email) {
      const user = await prisma.user.findUnique({
          where: { email: session.user.email },
      });

      if (user) {
          return user.id;
      }
  }

  return -1;
}

export async function addOrChangeFeeling(formData: FeelingFormData): Promise<FeelingFormData> {
    const userId = await getUserId();

    if (userId === -1) {
        return {
            ...formData,
            message: "Please authenticate",
            status: FormStatus.Error
        };
    }

    const date = truncateToStartOfDay(new Date());

    await prisma.feeling.upsert({
        where: {
            userId_date: {
                userId: userId,
                date: date
            }
        },
        update: {
            mood: formData.mood,
        },
        create: {
            userId: userId,
            date: date,
            mood: formData.mood,
        }
    });

    return {
        ...formData,
        message: "Thank you",
        status: FormStatus.Success
    };
}

export async function getTodaysFeeling(): Promise<Mood | undefined> {
  const userId = await getUserId();

  if (userId === -1) {
      return undefined;
  }

  const date = truncateToStartOfDay(new Date());

  const feeling = await prisma.feeling.findUnique({
      where: {
          userId_date: {
              userId: userId,
              date: date
          }
      }
  });

  return feeling ? feeling.mood : undefined;
}

export async function getCurrentMonthFeelings(): Promise<{ date: Date; mood: Mood }[] | undefined> {
    const userId = await getUserId();

    if (userId === -1) {
        return undefined;
    }

    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); 

    const feelings = await prisma.feeling.findMany({
        where: {
            userId: userId,
            date: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
        },
        select: {
            date: true,
            mood: true,
        },
    });

    return feelings.map(feeling => ({
        date: feeling.date,
        mood: feeling.mood,
    }));
}