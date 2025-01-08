import { NextResponse } from "next/server";
import { getTransactions } from "../..";
import { AccountMode, TransactionTableCategory } from "@/app/lib/types";

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const accountMode = url.searchParams.get(
      "accountMode"
    ) as AccountMode | null;
    const transactionCategory = url.searchParams.get(
      "category"
    ) as TransactionTableCategory | null;
    const limitNum = url.searchParams.get("limit");

    if (!accountMode || !transactionCategory) {
      return NextResponse.json(
        { error: "query parameters not specified. this is required" },
        { status: 400 }
      );
    }

    const deposits = await getTransactions(
      accountMode,
      transactionCategory,
      limitNum
    );

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
