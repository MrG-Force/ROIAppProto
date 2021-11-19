const baseUrl = "http://localhost:63192";

const getDepartmentsFromApi = async () => {
  const relUrl = "/PeopleService.asmx/GetDepartments";
  try {
    let response = await fetch(new URL(relUrl, baseUrl), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let departments = await response.json();
    return departments;
  } catch (error) {
    console.error(error);
  }
};

const getPeopleFromApi = async () => {
  const relUrl = "/PeopleService.asmx/GetPeople";
  try {
    let response = await fetch(new URL(relUrl, baseUrl), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let people = await response.json();
    return people;
  } catch (error) {
    console.error(error);
  }
};

const getPersonfromApi = async (id) => {
  const relUrl = `/PeopleService.asmx/GetPersonById?Id="${id}"`;
  try {
    let response = await fetch(new URL(relUrl, baseUrl), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let person = await response.json();
    return person;
  } catch (error) {
    console.error(error);
  }
};

const deletePerson = async (id) => {
  const relUrl = `/PeopleService.asmx/DeletePerson?id="${id}"`;
  try {
    let response = await fetch(new URL(relUrl, baseUrl), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

function peoplePostApiCommand(operation, args) {
  const relUrl = "/PeopleService.asmx/" + operation;
  return fetch(new URL(relUrl, baseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
}

const getDummies = () => {
  return {
    d: [
      {
        Id: 1,
        Name: "John Smith",
        Phone: "0299882211",
        Department: 1,
        Address: {
          Street: "1 Code Lane",
          City: "Javaville",
          State: "NSW",
          Zip: "0100",
          Country: "Australia",
        },
      },
      {
        Id: 2,
        Name: "Sue White",
        Phone: "0388992255",
        Department: 2,
        Address: {
          Street: "16 Bit Way",
          City: "Byte Cove",
          State: "QLD",
          Zip: "1101",
          Country: "Australia",
        },
      },
      {
        Id: 3,
        Name: "Bob O'Bits",
        Phone: "0577882255",
        Department: 3,
        Address: {
          Street: "8 Silicon Road",
          City: "Cloud Hills",
          State: "VIC",
          Zip: "1001",
          Country: "Australia",
        },
      },
      {
        Id: 4,
        Name: "Mary Blue",
        Phone: "0644559988",
        Department: 2,
        Address: {
          Street: "4 Processor Boulevard",
          City: "Appleston",
          State: "NT",
          Zip: "1010",
          Country: "Australia",
        },
      },
      {
        Id: 5,
        Name: "Michael Green",
        Phone: "0299881122",
        Department: 3,
        Address: {
          Street: "700 Bandwidth street",
          City: "Bufferland",
          State: "NSW",
          Zip: "0110",
          Country: "Germany",
        },
      },
      {
        Id: 7,
        Name: "Matias Strings",
        Phone: "04155545678",
        Department: 4,
        Address: {
          Street: "101 Fortran Avenue",
          City: "Props City",
          State: "NIR",
          Zip: "69695",
          Country: "United Kingdom",
        },
      },
      {
        Id: 8,
        Name: "Maria Params",
        Phone: "0455678900",
        Department: 0,
        Address: {
          Street: "99 Double Var",
          City: "Stringy Hills",
          State: "NT",
          Zip: "0362",
          Country: "Australia",
        },
      },
      {
        Id: 10,
        Name: "Peter Threads",
        Phone: "0456786321",
        Department: 4,
        Address: {
          Street: "45 App lane",
          City: "Mount Schema",
          State: "TAS",
          Zip: "8907",
          Country: "Australia",
        },
      },
    ],
  };
};

export {
  getDepartmentsFromApi,
  getPeopleFromApi,
  getDummies,
  peoplePostApiCommand,
  getPersonfromApi,
  deletePerson,
};
