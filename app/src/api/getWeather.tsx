export interface getWeatherHistoryRequest {
  prefecture: string;
  date: string;
}

export function getWeatherHistory(params: getWeatherHistoryRequest) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const fetchResut = fetch(
    `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${params.prefecture}&dt=${params.date}`
  ).then((res) => res.json());
  return fetchResut;
}

export interface getCurrentWeatherRequest {
  prefecture: string;
}

export function getCurrentWeather(params: getCurrentWeatherRequest) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const fetchResut = fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${params.prefecture}&aqi=no`
  ).then((res) => res.json());
  return fetchResut;
}
