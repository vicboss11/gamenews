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
