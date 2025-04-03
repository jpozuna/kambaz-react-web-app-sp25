/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REMOTE_SERVER: string;
    // Add other env variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
