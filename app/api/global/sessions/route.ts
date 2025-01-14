import { NextResponse } from "next/server";
import { getGlobalSessions } from "../..";
import { AccountMode } from "@/app/lib/types";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const accountMode = url.searchParams.get(
      "accountMode"
    ) as AccountMode | null;

    if (!accountMode) {
      return NextResponse.json(
        { error: "query parameters not specified. this is required" },
        { status: 400 }
      );
    }

    const globalSessions = await getGlobalSessions(accountMode);

    return NextResponse.json({
      data: globalSessions,
      success: true,
      message: "All sessions retrieved successfully.",
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
