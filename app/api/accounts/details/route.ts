import { NextResponse } from "next/server";
import { getAccountModes } from "../..";

export async function GET(request: Request) {
  try {
    const accountModes = await getAccountModes();

    return NextResponse.json({
      data: accountModes,
      success: true,
      message: "Account Details retrieved successfully.",
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
