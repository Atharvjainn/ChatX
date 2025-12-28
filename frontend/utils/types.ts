// types/user.ts
export interface User {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}


export interface Message {
  senderId : string,
  receiverId : string,
  text : string,
  image : string,
  createdAt: string;
  updatedAt: string;
}
