import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Http from "./utils/http";
import mapboxgl from "mapbox-gl";
import countries from "./countries";
import Info1 from "./components/Info1";
import Info2 from "./components/Info2";
import Form from "./components/Form";

const http = new Http();

function App() {
  const [country, setCountry] = useState({});
  const [time, setTime] = useState("");
  const mapRef = useRef();

  useEffect(() => {
    getCountry("Sweden");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmlrbHVzIiwiYSI6ImNrZm51bm11MDJjOXoycm52Y3V1Z2VoMjcifQ.ZdjynuwEJtkaktmIpVCyqg";

    if (Object.keys(country).length !== 0) {
      mapRef.current.innerHTML = "";
      new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: [country.maps.long, country.maps.lat],
        zoom: 5,
      });
    }
  }, [country]);

  function getCountry(country) {
    http.setBaseUrl("https://travelbriefing.org");
    http
      .get(`/${country}?format=json`)
      .then((data) => {
        setCountry(data);
        getTime(data);
      })
      .catch((err) => {
        console.error("OOPS:" + err);
      });
  }

  function getTime(country) {
    http.setBaseUrl("http://worldtimeapi.org");
    http
      .get(`/api/timezone/${country.timezone.name}`)
      .then((data) => {
        setTime(data);
      })
      .catch((err) => {
        console.error("OOPS:" + err);
      });
  }

  function handleNameChange(event) {
    const value = event.target.value;
    const newValue = value.charAt(0).toUpperCase() + value.slice(1);
    if (countries.indexOf(newValue) !== -1) {
      getCountry(newValue);
    }
  }

  if (Object.keys(country).length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <header>
        <h1>Travelbuddy</h1>
      </header>
      <Form countries={countries} onNameChange={handleNameChange} />
      <main>
        <div className="info">
          <Info1 country={country} time={time} />
          <Info2 country={country} mapRef={mapRef} />
        </div>
      </main>
      {/*<pre>{JSON.stringify(country, null, 3)}</pre>*/}
    </>
  );
}

export default App;
