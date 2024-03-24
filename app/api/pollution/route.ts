import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // const searchParams = req.nextUrl.searchParams;

    const lat = 28.57506983435872;
    const lon = 77.18753306793438;

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching forecast data");
    return new Response("Error fetching pollution data", { status: 500 });
  }
}