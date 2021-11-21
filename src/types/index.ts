export interface Alternative {
  name: string;
  url: string;
  android?: string;
  ios?: string;
  description?: string;
}

export interface Service {
  [key: string]: {
    title?: string;
    description?: string;
    children: Alternative[];
  };
}
