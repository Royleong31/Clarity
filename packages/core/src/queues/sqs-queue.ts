import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

import { z } from "zod";

const checkSqsMessageBodySize = (messageBody: string) => {
  if (messageBody.length > 256 * 1024) {
    throw new Error("Message body must be smaller than 256 KB");
  }
};

type JobSchema<T extends z.ZodObject<any>[]> = T[number];
type Job<T extends z.ZodObject<any>[]> = z.infer<JobSchema<T>>;

export class SQSQueue<T extends z.ZodObject<any>[]> {
  constructor(
    public zodSchemas: T,
    private queueUrl: string,
    private sqs: SQSClient = new SQSClient({})
  ) {}

  private convertJobToSqsMessageBody(job: Job<T>): string {
    const messageBody = JSON.stringify(job);
    checkSqsMessageBodySize(messageBody);

    const zodSchema = this.zodSchemas.find((schema) => schema.shape.jobType.value === job.jobType);

    if (!zodSchema) {
      throw new Error("Invalid job type");
    }

    zodSchema.parse(job);
    return messageBody;
  }

  async enqueue(job: Job<T>, delaySeconds = 0): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: this.convertJobToSqsMessageBody(job),
      DelaySeconds: delaySeconds,
    });
    await this.sqs.send(command);
  }
}
