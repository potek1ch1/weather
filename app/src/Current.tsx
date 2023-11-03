import React, { useState,useEffect } from "react";
import Area from "./Components/Area";
import { useLocation } from "react-router-dom";
import {
  getCurrentWeather,
  getCurrentWeatherRequest,
  getWeatherHistory,
  getWeatherHistoryRequest,
} from "./api/getWeather";

export default function Current() {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const prefecture = query.get("pref");
  const [state, setState] = useState<boolean>(false)
  const [currentWeather, setCurretntWeather] = useState<any | null>(null);
  const searchData = async (prefecture: string) => {
    const params: getCurrentWeatherRequest = {
      prefecture: prefecture,
    };
    const result = params.prefecture
      ? await getCurrentWeather(params)
      : () => {
          console.log("エラー");
        };
    console.log(result);
    if ("error" in result) {
      console.log("エラー");
    } else {
      setState(true);
      setCurretntWeather(result.current)
    } 
  };
  useEffect(() => {
    // コンポーネントがマウントされた際に一度だけ実行
    if (prefecture) {
      console.log(prefecture);
      searchData(prefecture);
    }
  }, []);
  return (
    <div>
      {state||<Area />}
      {state && (
        <div>
          <h2>現在の天気</h2>
          <p>天気:{currentWeather.condition.text}</p>
          <p>気温:{currentWeather.temp_c}度</p>
        </div>
      )}
    </div>
  );
}

const getDate = () => {
  const now = new Date();
  let year = now.getFullYear();
  let month = ("0" + String(now.getMonth() + 1)).slice(-2);
  let date = now.getDate();
  return `${year}-${month}-${date}`;
};
