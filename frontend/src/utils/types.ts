export type Recipe = {
  _id: string;
  title: string;
  authorId: string;
  category: string;
  preparationTime: number;
  ingredients: string[];
  preparation: string[];
  rating: number[];
};

export type Comment = {
  _id: string;
  comment: string;
  authorId: string;
  likes: Number;
};
