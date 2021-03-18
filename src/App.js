import { useState, useEffect, useLayoutEffect } from "react";
import Http from "./utils/http";
import mapboxgl from "mapbox-gl";

const http = new Http();

function App() {
  const [country, setCountry] = useState({});
  const [time, setTime] = useState("");

  useEffect(() => {
    getCountry("Sweden");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmlrbHVzIiwiYSI6ImNrZm51bm11MDJjOXoycm52Y3V1Z2VoMjcifQ.ZdjynuwEJtkaktmIpVCyqg";

    if (Object.keys(country).length !== 0) {
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

  if (Object.keys(country).length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <header>
        <h1>Travelbuddy</h1>
      </header>
      <main>
        <div className="info">
          <section className="name">
            <img
              src={`https://flagcdn.com/${country.names.iso2.toLowerCase()}.svg`}
              height="120px"
              alt={country.names.name}
            />
            <div>
              <h1>{country.names.name}</h1>
              <h1>{country.names.full}</h1>
            </div>
          </section>
          <section>
            <h2>Travel Advice</h2>
            <hr />
            <p>{country.advise.UA.advise}</p>
            <p
              dangerouslySetInnerHTML={{ __html: country.advise.CA.advise }}
            ></p>
          </section>
          <section>
            <h2>Drinking Water</h2>
            <hr />
            <p>
              Drinking tap water in {country.names.name} is{" "}
              {country.water.short}
            </p>
          </section>
          <section>
            <h2>Language</h2>
            <hr />
            <p>
              The language(s) spoken in {country.names.name} is{" "}
              {country.language[0].language}{" "}
              {country.language[1] ? "& " + country.language[1].language : null}
            </p>
          </section>
          <section>
            <h2>Time Zone</h2>
            <hr />
            <p>{country.timezone.name}</p>
            <p>{time.datetime}</p>
          </section>
          <section>
            <h2>Currency</h2>
            <hr />
            <p>
              The currency in {country.names.name} is {country.currency.name} -{" "}
              {country.currency.code}
            </p>
          </section>
          <section>
            <h2>Telephone</h2>
            <hr />
            <p style={{ lineHeight: "30px" }}>
              Calling Code: +{country.telephone.calling_code}
              <br />
              Police: {country.telephone.police}
              <br />
              Ambulance: {country.telephone.ambulance}
              <br />
              Fire: {country.telephone.fire}
            </p>
          </section>
        </div>
        <div id="map" style={{ width: "450px", height: "500px" }}></div>
      </main>
      <pre>{JSON.stringify(country, null, 3)}</pre>
    </>
  );
}

export default App;
