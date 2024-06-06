export interface Segment {
  type: 'html' | 'component';
  content?: string;
  component?: string | null;
  props?: { [key: string]: string | null };
}

export interface Heading {
  tag: string;
  text: string;
  id: string;
}

export interface OrganizedHeading {
  tag: string;
  id: string;
  text: string;
  subHeadings: Heading[];
}
