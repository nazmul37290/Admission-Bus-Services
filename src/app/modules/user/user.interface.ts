export type TUser = {
  id: string;
  userName: string;
  email: string;
  password: string;
  resetToken?: string | null;
  resetTokenExpires?: Date | null;
  status: "active" | "disable";
  isDeleted: boolean;
};

export type TUpdateUserData = {
  id?: string;
  userName?: string;
  email?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  password?: string;
  status?: "active" | "disable";
  isDeleted?: boolean;
};
