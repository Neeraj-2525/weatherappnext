import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Weather: Now`,
  description: "Stay ahead of the weather curve with WeatherNow! Get instant access to real-time weather updates and forecasts from around the globe. Plan your days confidently with our intuitive interface and detailed weather insights. Powered by trusted data sources like OpenWeather and OpenMeteo APIs, WeatherNow ensures accurate and up-to-date weather information. From temperature trends to UV index, air quality, and more, WeatherNow keeps you informed and prepared for whatever Mother Nature throws your way. Get WeatherNow today and never get caught off guard by the weather again!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/cloudSun.png" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
