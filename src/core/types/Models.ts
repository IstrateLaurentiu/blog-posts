export type User = {
  _id: string;
  email: string;
  password: string;
  fullname: string;
  registeredDate: Date;
};

export type Post = {
  _id: string;
  title: string;
  body: string;
  createdDate: Date;
  createdBy: User;
  viewsCounter: number;
};

export enum DbModels {
  USER = 'user',
  POSTS = 'post',
}
