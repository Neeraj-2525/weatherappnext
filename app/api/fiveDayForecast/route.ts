import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await fetch(url, {
        next: {revalidate: 3600},
    });

    const data = await res.json();

    return NextResponse.json(data);


  } catch (error) {
    console.log("Error fetching daily data");
    return new Response("Error fetching daily data", { status: 500 });
  }
}