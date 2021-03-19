import { useState, useEffect, useLayoutEffect } from "react";
import dayjs from "dayjs";
import Http from "./utils/http";
import mapboxgl from "mapbox-gl";
import countries from "./countries";

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
        console.log(data);
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
      <div className="datalist">
        <input
          list="countries"
          id="myCountry"
          name="myCountry"
          placeholder="Search for a country"
          onChange={handleNameChange}
        />
        <datalist id="countries">
          {countries.map((country) => {
            return <option key={country} value={`${country}`} />;
          })}
        </datalist>
      </div>
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
              <h3>{country.names.full}</h3>
            </div>
          </section>
          <section>
            <h2>
              Travel Advice <span className="material-icons">flight</span>
            </h2>
            <hr />
            <p>{country.advise.UA.advise}</p>
            <p
              dangerouslySetInnerHTML={{ __html: country.advise.CA.advise }}
            ></p>
          </section>
          <section>
            <h2>
              Drinking Water <span className="material-icons">local_drink</span>
            </h2>
            <hr />
            <p>
              Drinking tap water in {country.names.name} is{" "}
              {country.water.short}
            </p>
          </section>
          <section>
            <h2>
              Language <span className="material-icons">language</span>
            </h2>
            <hr />
            <p>
              The language(s) spoken in {country.names.name} is{" "}
              {country.language[0].language}{" "}
              {country.language[1] ? "& " + country.language[1].language : null}
            </p>
          </section>
          <section>
            <h2>
              Time Zone <span className="material-icons">schedule</span>
            </h2>
            <hr />
            <p>{country.timezone.name}</p>
            <p>
              {dayjs(time.datetime).format("MMM D YYYY")}
              <span> {time.abbreviation}</span>
            </p>
          </section>
          <section>
            <h2>
              Currency <span className="material-icons">account_balance</span>
            </h2>
            <hr />
            <p>
              The currency in {country.names.name} is {country.currency.name} -{" "}
              {country.currency.code}
            </p>
          </section>
        </div>
        <div>
          <div id="map" style={{ width: "470px", height: "500px" }}></div>
          <section>
            <h2>
              Telephone <span className="material-icons">call_end</span>
            </h2>
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
          <section>
            <h2>
              Electricity <span className="material-icons">bolt</span>
            </h2>
            <hr />
            <p>Voltage: {country.electricity.voltage} Volt</p>
            <p>Frequency: {country.electricity.frequency} Herz</p>
          </section>
        </div>
      </main>
      {/*<pre>{JSON.stringify(country, null, 3)}</pre>*/}
    </>
  );
}

export default App;
