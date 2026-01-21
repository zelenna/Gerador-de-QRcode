
export enum QRType {
  URL = 'URL',
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  MAPS = 'MAPS',
  PIX = 'PIX',
  BIO = 'BIO',
  EVENT = 'EVENT'
}

export interface QRStyle {
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  includeLogo: boolean;
  logoUrl?: string;
  logoSize: number;
  borderRadius: number;
}

export interface BioPageData {
  photo?: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  links: { label: string; url: string }[];
  theme: {
    primary: string;
    background: string;
  };
}

export interface EventPageData {
  banner?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  ctaLabel: string;
  ctaUrl: string;
  theme: {
    primary: string;
    background: string;
  };
}

export interface AnalyticsRecord {
  timestamp: number;
  device: string;
  location?: string;
}

export interface QRCodeEntry {
  id: string;
  name: string;
  description: string;
  type: QRType;
  content: string; // Direct link or serialized intermediate data
  intermediateData?: BioPageData | EventPageData;
  style: QRStyle;
  createdAt: number;
  status: 'active' | 'inactive';
  analytics: AnalyticsRecord[];
}

export type ViewMode = 'dashboard' | 'create' | 'edit' | 'analytics' | 'public';
