export function truncate(str: string, maxlength: number) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}

export enum Environment {
  LOCAL = "LOCAL",
  DEV = "DEV",
  PROD = "PROD",
}
