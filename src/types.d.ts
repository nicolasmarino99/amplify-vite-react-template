export interface MessageFormData {
  title: string;
  content: string;
  segmets?: Segment[]
}

export interface Segment {
  id?: string;
  name: string;
  description: string;
  messageID?: string;
}