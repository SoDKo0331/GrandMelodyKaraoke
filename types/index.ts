
export interface Suite {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  capacity: string;
}

export interface Experience {
  icon: string;
  title: string;
  description: string;
}

export interface ConciergeMessage {
  role: 'user' | 'model';
  text: string;
}
