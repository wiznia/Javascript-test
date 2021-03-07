import "./index.css";
// Had to import this module so I could use async/await with Webpack
import 'regenerator-runtime/runtime';

// Data is not coming from the API but from the actual HTML file so I rebuild the table structure with the proper updated data each time the page loads
function buildTablesHTML(data) {
  const isAvailable = data.available;
  return `
    <tr data-upin="${data.upin}" class="${!isAvailable ? 'unavailable' : ''}">
      <td>${data.name}</td>
      <td>${data.zipCode}</td>
      <td>${data.city}</td>
      <td><button class="button button-outline">Mark as ${isAvailable ? 'Unavailable' : 'Available'}</button></td>
    </tr>
  `;
};

function rebuildTablesHTML(data) {
  // Clear the tables so we can update it accordingly
  document.querySelector('#doctors').innerHTML = '';
  data.forEach(data => {
    document.querySelector('#doctors').innerHTML += buildTablesHTML(data);
  });
};

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
    rebuildTablesHTML(data);
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

// Select behavior
document.querySelector('#availabilityFilterSelect').addEventListener('change', function() {
  const selectedOption = this.value;

  fetchDoctors(selectedOption);
});


// Available/Unavailable button behavior
document.addEventListener('click', function(e) {
  const el = e.target;

  if (!el.matches('.button')) {
    return;
  }

  const upin = el.closest('[data-upin]').dataset.upin;
  const available = el.innerText.includes('UNAVAILABLE') ? false : true;
  const data = {
    available
  }

  updateAvailable(upin, data);
});

async function updateAvailable(upin, data) {
  await updateDoctors(upin, data);
  fetchDoctors();
};

async function getData() {
  await getLocationInfo();
  fetchDoctors();
};

getData();
