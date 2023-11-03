import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWeatherHistoryRequest, getWeatherHistory } from "./api/getWeather";
import { type } from "os";
import "./Components/css/HistoryDate.css";

export default function HistoryDate() {
  let params = useParams();
  console.log(params["pref"]);
  return (
    <div className="main">
      <NavLIST params={params["pref"]} />
      <SelectDate params={params["pref"]} />
    </div>
  );
}

const NavLIST = ({ params }: any) => {
  return (
    <>
      <p>
        天気アプリ名 → <Link to="./../">過去の天気</Link>
        {/* 天気アプリ名 → <Link to="./../">過去の天気</Link> → {params} */}
      </p>
    </>
  );
};

const SelectDate = ({ params }: any) => {
  const [date, setDate] = useState<string | null>(null);
  const [HistoryPerHour, setHistoryPerHour] = useState<any | null>(null);
  const newDate = new Date();
  const dateList: string[] = [];

  for (let i = 0; i < 8; i++) {
    newDate.setDate(newDate.getDate() - 1);
    let dateElement: string[] = [
      newDate.getFullYear().toString(),
      ("0" + (newDate.getMonth() + 1)).slice(-2),
      ("0" + newDate.getDate()).slice(-2),
    ];
    dateList.push(dateElement[0] + "-" + dateElement[1] + "-" + dateElement[2]);
  }
  console.log(dateList);

  newDate.setDate(newDate.getDate() - 2);
  console.log(newDate);
  console.log(newDate.getDate());
  const search = async (params: getWeatherHistoryRequest) => {
    console.log("hoge");
    const result = await getWeatherHistory(params);
    console.log(result);
    const history = result.forecast ? result.forecast.forecastday[0] : null;
    // ? result.forecast.forecastday[0].hour
    // : null;

    setHistoryPerHour(history);
  };

  useEffect(() => {
    console.log(HistoryPerHour);
  }, [HistoryPerHour]);
  useEffect(() => {
    console.log(date);
    const historyParams: getWeatherHistoryRequest = {
      prefecture: params,
      date: date ?? "",
    };
    console.log(historyParams);
    historyParams.date.length > 0 && search(historyParams);
  }, [date]);

  return (
    <>
      {/* <input type="date" onChange={(e) => setDate(e.target.value)} /> */}
      {/* <br /> */}
      {/* <button onClick={}>決定</button> */}
      {date ? (
        <ForcastArea historyData={HistoryPerHour} />
      ) : (
        <div className="card-container">
          <h2>日付を選択してください</h2>
          {dateList.map((date: string,index:number) => (
            <div key={index} className="day-card" onClick={() => setDate(date)}>
              {date}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const ForcastArea = ({ historyData }: any) => {
  historyData?.hour &&
    historyData?.hour.map((data: Record<string, any>) => console.log(data));
  console.log(historyData?.date);
  return (
    <div className="historyArea">
      <div>{historyData?.date}</div>
      <div>
        <table>
          <tr>
            <th>時間</th>
            <th>天気</th>
            <th>気温</th>
            <th>湿度</th>
          </tr>
          {historyData?.hour &&
            historyData?.hour.map((data: Record<string, any>) => (
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
