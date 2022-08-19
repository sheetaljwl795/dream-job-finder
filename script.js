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

// Captures Form Inputs
var formSubmitHandler = function(event) {
    event.preventDefault();
  // varibles to define form values
    var keyword = keywordEl.value.trim();
    var location = locationEl.value.trim();
    var radius = radiusEl.value.trim();
    var days = daysEl.value.trim();

  // function to get and display jobs by passing above variables

    getJobs(keyword,location,radius,days);
};


var getJobs = function(val1, val2, val3, val4) {
    var apiUrl = 'https://api.careeronestop.org/v1/jobsearch/cgdmCgyPmLm9gZv/' + val1 + '/' + val2 + '/' + val3 + '/0/0/0/25/' + val4 + '?source=NLx&showFilters=false';
    //Fetching Bearer token
    fetch(apiUrl, {
        headers: {Authorization: "Bearer fp63rEjnLUMlR+EolzxiYFhWBRxeLUH6GeNtjPUeRBxtpmZl0E76E9iGBGGVeVOpYbTh/U2kf1ao8pD4+0XStA=="}})

    .then(function (response) {
        if (response.ok) {
   // Getting 
        response.json().then(function (data) {
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
// Display jobs  is to show the results 
var displayJobs = function(jobcount, jobsearchKeyword) {
    if (jobcount.length === 0) {
        jobsContainerEl.textContent = 'No jobs found.';
        return;
      }    
  
      for (var i = 0; i < jobcount.length; i++) {
        var jobName ="Company Name: " + jobcount[i].Company + '; Job Title: ' + jobcount[i].JobTitle + '; Location: ' + jobcount[i].Location  +  '; Posted on: ' + jobcount[i].AccquisitionDate;
    
        
        var jobEl = document.createElement('p');
        jobEl.classList = 'list-item flex-row justify-space-between align-center';
        jobEl.textContent = jobName
        //Adding jobs url link Click here for more details -->
        var urlEl = document.createElement('a');
        urlEl.textContent = "Click here for more details -->"
        urlEl.setAttribute('href', jobcount[i].URL,);
        urlEl.setAttribute('target', '_blank');
   
    
        jobEl.appendChild(urlEl); 
        // Making a list of intrested job for followup
        var saveEl = document.createElement('BUTTON');
        saveEl.classList = 'flex-row align-center';
        saveEl.innerText = "Save Job";        

        jobEl.appendChild(saveEl);
        jobsContainerEl.appendChild(jobEl);
        
       // using the local stoage for saved job
        saveEl.addEventListener("click", function(event) {          

           savedJobs.push(event.target.parentNode.innerText);        
           localStorage.setItem('jobs', JSON.stringify(savedJobs)); 

            var sListEl = document.createElement("li");
            sListEl.setAttribute("id","likedjob");
      
            var tempJobs = JSON.parse(localStorage.getItem("jobs"));
            var last = tempJobs[tempJobs.length - 1];
 
            sListEl.textContent = last;
            savedListEl.appendChild(sListEl);
        }
        ); 
      }  

    };

userFormEl.addEventListener('submit', formSubmitHandler);

  
