import { useEffect, useState } from "react";
import { fetchData, IncidentType } from "../services/IncidentService";

const Incidents = () => {
  const [data, setData] = useState<IncidentType[]>([]);
  const [filteredData, setFilteredData] = useState<IncidentType[]>([]);
  const [filter, setFilter] = useState<{
    borough: string;
    classification: string;
    yearmonth: string;
  }>({
    borough: "",
    classification: "",
    yearmonth: "",
  });

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (incident) =>
          incident.incidentborough
            .toLowerCase()
            .includes(filter.borough.toLowerCase()) &&
          incident.incidentclassification
            .toLowerCase()
            .includes(filter.classification.toLowerCase()) &&
          incident.yearmonth
            .toLowerCase()
            .includes(filter.yearmonth.toLowerCase())
      )
    );
  }, [data, filter]);

  return (
    <div>
      <p>Incidents: {filteredData.length}</p>

      <div>
        <input
          placeholder="Year/Month"
          value={filter.yearmonth}
          onChange={(event) => {
            setFilter({
              ...filter,
              yearmonth: event.target.value,
            });
          }}
        />
        <input
          placeholder="Classification"
          value={filter.classification}
          onChange={(event) => {
            setFilter({
              ...filter,
              classification: event.target.value,
            });
          }}
        />
        <input
          placeholder="Borough"
          value={filter.borough}
          onChange={(event) => {
            setFilter({
              ...filter,
              borough: event.target.value,
            });
          }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <td>
              <b>Year/Month</b>
            </td>
            <td>
              <b>Classification</b>
            </td>
            <td>
              <b>Borough</b>
            </td>
            <td>
              <b>Count</b>
            </td>
            <td>
              <b>Average response time</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((incident, index) => (
            <tr key={index}>
              <td>{incident.yearmonth}</td>
              <td>{incident.incidentclassification}</td>
              <td>{incident.incidentborough}</td>
              <td>{incident.incidentcount}</td>
              <td>{incident.averageresponsetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Incidents;
