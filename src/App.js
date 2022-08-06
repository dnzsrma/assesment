import Container from "react-bootstrap/Container";
import CountryTable from "./Components/Table";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function App() {
  const axios = require("axios").default;
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    fetchAll();
  }, []);

  function fetchAll() {
    axios
      .get("https://restcountries.com/v2/all")
      .then(function (response) {
        setCountries(response.data);
        return response.data;
      })
      .then((result) => setAllCountries(result));
  }

  function handleChange(e) {
    let keyword = e.target.value.toString().toLocaleLowerCase("tr");
    if (searchType !== "all") {
      if (e.target.value.length > 0) {
        let noUndefCountries = allCountries.filter(
          (country) => country[searchType]
        );
        let filteredCountries = noUndefCountries.filter((country) =>
          country[searchType].toLowerCase().includes(keyword)
        );
        setCountries(filteredCountries);
      } else {
        setCountries(allCountries);
      }
    } else {
      function typeCheck(item) {
        if (typeof item === "string" || typeof item === "number") {
          return true;
        }
      }
      function includesKeyword(item) {
        if (item.toString().toLowerCase().includes(keyword)) {
          return true;
        }
      }
      let newCountries = allCountries.filter(function crawl(country) {
        if (Array.isArray(country)) {
          for (let i = 0; i < country.length; i++) {
            if (typeCheck(country[i]) && includesKeyword(country[i])) {
              return true;
            } else {
              if (crawl(country[i])) {
                return true;
              }
            }
          }
        } else if (typeof country === "object") {
          let keys = Object.keys(country);
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (typeCheck(country[key]) && includesKeyword(country[key])) {
              return true;
            } else {
              if (crawl(country[key])) {
                return true;
              }
            }
          }
        } else {
          if (typeCheck(country) && includesKeyword(country)) {
            return true;
          }
        }
        return false;
      });
      setCountries(newCountries);
    }
  }

  function handleSelect(e) {
    setSearchType(e.target.value);
    setCountries(allCountries);
  }

  return (
    <div>
      <Container>
        <Form column={"sm"}>
          <Row>
            <Col>
              <Form.Label>Search</Form.Label>
              <Form.Control onChange={handleChange} />
            </Col>
            <Col>
              <Form.Label>By</Form.Label>
              <Form.Select onChange={handleSelect}>
                <option value="all">All</option>
                <option value="name">Name</option>
                <option value="capital">Capital</option>
                <option value="region">Region</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <button onClick={() => console.log(allCountries)} />
        <CountryTable countries={countries} />
        {countries.length < 1 && <h1>No country found!</h1>}
      </Container>
    </div>
  );
}

export default App;
