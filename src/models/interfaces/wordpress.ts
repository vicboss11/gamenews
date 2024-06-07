export interface WpPage {
  date: string;
  modified: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
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
  name: string;
  slug: string;
  taxonomy: 'category';
}
