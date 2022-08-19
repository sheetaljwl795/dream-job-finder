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
    
    fetch(apiUrl, {
        headers: {Authorization: "Bearer fp63rEjnLUMlR+EolzxiYFhWBRxeLUH6GeNtjPUeRBxtpmZl0E76E9iGBGGVeVOpYbTh/U2kf1ao8pD4+0XStA=="}})

    .then(function (response) {
        if (response.ok) {
   
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

        var urlEl = document.createElement('a');
        urlEl.textContent = "Click here for more details -->"
        urlEl.setAttribute('href', jobcount[i].URL,);
        urlEl.setAttribute('target', '_blank');
   
    
        jobEl.appendChild(urlEl); 

        var saveEl = document.createElement('BUTTON');
        saveEl.classList = 'flex-row align-center';
        saveEl.innerText = "Save Job";        

        jobEl.appendChild(saveEl);
        jobsContainerEl.appendChild(jobEl);
        

        saveEl.addEventListener("click", function(event) {
          
          console.log(event);
          console.log(event.target.parentElement.childNodes)
          // console.log(event.target.parentElement.childNodes.NodeList.children)
          // console.log(event.target.parentElement.childNodes(0).data)
          // console.log(event.target.parentElement.childNodes(0).textContent)
          // console.log(event.target.parentElement.childNodes(0).nodeValue)
        


           var sList = event.target.parentNode.innerText;
           //var temp = text.split(sList "Company Name:”)

           console.log(sList)
           var temp = sList.split("Company Name:")
           console.log(temp)
           

           savedJobs.push(event.target.parentNode.innerText);
            

            localStorage.setItem('jobs', JSON.stringify(savedJobs)); 

            var sListEl = document.createElement("li");
            sListEl.setAttribute("id","likedjob");

            
            var last = savedJobs[savedJobs.length - 1];
            // var last = localStorage.getItem(jobs.length -1);
            console.log(last);

            sListEl.textContent = last;
            savedListEl.appendChild(sListEl);
        }
        ); 
      }  

    };

userFormEl.addEventListener('submit', formSubmitHandler);

  
