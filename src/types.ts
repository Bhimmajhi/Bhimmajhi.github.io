export interface GalleryItem {
  postId: string;
  image: string;
  alt: string;
  title: string;
  meta: string;
  tag: string;
  // Optional original size — photo ko usi ratio me dikhane ke liye
  width?: number;
  height?: number;
}

export type SocialClass = 'gmail' | 'fb' | 'insta' | 'wa';

export interface SocialLink {
  href: string;
  cls: SocialClass;
  title: string;
  icon: string;
}
