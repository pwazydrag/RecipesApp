export type Recipe = {
  _id: string;
  title: string;
  author: Author;
  category: Category;
  preparationTime: number;
  date: Date;
  ingredients: Ingredient[];
  preparation: string[];
  rating: Rating[];
  comments: Comment[];
  likes: Favorite[];
  img: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  registration: Date;
};

export type Author = {
  _id: string;
  username: string;
  email: string;
};

export type Comment = {
  _id: string;
  comment: string;
  author: Author;
  likes: number;
  commentDate: Date;
};

export type Category = {
  _id: string;
  name: string;
};

export type Rating = {
  _id: string;
  recipe: string;
  user: string;
  value: number;
};

export type Ingredient = {
  _id: string;
  recipe: string;
  amount: number;
  name: string;
  unit: Unit;
};

export type Unit = {
  _id: string;
  name: string;
};

export type Favorite = {
  _id: string;
  user: string;
  recipe: string;
};
