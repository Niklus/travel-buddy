function Form(props) {
  return (
    <form className="datalist">
      <input
        list="countries"
        id="myCountry"
        name="myCountry"
        placeholder="Search for a country"
        onChange={props.onNameChange}
      />
      <datalist id="countries">
        {props.countries.map((country) => {
          return <option key={country} value={`${country}`} />;
        })}
      </datalist>
    </form>
  );
}

export default Form;
