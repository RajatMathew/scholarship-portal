export interface Scholarship {
  id: number;
  name: string;
  logoImg: string;
  coverImg: string;
  description: string;
  initiators: number[];
  content?: Content[] | null;
  timeline?: Timeline[] | null;
}
export interface Content {
  expandable: boolean;
  title: string;
  content?: string[] | null;
}
export interface Timeline {
  date: string;
  title: string;
  description: string;
}
