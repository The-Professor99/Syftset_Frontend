import { db } from "@/app/lib/firebase/firebase";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { getAllDeposits } from "../..";
import { AccountMode } from "@/app/lib/types";
import { FirebaseError } from "firebase/app";

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const accountMode = url.searchParams.get(
      "accountMode"
    ) as AccountMode | null;

    if (!accountMode) {
      return NextResponse.json(
        { error: "accountMode query parameter is required" },
        { status: 400 }
      );
    }

    const deposits = await getAllDeposits(accountMode, "deposits");

    return NextResponse.json({
      data: deposits,
      success: true,
      message: "Deposits retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching Firestore data:", error);

    if (error instanceof Error) {
      return NextResponse.json({}, { status: 500, statusText: error.message });
    } else {
      return NextResponse.json(
        {},
        { status: 500, statusText: "Failed to fetch data" }
      );
    }
  }
}
