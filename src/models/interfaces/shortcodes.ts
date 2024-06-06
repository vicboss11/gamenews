export interface Shortcode {
  name: string;
  attributes: { [key: string]: string };
  original: string;
  index: number;
  importPath?: string;
}

export interface ShortcodeAttributes {
  [key: string]: string;
}
