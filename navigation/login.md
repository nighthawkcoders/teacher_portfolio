---
layout: base 
title: Login
search_exclude: true
---

## Data Table Page (Java)

<!-- Login Form -->
<form action="javascript:login_user()">
    <p><label>
        User ID:
        <input type="text" name="uid" id="uid" required>
    </label></p>
    <p><label>
        Password:
        <input type="password" name="password" id="password" required>
    </label></p>
    <p>
        <button>Login</button>
    </p>
    <p id="login-message" style="color: red;"></p>
</form>

<!-- Data Table Layout -->
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

<script type="module">
    import { login, javaURI, fetchOptions } from '/teacher_portfolio/assets/js/api/config.js';

    // Method to login user
    window.login_user = function() {
        // Set login options
        const options = {};
        // Authentication endpoint
        options.URL = javaURI + '/authenticate';
        options.callback = database;  // method to call on success
        options.message = "login-message"; 
        // Set fetch options
        options.method = "POST";
        options.cache = "no-cache";
        options.body = {
            email: document.getElementById("uid").value,
            password: document.getElementById("password").value,
        };
        login(options);
    }

    function database() {
       const URL = javaURI + '/api/person/';
       // Define the loginForm and dataTable variables
       const loginForm = document.querySelector('form');
       const dataTable = document.querySelector('table');

        // prepare HTML result container for new output
        const resultContainer = document.getElementById("result");
        resultContainer.innerHTML = ''; // clear each access

        // fetch the API
        fetch(URL, fetchOptions)
            // response is a RESTful "promise" on any successful fetch
            .then(response => {
            // check for response errors and display
            if (response.status !== 200) {
                // fails, show login form and hide data
                loginForm.style.display = 'block';
                dataTable.style.display = 'none';

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
            loginForm.style.display = 'none';
            dataTable.style.display = 'block';

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
           // fails, show login form and hide data
            loginForm.style.display = 'block';
            dataTable.style.display = 'none'; 

            console.error(err);
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = err + ": " + url;
            tr.appendChild(td);
            resultContainer.appendChild(tr);
        });
    }

    window.onload = database;
</script>
