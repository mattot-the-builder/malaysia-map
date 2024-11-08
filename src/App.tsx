import './App.css'
import svgData from "./assets/MalaysiaMapSvgData.json";

import MalaysiaMap from './libs/MalaysiaMap';

const malaysiaMap = new MalaysiaMap("canvas");
console.log(malaysiaMap);

function App() {

  console.log(svgData);

  return (
    <>
      <h1>
        Malaysia Map
      </h1>
    </>
  )
}

export default App
