import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const searchParams = req.nextUrl.searchParams;

    const lat = 28;
    const lon = 77;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
        next: {revalidate: 900},
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error fetching forecast data");
    return new Response("Error fetching pollution data", { status: 500 });
  }
}