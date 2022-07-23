import Container from 'react-bootstrap/Container';
import CountryTable from './Components/Table';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function App() {
  const axios = require('axios').default;
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    fetchAll();
  }, []);


  function fetchAll() {
    axios.get("https://restcountries.com/v2/all")
      .then(function (response) {
        setCountries(response.data);
        return response.data
      })
      .then(
        result =>
          setAllCountries(result)
      )
  }

  function handleChange(e) {
    let keyword = e.target.value.toString().toLowerCase();
    if (searchType !== 'all') {
      if (e.target.value.length > 0) {
        let noUndefCountries = allCountries.filter(country => country[searchType])
        let filteredCountries = noUndefCountries.filter(country => country[searchType].toLowerCase().includes(keyword))
        setCountries(filteredCountries)
      }
      else {
        setCountries(allCountries)
      }
    }
    else {
        let newCountries = []
        allCountries.map((country) => {
          let keys = Object.keys(country);
          let filtered = keys.filter((key) => {
            if(typeof(country[key]) === "string"){
              return country[key].toString().toLowerCase().includes(keyword)
            }
          })
          if (filtered.length > 0) {
            console.log(country)
            newCountries.push(country)
          }
        })
        setCountries(newCountries)
    }
  }

  function handleSelect(e) {
    setSearchType(e.target.value)
    setCountries(allCountries)
  }

  return (
    <div>
      <Container>
        <Form column={'sm'}>
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
        <CountryTable countries={countries} />
        {countries.length < 1 &&
          <h1>No country found!</h1>
        }
      </Container>
    </div>
  );
}

export default App;
