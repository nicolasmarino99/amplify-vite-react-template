export interface MessageFormData {
  title: string;
  content: string;
  segmets?: Segment[]
}

export interface Segment {
  name: string;
  description: string;
  messageID: string;
}