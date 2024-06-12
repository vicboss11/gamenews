/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly APP_NAME: string;
  readonly GAMENEWS_API: string;
  readonly GAMENEWS_TOKEN: string;
  readonly WP_SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    otherLocals: {
      test: string;
    };
  }
}
