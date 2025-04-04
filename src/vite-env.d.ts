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

declare module 'vite' {
  import { Plugin } from 'vite';
  export function defineConfig(config: any): any;
  export interface Plugin {
    name: string;
    enforce?: 'pre' | 'post';
    apply?: 'serve' | 'build';
    config?: (config: any) => any;
    transform?: (code: string, id: string) => string | void;
  }
}

declare module '@vitejs/plugin-react' {
  import { Plugin } from 'vite';
  export default function react(): Plugin;
}
