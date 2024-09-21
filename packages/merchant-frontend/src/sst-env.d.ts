/// <reference types="vite/client" />
  interface ImportMetaEnv {
    readonly VITE_PUBLIC_REGION: string
  readonly VITE_PUBLIC_CLARITY_API_URL: string
  readonly VITE_PUBLIC_MERCHANT_API_URL: string
  readonly VITE_DYNAMIC_ENV_ID: string
  readonly VITE_PAYMASTER_KEY: string
  readonly VITE_BUNDLER_KEY: string
  readonly VITE_1INCH_KEY: string
  readonly VITE_WID: string
  readonly VITE_1INCH_URL: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }