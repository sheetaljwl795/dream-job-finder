var userId = "cgdmCgyPmLm9gZv";
var keywordEl = document.querySelector('#keyword');
var locationEl = document.querySelector('#location');
var radiusEl = document.querySelector('#radius');
var sortColumns = 0;
var sortOrder = 0;
var startRecord = 0;
var pageSize = 25;
var daysEl = document.querySelector('#days');
var jobsContainerEl= document.querySelector('#jobs-container');
var jobSearchTerm = document.querySelector('job-search-term');
var userFormEl = document.querySelector('#user-form');
var savedJobs = [];
var savedListEl = document.querySelector('#savedList')


var formSubmitHandler = function(event) {
    event.preventDefault();

    var keyword = keywordEl.value.trim();
    var location = locationEl.value.trim();
    var radius = radiusEl.value.trim();
    var days = daysEl.value.trim();

    getJobs(keyword,location,radius,days);
};


var getJobs = function(val1, val2, val3, val4) {
    var apiUrl = 'https://api.careeronestop.org/v1/jobsearch/cgdmCgyPmLm9gZv/' + val1 + '/' + val2 + '/' + val3 + '/0/0/0/25/' + val4 + '?source=NLx&showFilters=false';
    console.log(apiUrl);
    
    fetch(apiUrl, {
        headers: {Authorization: "Bearer fp63rEjnLUMlR+EolzxiYFhWBRxeLUH6GeNtjPUeRBxtpmZl0E76E9iGBGGVeVOpYbTh/U2kf1ao8pD4+0XStA=="}})

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

var displayJobs = function(jobcount, jobsearchKeyword) {
    if (jobcount.length === 0) {
        jobsContainerEl.textContent = 'No jobs found.';
        return;
      }
    
      // jobSearchTerm.textContent = jobsearchKeyword;
    
      for (var i = 0; i < jobcount.length; i++) {
        var jobName ="Company Name: " + jobcount[i].Company + '; Job Title: ' + jobcount[i].JobTitle + '; Location: ' + jobcount[i].Location  +  '; Posted on: ' + jobcount[i].AccquisitionDate;
    
        

        var jobEl = document.createElement('p');
        jobEl.classList = 'list-item flex-row justify-space-between align-center';
        jobEl.textContent = jobName

        var urlEl = document.createElement('a');
        urlEl.textContent = "Click here for more details -->"
        urlEl.setAttribute('href', jobcount[i].URL,);
        urlEl.setAttribute('target', '_blank');
   
    
        jobEl.appendChild(urlEl); 

        var saveEl = document.createElement('BUTTON');
        saveEl.classList = 'flex-row align-center';
        saveEl.innerText = "Save Job";
        saveEl.value = i       

        jobEl.appendChild(saveEl);
        jobsContainerEl.appendChild(jobEl);
        

        saveEl.addEventListener("click", function(event) {

          console.log("saved job button clicked")
          console.log(event.target.parentNode)
          console.log(event.target.parentNode.innerText)

            savedJobs.push(event.target.parentNode.innerText);
            localStorage.setItem('jobs', JSON.stringify(savedJobs)); 

            var sListEl = document.createElement("ul");

            console.log(localStorage.getItem("jobs"));

            sListEl.textContent = localStorage.getItem("jobs");
            console.log(sListEl.textContent);

            savedListEl.appendChild(sListEl);
        }
        ); 
      }  

    };

  


  //  var saveJob = function(test) {
  //     savedJobs.push(test);
  //     localStorage.setItem('jobs', JSON.stringify(savedJobs));     
  //   };
    

  // var initSavedJobs = function () {
  //     var storedJobsList = localStorage.getItem('savedjobs');
  //     if (storedJobsList) {
  //       savedJobs = JSON.parse(storedJobsList);
  //     }
  //     renderstoredJobsList();
  //   }


userFormEl.addEventListener('submit', formSubmitHandler);

  
