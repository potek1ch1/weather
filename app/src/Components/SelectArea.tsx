import { Link } from "react-router-dom";
import Data from "./prefectures.json";

const SelectArea = () => {
  return (
    <div className="flex-container">
      {Data.map((area: Area) => (
        <div key={area.area} className="container">
          <h3>{area.area}</h3>
          <div className="prefecture-container">
            {area.prefectures.map((pref: Prefecture,index) => (
              // <Link to={pref.name} onClick={() => onPrefClick(pref.name)}>
              <div key={index} className="prefecture">
                <Link to={pref.en} key={pref.id}>
                  {pref.name}
                </Link>
              </div>
              // <button onClick={() => onPrefClick(pref.name)}>{pref.name}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectArea

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