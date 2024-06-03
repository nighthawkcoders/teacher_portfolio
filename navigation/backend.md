---
layout: base 
title: Backend
search_exclude: true
---
<style>
.login-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;  /* allows the cards to wrap onto the next line if the screen is too small */
}

.login-card {
    margin-top: 0;  /* remove the top margin */
    width: 45%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    margin-bottom: 20px;
    overflow-x: auto; /* Enable horizontal scrolling */
}

.login-card h1 {
    margin-bottom: 20px;
}

.login-card table {
    width: 100%;
    margin-top: 20px;
}

.details-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;  /* center the text */
}

.details-button:hover {
    background-color: #0056b3;
}
</style>


<div class="login-container">

<!-- Java Login Form -->
<div class="login-card">
    <h1 id="javaTitle"> User Login (Java)</h1>
    <form id="javaForm" action="javascript:javaLogin()">
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
        <p id="java-message" style="color: red;"></p>
    </form>
    <!-- Data Table Layout -->
    <table id="javaTable">
        <thead>
        <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Age</th>
            <th>Roles</th>
        </tr>
        </thead>
        <tbody id="javaResult">
            <!-- javascript generated data -->
        </tbody>
    </table>
    <a href="{{site.baseurl}}/javaUI" id="javaButton" class="details-button">Java Details</a>
</div>

<!-- Python Login Form -->
<div class="login-card">
    <h1 id="pythonTitle">User Login (Python)</h1>
    <form id="pythonForm" action="javascript:pythonLogin()">
        <p><label>
            User ID:
            <input type="text" name="python-uid" id="python-uid" required>
        </label></p>
        <p><label>
            Password:
            <input type="password" name="python-password" id="python-password" required>
        </label></p>
        <p>
            <button>Login</button>
        </p>
        <p id="python-message" style="color: red;"></p>
    </form>
    <table id="pythonTable">
        <thead>
        <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Age</th>
            <th>Role</th>
        </tr>
        </thead>
        <tbody id="pythonResult">
            <!-- javascript generated data -->
        </tbody>
    </table>
    <a href="#" id="pythonButton" class="details-button">Python Details</a>
</div>



<script type="module">
    import { login, javaURI, pythonURI, fetchOptions } from '/teacher_portfolio/assets/js/api/config.js';

    // Method to login user
    window.javaLogin = function() {
        // Set login options
        const options = {};
        // Authentication endpoint
        options.URL = javaURI + '/authenticate';
        options.callback = javaDatabase;  // method to call on success
        options.message = "java-message"; 
        // Set fetch options
        options.method = "POST";
        options.cache = "no-cache";
        options.body = {
            email: document.getElementById("uid").value,
            password: document.getElementById("password").value,
        };
        login(options);
    }

    function javaDatabase() {
       const URL = javaURI + '/api/person';
       // Define the loginForm and dataTable variables
       const loginForm = document.getElementById('javaForm');
       const dataTable = document.getElementById('javaTable');
       const dataButton = document.getElementById('javaButton');

        // prepare HTML result container for new output
        const resultContainer = document.getElementById("javaResult");
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
                dataButton.style.display = 'none';

                const errorMsg = "Spring server response: " + response.status;
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
            dataButton.style.display = 'block';

            response.json().then(data => {
                console.log(data);
                // tr and td build out for each row
                const tr = document.createElement("tr");
                const name = document.createElement("td");
                const id = document.createElement("td");
                const age = document.createElement("td");
                const roles = document.createElement("td");
                // data is specific to the API
                name.innerHTML = data.name; 
                id.innerHTML = data.email; 
                age.innerHTML = data.age; 
                roles.innerHTML = data.roles.map(role => role.name).join(', ');                 
                // this builds td's into tr
                tr.appendChild(name);
                tr.appendChild(id);
                tr.appendChild(age);
                tr.appendChild(roles);
                // append the row to table
                resultContainer.appendChild(tr);
            })
        })
        // catch fetch errors (ie ACCESS to server blocked)
        .catch(err => {
           // fails, show login form and hide data
            loginForm.style.display = 'block';
            dataTable.style.display = 'none'; 
            dataButton.style.display = 'none'; 

            console.error("Network error: " + err);
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = err + ": " + URL;
            tr.appendChild(td);
            resultContainer.appendChild(tr);
        });
    }

    // Method to login user
    window.pythonLogin = function() {
        // Set login options
        const options = {};
        // Authentication endpoint
        options.URL = pythonURI + '/api/authenticate';
        options.callback = pythonDatabase;  // method to call on success
        options.message = "python-message"; 
        // Set fetch options
        options.method = "POST";
        options.cache = "no-cache";
        options.body = {
            uid: document.getElementById("python-uid").value,
            password: document.getElementById("python-password").value,
        };
        login(options);
    }

    function pythonDatabase() {
       const URL = pythonURI + '/api/id';
       // Define the loginForm and dataTable variables
       const loginForm = document.getElementById('pythonForm');
       const dataTable = document.getElementById('pythonTable');
       const dataButton = document.getElementById('pythonButton');

        // prepare HTML result container for new output
        const resultContainer = document.getElementById("pythonResult");
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
                dataButton.style.display = 'none';

                const errorMsg = "Flask server response: " + response.status;
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
            dataButton.style.display = 'block';

            response.json().then(data => {
                console.log(data);
                resultContainer.appendChild(displayRow(data));
            })
        })
        // catch fetch errors (ie ACCESS to server blocked)
        .catch(err => {
           // fails, show login form and hide data
            loginForm.style.display = 'block';
            dataTable.style.display = 'none'; 
            dataButton.style.display = 'none';

            console.error("Network error: " + err);
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = err + ": " + URL;
            tr.appendChild(td);
            resultContainer.appendChild(tr);
        });
    }

    function displayRow(row) {
        const tr = document.createElement("tr");
        const name = document.createElement("td");
        const id = document.createElement("td");
        const age = document.createElement("td");
        const role = document.createElement("td");
        name.innerHTML = row.name;
        id.innerHTML = row.uid;
        age.innerHTML = row.age;
        role.innerHTML = row.role;
        tr.appendChild(name);
        tr.appendChild(id);
        tr.appendChild(age);
        tr.appendChild(role);
        return tr;
    }

    window.onload = function() {
        javaDatabase();
        pythonDatabase();
    };
</script>
