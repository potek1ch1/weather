import React, { useEffect, useState } from "react";
import "./Components/css/forecast.css";
import "./Components/Area";
import Data from "./Components/prefectures.json";
import { Link, useLocation } from "react-router-dom";
import { getWeatherHistoryRequest, getWeatherHistory } from "./api/getWeather";

const History = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const [state, setState] = useState<boolean>(false);
  const [prefecture, setPrefecture] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [HistoryPerHour, setHistoryPerHour] = useState<any | null>(null);

  const handleClick = (pref: string) => {
    setPrefecture(pref);
  };
  useEffect(() => {
    console.log(prefecture);
  });

  // const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setPrefecture(event.target.value);
  // };
  // useEffect(() =>{
  //   console.log(prefecture)
  // },[prefecture])
  // const searchData = async (prefecture:string) => {
  //   const params: getWeatherHistoryRequest = {
  //     prefecture: prefecture,
  //     date: "2023-08-11",
  //   };
  //   const result = await getWeatherHistory(params);
  //   console.log(result);
  //   const history = result.forecast
  //     ? result.forecast.forecastday[0].hour
  //     : null;

  //   setHistoryPerHour(history);
  // };

  if (prefecture) {
    console.log("選択された県は: ", prefecture);
    return (
      <>
        <SelectDate />
      </>
    );
  } else {
    return <SelectArea data={Data} onPrefClick={handleClick} />;
  }

  return <>{/* <ForcastArea historyData={HistoryPerHour} /> */}</>;
};

const SelectArea = ({ data, onPrefClick }: any) => {
  console.log(data);
  return (
    <>
      {data.map((area: Area) => (
        <div>
          <h3>{area.area}</h3>
          {area.prefectures.map((pref: Prefecture) => (
            <Link to={pref.name}>{pref.name}</Link>
            // <button onClick={() => onPrefClick(pref.name)}>{pref.name}</button>
          ))}
        </div>
      ))}
    </>
  );
};

const SelectDate = () => {
  return(
    <>
      <h3>日付を入力してください</h3>
      <input type="date" />
    </>
  )
}

export default History;
type HistoryAreaProps = {
  historyData: any | null;
};

type Area = {
  area: string;
  prefectures: Prefecture[];
};

type Prefecture = {
  id: string;
  name: string;
  short: string;
  kana: string;
  en: string;
};

// const ForcastArea = ({ historyData }: HistoryAreaProps) => {
//   historyData &&
//     historyData.map((data: Record<string, any>) => console.log(data));
//   return (
//     <div className="historyArea">
//       〇〇県✕✕月△△日の天気予報
//       <div>
//         <table>
//           <tr>
//             <th>時間</th>
//             <th>天気</th>
//             <th>気温</th>
//             <th>湿度</th>
//           </tr>
//           {historyData &&
//             historyData.map((data: Record<string, any>) => (
//               <tr>
//                 <td>{Number(data.time.substr(11, 2))}</td>
//                 <td>{data.condition?.text}</td>
//                 <td>{data.temp_c}℃</td>
//                 <td>{data.humidity}%</td>
//               </tr>
//             ))}
//         </table>
//       </div>
//     </div>
//   );
// };
