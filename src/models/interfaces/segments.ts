import type { WpPage, WpPost } from './wordpress';

export interface Segment {
  type: 'html' | 'component';
  content?: string;
  component?: string | null;
  props?: { [key: string]: string | null };
}

interface SegmentData {
  html: string;
  segments: Segment[];
}

export interface SegmentsPageData extends SegmentData {
  page: WpPage;
}

export interface SegmentsPostData extends SegmentData {
  post: WpPost;
}
