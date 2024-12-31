export type TUser = {
  id: string;
  userName: string;
  email: string;
  password: string;
  status: "active" | "disable";
  isDeleted: boolean;
};

export type TUpdateUserData = {
  id?: string;
  userName?: string;
  email?: string;
  password?: string;
  status?: "active" | "disable";
  isDeleted?: boolean;
};
