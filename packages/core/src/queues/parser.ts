import { z } from "zod";

type JobSchema<T extends z.ZodObject<any>[]> = T[number];
type Job<T extends z.ZodObject<any>[]> = z.infer<JobSchema<T>>;

type JobBody = {
  jobType: string;
  [key: string]: unknown;
};

export function parseSqsMessageBody<T extends z.ZodObject<any>[]>(
  messageBody: string,
  zodSchemas: T
): Job<T> {
  const parsed = JSON.parse(messageBody) as JobBody;

  const zodSchema = zodSchemas.find((schema) => schema.shape.jobType.value === parsed.jobType);

  if (!zodSchema) {
    throw new Error("Invalid message body");
  }

  return zodSchema.parse(parsed);
}
