/// <reference types="vite/client" />
/// <reference types="react-dom/client" />

interface ImportMetaEnv {
    readonly VITE_REMOTE_SERVER: string;
    // Add other env variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module 'react-dom/client' {
  export interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
  }
  export function createRoot(container: Element | DocumentFragment): Root;
}
