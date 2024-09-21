import { inspect } from "util";
import * as crypto from "crypto";
import { Dayjs } from "dayjs";
import { z } from "zod";
import { Environment } from "./shared";
import { Resource } from "sst";

export const log = (data: any, options = { showHidden: false, depth: null, colors: true }) =>
  console.log(inspect(data, options));

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sha256Hash = (data: string) =>
  crypto.createHash("sha256").update(data).digest("hex").toString();
