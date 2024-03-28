import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");


    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // const res = await axios.get(url);
    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const weatherData = await res.json();

    return NextResponse.json(weatherData);
  } catch (error) {
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
