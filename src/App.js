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
  const [searchType, setSearchType] = useState("capital");

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
    if (e.target.value.length > 0) {
      let keyword = e.target.value.toString().toLowerCase();
      let noUndefCountries = allCountries.filter(country => country[searchType])
      let filteredCountries = noUndefCountries.filter(country => country[searchType].toLowerCase().includes(keyword))
      setCountries(filteredCountries)
    }
    else {
      setCountries(allCountries)
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
                <option value="capital">Capital</option>
                <option value="name">Name</option>
                <option value="region">Region</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <CountryTable countries={countries} />
      </Container>
    </div>
  );
}

export default App;
