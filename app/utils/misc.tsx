import moment from "moment";

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

export const unixToTime = (unix: number, timezone:number) =>{
    return moment.unix(unix).utcOffset(timezone / 60).format("hh:mm A")
}

export const unixToWeekday = (unix: number) =>{
    return moment.unix(unix).format("ddd");
}

export const formatNum = (num: number) =>{
    if(num>= 1000000){
        return (num/1000000).toFixed(1) + "M";
    }

    else if(num>= 1000){
        return (num/1000).toFixed(1) + "k";
    } else {
        return num;
    }
}