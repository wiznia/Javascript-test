import "./index.css";
// Had to import this module so I could use async/await with Webpack
import 'regenerator-runtime/runtime';

async function getLocationInfo() {
  // We first get the static HTML so we can insert its location properties to the API
  Array.from(document.querySelectorAll('[data-upin]')).forEach(doctor => {
    const upin = doctor.dataset.upin;
    const zipCode = parseInt(doctor.querySelectorAll('td')[1].innerHTML);
    const city = doctor.querySelectorAll('td')[2].innerHTML;
    const location = {
      zipCode,
      city
    };

    updateDoctors(upin, location);
  });
}

async function fetchDoctors(param) {
  const params = param ? `?${param}=true` : '';
  const response = await fetch(`${process.env.API}/doctors${params}`);
  response.json().then(data => {
    // Rebuild tables once the data arrives
  }).catch(error => {
    console.error('Error:', error);
  });
};

async function updateDoctors(upin, data) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  await fetch(`${process.env.API}/doctors/${upin}`, options)
    .then(response => { return response.json() })
    .then(data => {
      console.log('Successfully updated API info', data);
    }).catch(error => {
      console.error('Error:', error);
    });
};

async function getData() {
  await getLocationInfo();
  fetchDoctors();
};

getData();
