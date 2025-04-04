/// <reference types="node" />

declare module 'vite' {
  import { Plugin } from 'vite';
  export function defineConfig(config: any): any;
}

declare module '@vitejs/plugin-react' {
  import { Plugin } from 'vite';
  export default function react(): Plugin;
} 