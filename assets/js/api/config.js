export var pythonURI;
if (location.hostname === "localhost") {
        pythonURI = "http://localhost:8086";
} else if (location.hostname === "127.0.0.1") {
        pythonURI = "http://127.0.0.1:8086";
} else {
        pythonURI = "https://flask.nighthawkcodingsociety.com";
}

export var javaURI;
if (location.hostname === "localhost") {
        javaURI = "http://localhost:8085";
} else if (location.hostname === "127.0.0.1") {
        javaURI = "http://127.0.0.1:8085";
} else {
        javaURI = "https://spring.nighthawkcodingsociety.com";
}

export const fetchOptions = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': 'client' // New custom header to identify so
    },
};

export function login(options) {
        // Modify the options to use the POST method and include the request body.
        const requestOptions  = {
                ...fetchOptions, // This will copy all properties from options
                method: options.method, // Override the method property
                cache: options.cache, // Set the cache property
                body: JSON.stringify(options.body)
        };

        // Clear the message area
        document.getElementById(options.message).textContent = "";

        // Fetch JWT
        fetch(options.URL, requestOptions)
        .then(response => {
                // Trap error response from Web API
                if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);
                document.getElementById(options.message).textContent = errorMsg;
                return;
                }
                // Success!!!
                // Redirect to the Database location
                document.getElementById(options.message).textContent = "Success: " + document.getElementById("uid").value 
                options.callback();
        })
        .catch(error => {
                // Handle network errors
                console.log('Possible CORS or Service Down error: ' + error);
                document.getElementById(options.message).textContent = 'Possible CORS or service down error: ' + error;
        });
}