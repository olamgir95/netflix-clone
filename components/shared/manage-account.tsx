"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LockKeyhole, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CreateAccountForm from "@/components/form/create-account-form";
import LoginAccountForm from "@/components/form/login-account-form";
import { AccountResponse, AccountProps } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Account from "./../../database/account";
import { toast } from "@/hooks/use-toast";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"login" | "create">("create");
  const [accounts, setAccounts] = useState<AccountProps[]>([]);

  const { data: session }: any = useSession();
  console.log("session", session);

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const { data } = await axios.get<AccountResponse>(
          `/api/account?uid=${session?.user?.uid}`
        );
        console.log("data", data);
        data.success && setAccounts(data.data as AccountProps[]);
      } catch (e) {
        return toast({
          title: "Error",
          description: "An error occurred while creating your account",
          variant: "destructive",
        });
      }
    };
    getAllAccounts();
  }, [session]);

  const onDelete = async (id: string) => {
    try {
      const isConfirmed = confirm(
        "Are you sure you want to delete this account?"
      );
      if (isConfirmed) {
        const { data } = await axios.delete<AccountResponse>(
          `/api/account?id=${id}`
        );
        if (data.success) {
          setAccounts(
            accounts.filter((account: AccountProps) => account._id !== id)
          );
          return toast({
            title: "Account deleted",
            description: "Account deleted successfully",
          });
        } else {
          return toast({
            title: "Error",
            description: data.message,
            variant: "destructive",
          });
        }
      }
    } catch (e) {
      return toast({
        title: "Error",
        description: "An error occurred while deleting your account",
        variant: "destructive",
      });
    }
  };
  return (
    <div
      className={
        "min-h-screen flex justify-center flex-col items-center relative"
      }
    >
      <div className={"flex justify-center flex-col items-center"}>
        <h1 className={"text-white font-bold text-5xl my-12"}>
          Who's Watching?
        </h1>
        <ul className={"flex p-0 my-12"}>
          {accounts.map((account: AccountProps) => (
            <li
              key={account._id}
              onClick={() => {
                if (isDelete) return;
                setOpen(true);
                setState("login");
              }}
              className={
                "max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
              }
            >
              <div className="relative">
                <div
                  className={
                    "max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative"
                  }
                >
                  <Image
                    src={
                      "https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                    }
                    alt={"account"}
                    fill
                  />
                </div>
                {isDelete ? (
                  <div
                    className={
                      "absolute transform bottom-0 z-10 cursor-pointer"
                    }
                  >
                    <Trash2
                      onClick={() => onDelete(account._id)}
                      className={"w-8 h-8 text-red-600"}
                    />
                  </div>
                ) : null}
              </div>
              <div className={"flex items-center gap-1"}>
                <span className={"font-mono font-bold text-xl"}>
                  {account.name}
                </span>
                <LockKeyhole />
              </div>
            </li>
          ))}

          {accounts && accounts.length < 4 && (
            <li
              onClick={() => {
                setOpen(true);
                setState("create");
              }}
              className={
                "border bg-[#e5b109] font-bold text-xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
              }
            >
              Add account
            </li>
          )}
        </ul>
        <Button
          onClick={() => setIsDelete((prev) => !prev)}
          className={
            "bg-transparent rounded-none hover:bg-transparent !text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"
          }
        >
          Manage Profiles
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            {state === "login" ? "Login to Account" : "Create a New Account"}
          </DialogTitle>
          {state === "login" && <LoginAccountForm />}
          {state === "create" && (
            <CreateAccountForm
              uid={session?.user?.uid}
              setOpen={setOpen}
              setAccounts={setAccounts}
              accounts={accounts}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAccount;
