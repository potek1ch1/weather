import React, { useEffect, useState } from "react";
import "./Components/css/forecast.css";
import "./Components/Area"
import { getWeatherHistoryRequest, getWeatherHistory } from "./api/getWeather";

const History = () => {
  const [prefecture, setPrefecture] = useState<string>("");
  const [HistoryPerHour, setHistoryPerHour] = useState<any | null>(null);
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPrefecture(event.target.value);
  };
  // useEffect(() =>{
  //   console.log(prefecture)
  // },[prefecture])
  const handleClick = async () => {
    const params: getWeatherHistoryRequest = {
      prefecture: prefecture,
      date: "2023-08-11",
    };
    const result = await getWeatherHistory(params);
    console.log(result);
    const history = result.forecast
      ? result.forecast.forecastday[0].hour
      : null;

    setHistoryPerHour(history);
  };
  return (
    <>
      <input
        type="text"
        value={prefecture}
        onChange={handleInput}
        placeholder="県を入力"
      />
      <button onClick={handleClick}>検索</button>
      <ForcastArea historyData={HistoryPerHour} />
    </>
  );
};

export default History;
type HistoryAreaProps = {
  historyData: any | null;
};

const ForcastArea = ({ historyData }: HistoryAreaProps) => {
  historyData &&
    historyData.map((data: Record<string, any>) => console.log(data));
  return (
    <div className="historyArea">
      〇〇県✕✕月△△日の天気予報
      <div>
        <table>
          <tr>
            <th>時間</th>
            <th>天気</th>
            <th>気温</th>
            <th>湿度</th>
          </tr>
          {historyData &&
            historyData.map((data: Record<string, any>) => (
              <tr>
                <td>{Number(data.time.substr(11, 2))}</td>
                <td>{data.condition?.text}</td>
                <td>{data.temp_c}℃</td>
                <td>{data.humidity}%</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};
