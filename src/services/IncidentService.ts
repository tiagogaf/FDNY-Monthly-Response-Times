const API_URL = "https://data.cityofnewyork.us/resource/j34j-vqvt.json";

export interface IncidentType {
  yearmonth: string;
  incidentclassification: string;
  incidentborough: string;
  incidentcount: number;
  averageresponsetime: string;
}

const fetchData = async () => {
  const data = await fetch(API_URL);

  if (!data.ok) {
    new Error("Error fetching data");
  }

  return data.json() as unknown as IncidentType[];
};

export { fetchData };
