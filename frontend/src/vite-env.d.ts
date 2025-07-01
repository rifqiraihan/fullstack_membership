/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    // tambahkan variabel environment lain di sini jika perlu
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  