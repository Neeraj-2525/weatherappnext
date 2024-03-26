import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    // const apiKey = process.env.GEO_CODE_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    // const url = `https://geocode.maps.co/search?q=${city}&api_key=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching latitude and longitude data");
    return new Response("Error fetching latitude and longitude data", { status: 500 });
  }
}