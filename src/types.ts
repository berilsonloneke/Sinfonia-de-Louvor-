export interface Content {
  [key: string]: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption: string;
}

export interface Ad {
  id: number;
  title: string;
  code: string;
  active: number;
}

export interface Stats {
  visits: number;
  adClicks: number;
}
