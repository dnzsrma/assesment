
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function CountryTable(props) {
  const countries = props.countries

  return (
    <div>
      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(country =>
            <tr key={country.alpha3Code}>
              <td>{country.name}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td><Image style={{ width: "100px" }} alt={country.name + " flag"} src={country.flag} fluid={true}></Image></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CountryTable;
