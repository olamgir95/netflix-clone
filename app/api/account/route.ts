import Account from "@/database/account";
import { connectToDatabase } from "@/lib/mongoose";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Create an account
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, pin, uid } = await req.json();

    const isExist = await Account.findOne({ name });
    const allAccounts = await Account.find({ uid });

    console.log(allAccounts);

    if (isExist) {
      return NextResponse.json({
        success: false,
        message: "You already have an account",
      });
    }

    if (allAccounts && allAccounts.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You already have 4 accounts",
      });
    }

    const hashPin = await hash(pin, 10);
    const account = await Account.create({ name, pin: hashPin, uid });

    return NextResponse.json({ success: true, account });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// Get all acount
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({
        success: false,
        message: "Account id is mandatory",
      });
    }

    const accounts = await Account.find({ uid });

    return NextResponse.json({ success: true, accounts });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// Delete all acount
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Account id is mandatory",
      });
    }

    await Account.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
