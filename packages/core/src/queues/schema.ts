import { z } from "zod";

export const recommendedProperties = z.object({
  jobType: z.literal("getRecommendedProperties"),
  userId: z.string(),
});

export const recommendationEmail = z.object({
  jobType: z.literal("sendRecommendationEmail"),
  userId: z.string(),
});

export const bookingEmail = z.object({
  jobType: z.literal("sendBookingEmail"),
  userId: z.string(),
});

export const recommendationsSchema = [recommendedProperties];
export const emailSchema = [recommendationEmail, bookingEmail];
