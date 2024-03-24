export const kelvinToCelcius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
}

export const airQualityIndexText = [
    {
        rating: 10,
        description: "Good",
    },
    {
        rating: 20,
        description: "Fair",
    },
    {
        rating: 30,
        description: "Moderate",
    },
    {
        rating: 40,
        description: "Poor",
    },
    {
        rating: 50,
        description: "Very Poor",
    },
]