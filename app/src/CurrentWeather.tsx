import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentWeather, getCurrentWeatherRequest } from "./api/getWeather";

export default function CurrentWeather() {
  let params = useParams();
  console.log(params["pref"]);
  const prefecture = params["pref"];
  const [state, setState] = useState<boolean>(false);
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
      setCurretntWeather(result.current);
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
      <div>CurrentWeather</div>
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
