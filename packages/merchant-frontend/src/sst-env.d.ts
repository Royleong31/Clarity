/// <reference types="vite/client" />
  interface ImportMetaEnv {
    readonly VITE_PUBLIC_REGION: string
  readonly VITE_PUBLIC_CLARITY_API_URL: string
  readonly VITE_PUBLIC_MERCHANT_API_URL: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }