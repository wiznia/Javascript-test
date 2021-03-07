require('jest-fetch-mock').enableMocks();

describe('search input and button gets generated dynamically', () => {
  it('renders the input text and search button', () => {
    document.body.innerHTML = `
      <form class="form">
        <input type="text" class="search-input" placeholder="Search">
        <input type="submit" value="Search">
      </form>`;

    expect(document.querySelector('.form')).not.toBeNull();
    expect(document.querySelector('.search-input')).not.toBeNull();
    expect(document.querySelector('[type="submit"]')).not.toBeNull();
  });
});

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls the API and returns data', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: 
      [{
        "upin": 202029,
        "name": "John Doe",
        "available": false,
        "zipCode": 92037,
        "city": "La Jolla"
      },
      {
        "upin": 402910,
        "name": "Nick Ramsen",
        "available": true,
        "zipCode": 92037,
        "city": "La Jolla"
      },
      {
        "upin": 910291,
        "name": "Liz Redfield",
        "available": false,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 202914,
        "name": "Javier Garcia",
        "available": true,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 394840,
        "name": "Harry Bone",
        "available": true,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 982170,
        "name": "Kevin Lamkin",
        "available": true,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 393920,
        "name": "Andrew Stuart",
        "available": true,
        "zipCode": 92037,
        "city": "La Jolla"
      },
      {
        "upin": 655942,
        "name": "Maggie Willians",
        "available": true,
        "zipCode": 92037,
        "city": "San Diego"
      }]}
    ));

    //assert on the response
    fetch('http://localhost:3030/doctors').then(res => res.json()).then(res => {
      expect(res.data).toEqual(
      [{
        "upin": 202029,
        "name": "John Doe",
        "available": false,
        "zipCode": 92037,
        "city": "La Jolla"
      },
      {
        "upin": 402910,
        "name": "Nick Ramsen",
        "available": true,
        "zipCode": 92037,
        "city": "La Jolla"
      },
      {
        "upin": 910291,
        "name": "Liz Redfield",
        "available": false,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 202914,
        "name": "Javier Garcia",
        "available": true,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 394840,
        "name": "Harry Bone",
        "available": true,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 982170,
        "name": "Kevin Lamkin",
        "available": true,
        "zipCode": 92015,
        "city": "San Diego"
      },
      {
        "upin": 393920,
        "name": "Andrew Stuart",
        "available": true,
        "zipCode": 92037,
        "city": "La Jolla"
      },
      {
        "upin": 655942,
        "name": "Maggie Willians",
        "available": true,
        "zipCode": 92037,
        "city": "San Diego"
      }])
    });

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3030/doctors')
  });

  it('searches for a specific name and returns its data', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: 
      [{
        "upin": 202029,
        "name": "John Doe",
        "available": false,
        "zipCode": 92037,
        "city": "La Jolla"
      }]}
    ));

    fetch('http://localhost:3030/doctors?q=John Doe').then(res => res.json()).then(res => {
      expect(res.data).toEqual(
      [{
        "upin": 202029,
        "name": "John Doe",
        "available": false,
        "zipCode": 92037,
        "city": "La Jolla"
      }])
    });

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3030/doctors?q=John Doe')
  });
});
