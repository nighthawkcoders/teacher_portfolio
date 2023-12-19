---
layout: base
title: Database Get
hide: true
description: An advanced example of database CRUD (Create, Read, Update, Delete).  This articles is focussed on Read.  Each operation works asynchronously between JavaScript and a Python/Flask backend Database.  This requires a set of Python RESTful API services for Get, Put, Delete, and Update.
permalink: /data/database
---

## SQL Database Fetch

<!-- HTML table layout for page.  The table is filled by JavaScript below. 
-->
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

<!-- 
Below JavaScript code fetches user data from an API and displays it in a table. It uses the Fetch API to make a GET request to the '/api/users/' endpoint.   Refer to config.js to see additional options. 

The script is laid out in a sequence (no function) and will execute when page is loaded.
-->
<script type="module">
  // uri variable and options object are obtained from config.js
  import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

  // Set Users endpoint (list of users)
  const url = uri + '/api/users/';

  // prepare HTML result container for new output
  const resultContainer = document.getElementById("result");

  // fetch the API
  fetch(url, options)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors and display
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
            id.innerHTML = row.uid; 
            age.innerHTML = row.age; 
            // this builds td's into tr
            tr.appendChild(name);
            tr.appendChild(id);
            tr.appendChild(age);
            // append the row to table
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
