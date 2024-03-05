---
title: Database Get Method 
layout: base
description: This fetches a Java RESTful API Get method to return a table 
permalink: /java/database
---

## SQL Database Fetch (Java)
<!-- HTML table fragment for page -->
<table>
  <thead>
  <tr>
    <th>Name</th>
    <th>ID</th>
    <th>Age</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>

<!-- Script sequence (has no function) and will execute when the page is loaded -->
<script>
  // Prepare HTML result container for new output
  const resultContainer = document.getElementById("result");

  // URI identifies the resource
  let URI = '';
  if (location.hostname === "localhost") {
      URI = "http://localhost:8085";
  } else if (location.hostname === "127.0.0.1") {
          URI = "http://127.0.0.1:8085";
  } else {
          URI = "https://spring.nighthawkcodingsociety.com";
  }
  // URL identifies the web address login
  // prepare URL
  const URL = URI + '/api/person/';

  // Set options for cross-origin header request
  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // fetch the API
  fetch(URL, options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // Check for response errors and display
      if (response.status !== 200) {
          const errorMsg = 'Database response error: ' + response.status;
          console.log(errorMsg);
          const tr = document.createElement("tr");
          const td = document.createElement("td");
          td.innerHTML = errorMsg;
          tr.appendChild(td);
          resultContainer.appendChild(tr);
          return;
      }
      // valid response will contain JSON data
      response.json().then(data => {
          console.log(data);
          for (const row of data) {
            // tr and td build out for each row
            const tr = document.createElement("tr");
            const name = document.createElement("td");
            const id = document.createElement("td");
            const age = document.createElement("td");
            // data is specific to the API
            name.innerHTML = row.name; 
            id.innerHTML = row.email; 
            age.innerHTML = row.age; 
            // this build td's into tr
            tr.appendChild(name);
            tr.appendChild(id);
            tr.appendChild(age);
            // add HTML to container
            resultContainer.appendChild(tr);
          }
      })
  })
  // catch fetch errors (ie ACCESS to server blocked)
  .catch(err => {
    console.error(err);
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = err + ": " + url;
    tr.appendChild(td);
    resultContainer.appendChild(tr);
  });
</script>
