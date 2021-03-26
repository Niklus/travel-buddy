import dayjs from "dayjs";

function Info1(props) {
  const { country, time } = props;

  return (
    <div className="info1">
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
        <p dangerouslySetInnerHTML={{ __html: country.advise.CA.advise }}></p>
      </section>
      <section>
        <h2>
          Drinking Water <span className="material-icons">local_drink</span>
        </h2>
        <hr />
        <p>
          Drinking tap water in {country.names.name} is {country.water.short}
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
  );
}

export default Info1;
