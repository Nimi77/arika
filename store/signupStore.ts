import { create } from "zustand";

type SignupData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupStore = SignupData & {
  setSignupData: (data: SignupData) => void;
  updateSignupField: <K extends keyof SignupData>(
    field: K,
    value: SignupData[K],
  ) => void;
  clearSignupData: () => void;
};

export const useSignupStore = create<SignupStore>((set) => ({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",

  setSignupData: (data) => set(data),

  updateSignupField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  clearSignupData: () =>
    set({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }),
}));
