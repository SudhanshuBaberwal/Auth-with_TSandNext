declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NEXT_PUBLIC_VITE_BACKEND_URL: string;
  }
}