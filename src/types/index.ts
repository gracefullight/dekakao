export interface Alternative {
  name: string;
  url: string;
  android?: string;
  ios?: string;
  description?: string;
}

export type Service = Record<
  string,
  {
    title?: string;
    description?: string;
    children: Alternative[];
  }
>;
