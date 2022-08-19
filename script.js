var userId = "cgdmCgyPmLm9gZv";
var keywordEl = document.querySelector('#keyword');
var locationEl = document.querySelector('#location');
var radiusEl = document.querySelector('#radius');
var sortColumns = 0;
var sortOrder = 0;
var startRecord = 0;
var pageSize = 25;
var daysEl = document.querySelector('#days');
var jobsContainerEl = document.querySelector('#jobs-container');
var jobSearchTerm = document.querySelector('job-search-term');
var userFormEl = document.querySelector('#user-form');
var savedJobs = [];
// weather api key variables
var weatherZip = document.querySelector('#zip');
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9"
var weatherApiUrl = "https://api.openweathermap.org";
var weatherSubmit = document.querySelector(".weather-form")

var formSubmitHandler = function (event) {
  event.preventDefault();

  var keyword = keywordEl.value.trim();
  var location = locationEl.value.trim();
  var radius = radiusEl.value.trim();
  var days = daysEl.value.trim();

  getJobs(keyword, location, radius, days);
  fetchWeather();
};


var getJobs = function (val1, val2, val3, val4) {
  var apiUrl = 'https://api.careeronestop.org/v1/jobsearch/cgdmCgyPmLm9gZv/' + val1 + '/' + val2 + '/' + val3 + '/0/0/0/25/' + val4 + '?source=NLx&showFilters=false';
  console.log(apiUrl);

  fetch(apiUrl, {
    headers: { Authorization: "Bearer fp63rEjnLUMlR+EolzxiYFhWBRxeLUH6GeNtjPUeRBxtpmZl0E76E9iGBGGVeVOpYbTh/U2kf1ao8pD4+0XStA==" }
  })

    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(data.Jobs);
          console.log(keywordEl.value.trim());
          displayJobs(data.Jobs, keywordEl.value.trim());
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })

    .catch(function (error) {
      alert('Unable to connect to CareerOneStop');
    });

}

var displayJobs = function (jobcount, jobsearchKeyword) {
  if (jobcount.length === 0) {
    jobsContainerEl.textContent = 'No jobs found.';
    return;
  }

  // jobSearchTerm.textContent = jobsearchKeyword;

  for (var i = 0; i < jobcount.length; i++) {
    var jobName = jobcount[i].Company + '/' + jobcount[i].JobTitle + '/' + jobcount[i].Location + '/' + jobcount[i].AccquisitionDate;

    // click event around here for weather api call

    var jobEl = document.createElement('a');
    jobEl.classList = 'list-item flex-row justify-space-between align-center';
    jobEl.setAttribute('href', jobcount[i].URL);

    var titleEl = document.createElement('span');
    titleEl.textContent = jobName;

    jobEl.appendChild(titleEl);


    var saveEl = document.createElement('BUTTON');
    saveEl.classList = 'flex-row align-center';
    saveEl.innerText = "Save";
    saveEl.setAttribute('button', "onclick=()");

    // localStorage.setItem("savedJobs")
    // savedJobs.push(jobName) }");

    jobEl.appendChild(saveEl);

    jobsContainerEl.appendChild(jobEl);

  }
};



userFormEl.addEventListener('submit', formSubmitHandler);


// weather api call
// based off of zip
//function renderItems(city, data) {
//   renderCurrentWeather(city, data.current, data.timezone);
// }

function fetchWeather(location) {
  var zipCode = locationEl.value.trim();
  console.log(zipCode);
  var apiUrl = `${weatherApiUrl}/data/2.5/forecast?zip=${zipCode},us&appid=${apiKey}`;

  fetch(apiUrl)

    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json()
          .then(function (data) {
            console.log(data);
            console.log(data.list.city);
           // console.log(locationEl.value.trim());
            // renderItems(data.city, weatherZip.value.trim());
          });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
}

// weather submit button
// var weatherSubmitBtn = function (event) {
//   event.preventDefault();
// }
// weatherSubmit.addEventListener('click', weatherSubmitBtn);

//display jobs function

//var displayWeather = d

// init() function