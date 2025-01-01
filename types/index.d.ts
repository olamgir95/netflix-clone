export interface ContextType {
  account: AccountProps | null;
  setAccount: (account: AccountProps | null) => void;
}

export interface AccountProps {
  _id: string;
  uid: string;
  name: string;
  pin: string;
}

export interface ChildProps {
  children: ReactNode;
}
