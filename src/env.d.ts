/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly APP_NAME: string;
  readonly GAMENEWS_API: string;
  readonly GAMENEWS_API_TOKEN: string;
  readonly WP_SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
