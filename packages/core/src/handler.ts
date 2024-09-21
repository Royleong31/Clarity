import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { ZodType, z } from "zod";
import StatusCode from "./status-codes";

export interface ApiSchema {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  responses: {
    [K: number]: ZodType<any>;
  };
  body?: ZodType<any>;
  pathParams?: ZodType<any>;
  query?: ZodType<any>;
  headers?: ZodType<any>; // refers to response headers
}

interface Options {
  schema: ApiSchema;
  withAuth?: boolean;
}

type ResponseBody<
  TSchema extends ApiSchema,
  TCode extends keyof TSchema["responses"]
> = TSchema["responses"][TCode] extends ZodType<infer R, any, any> ? R : never;

export default function handler<TOptions extends Options>(
  lambda: (
    evt: Omit<APIGatewayProxyEventV2, "body" | "pathParameters" | "queryStringParameters"> & {
      body: TOptions["schema"]["body"] extends ZodType<any>
        ? z.infer<TOptions["schema"]["body"]>
        : null;
      pathParams: TOptions["schema"]["pathParams"] extends ZodType<any>
        ? z.infer<TOptions["schema"]["pathParams"]>
        : null;
      query: TOptions["schema"]["query"] extends ZodType<any>
        ? z.infer<TOptions["schema"]["query"]>
        : null;
    },
    context: Context
  ) => Promise<
    {
      [K in keyof TOptions["schema"]["responses"]]: {
        statusCode: K;
        body: ResponseBody<TOptions["schema"], K>;
        headers?: Record<string, string>;
      };
    }[keyof TOptions["schema"]["responses"]]
  >,
  { schema, withAuth = false }: TOptions
) {
  return async function (
    event: APIGatewayProxyEventV2,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    let responseBody: string;
    let statusCode = StatusCode.SuccessOK;
    let responseHeaders: Record<string, string> = {};

    try {
      // TOOD: Add better error messages
      const eventBody = JSON.parse(event.body || "{}");
      const pathParams = event.pathParameters || {};
      const query = event.queryStringParameters || {};
      const requestHeaders = event.headers || {};

      if (schema.headers?.safeParse && !schema.headers.safeParse(requestHeaders).success) {
        statusCode = StatusCode.ClientErrorBadRequest;
        throw new Error("Invalid request headers");
      }

      if (schema.body?.safeParse && !schema.body.safeParse(eventBody).success) {
        statusCode = StatusCode.ClientErrorBadRequest;
        throw new Error("Invalid request body");
      }

      if (schema.pathParams?.safeParse && !schema.pathParams.safeParse(pathParams).success) {
        statusCode = StatusCode.ClientErrorBadRequest;
        throw new Error("Invalid path parameters");
      }

      if (schema.query?.safeParse && !schema.query.safeParse(query).success) {
        statusCode = StatusCode.ClientErrorBadRequest;
        throw new Error("Invalid query parameters");
      }

      const parsedBody = schema.body ? schema.body.parse(eventBody) : null;
      const parsedPathParams = schema.pathParams ? schema.pathParams.parse(pathParams) : null;
      const parsedQuery = schema.query ? schema.query.parse(query) : null;

      const startTime = Date.now();

      const response = await lambda(
        {
          ...event,
          body: parsedBody,
          pathParams: parsedPathParams,
          query: parsedQuery,
        },
        context
      );
      console.log("Time taken", Date.now() - startTime, "ms");

      const responseSchema = schema.responses[response.statusCode as keyof typeof schema.responses];

      if (responseSchema && !responseSchema.safeParse(response.body).success) {
        statusCode = StatusCode.ServerErrorInternal;
        console.log(responseSchema.safeParse(response.body).error);
        throw new Error("Invalid response body");
      }

      responseBody = JSON.stringify(response.body);
      // append new headers if any
      responseHeaders = { ...responseHeaders, ...response.headers };
      statusCode = response.statusCode as keyof typeof schema.responses;
    } catch (error: any) {
      console.log(error);

      if (statusCode === StatusCode.SuccessOK) {
        statusCode = StatusCode.ServerErrorInternal;
      }

      responseBody = JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return {
      body: responseBody,
      statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...responseHeaders,
      },
    };
  };
}
