declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL?: string;
      EXPO_PUBLIC_API_KEY?: string;
    }
  }
}

// JSON module declarations
declare module "*.json" {
  const value: any;
  export default value;
}

// Ensure this file is treated as a module
export {};