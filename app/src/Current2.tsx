import React, { useEffect } from "react";
import { useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherRequest,
  getWeatherHistory,
  getWeatherHistoryRequest,
} from "./api/getWeather";

export default function Current() {
  const [prefecture, setPrefecture] = useState<string>("");
  const [currentWeather, setCurretntWeather] = useState<any | null>(null);
  const [HistoryPerHour, setHistoryPerHour] = useState<any | null>(null);
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPrefecture(event.target.value);
  };
  const handleClick = async () => {
    const today = getDate();
    const params: getCurrentWeatherRequest = {
      prefecture: prefecture,
    };

    const result = params.prefecture
      ? await getCurrentWeather(params)
      : () => {
          throw new Error("文字が入力されてない");
        };
    // const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=8e4eb12e193f46b6860135354231208&q=${params.prefecture}&aqi=no`).then((res) => res.json())
    setCurretntWeather(result.current);
    const Historyparams: getWeatherHistoryRequest = {
      prefecture: prefecture,
      date: today,
    };
    const Historyresult = await getWeatherHistory(Historyparams);
    setHistoryPerHour(Historyresult);
  };
  useEffect(() => {
    if (currentWeather) {
      console.log(currentWeather);
    }
  }, [currentWeather]);
  useEffect(() => {
    if (HistoryPerHour) {
      console.log(HistoryPerHour);
    }
  });

  return (
    <>
      <div>Current</div>
      <input
        type="text"
        value={prefecture}
        onChange={handleInput}
        placeholder="県を入力"
      />
      <button onClick={handleClick}>検索</button>
      {currentWeather && (
        <div>
          <h2>現在の天気</h2>
          <p>天気:{currentWeather.condition.text}</p>
          <p>気温:{currentWeather.temp_c}</p>
        </div>
      )}
    </>
  );
}

const getDate = () => {
  const now = new Date();
  let year = now.getFullYear();
  let month = ("0" + String(now.getMonth() + 1)).slice(-2);
  let date = now.getDate();
  return `${year}-${month}-${date}`;
};
