export interface WpPage {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  meta: Metadata;
}

export interface WpPost extends WpPage {
  author: number;
  categories: number[];
  tags: string[];
  _embedded: {
    author: WpAuthor[];
  };
  'wp:term': WpCategory[];
}

export interface WpAuthor {
  id: number;
  name: string;
  description: string;
  avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
}

export interface WpCategory {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
  taxonomy: 'category';
}

export interface Metadata {
  _seopress_robots_primary_cat: string;
  _seopress_titles_title: string;
  _seopress_titles_desc: string;
}
