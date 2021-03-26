function Info2(props) {
  const { country, mapRef } = props;
  return (
    <div className="info2">
      <div
        id="map"
        style={{ width: "470px", height: "500px" }}
        ref={mapRef}
      ></div>
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
  );
}

export default Info2;
