import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const pollData = await res.json();

    return NextResponse.json(pollData);
  } catch (error) {
    return new Response("Error fetching pollution data", { status: 500 });
  }
}