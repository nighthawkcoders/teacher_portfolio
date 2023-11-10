---
toc: true
comments: true
layout: post
title: GitHub Statistics
description: Combining statistics on User
permalink: /user/stats
author: Finn
---

<div id="form" style="display: inline-block;">
    <input id="github-user" placeholder="Github ID">
    <select name="classes" id="class">
        <option value="csa">CSA</option>
        <option value="csp">CSP</option>
        <option value="csse">CSSE</option>
    </select>
    <button onclick="Main()">Click Me</button>
</div>

<div id="Reset" style="display: none;">
    <button onclick="reveal()">Change User</button>
</div>

<img id="img" src="" style="border-radius: 50%; max-width: 200px;">
<h1 id="welcome" style="display: none;"></h1>
<ul id="class-links"></ul>
<h1 id="welcome2" style="display: none;"></h1>
<ul id="repo-links"></ul>

<script>
    const formDiv = document.getElementById("form");
    const reset = document.getElementById("Reset");
    const imgElement = document.getElementById("img");
    const welcome = document.getElementById("welcome");
    const welcome2 = document.getElementById("welcome2");
    const repoLinks = document.getElementById("repo-links");
    const classLinks = document.getElementById("class-links");

    async function reveal() {
        formDiv.style.display = "inline-block";
        reset.style.display = "none";
        repoLinks.innerHTML = "";
        classLinks.innerHTML = "";
        welcome.style.display = "none";
        welcome2.style.display = "none";
        imgElement.src = "";
    }

    async function Main() {
        const username = document.getElementById("github-user").value;
        const ApClass = document.getElementById("class").value;

        const recentDays = new Date();
        recentDays.setDate(recentDays.getDate() - 10); // Calculate the date 10 days ago

        // Fetch user information
        const userApi = `https://api.github.com/users/${username}`;
        fetch(userApi)
            .then(response => response.json())
            .then(userData => {
                // Extract user status information here and use it as needed
                const userStatus = userData.status;

                // Display user status information or perform any desired action
                console.log(`User Status: ${userStatus}`);
            })
            .catch(error => {
                console.error("Error fetching user information:", error);
            });


        /*Find all GitHub repositories owned by user
         *build links to recently active repositories
        */
        const repoPath = `https://github.com/${username}/`;
        const repoAPI = `https://api.github.com/users/${username}/repos`;
        fetch(repoAPI)
            .then(response => response.json())
            .then(data => {
                repoLinks.innerHTML = "";

                /*Create an array of Promises
                 *fetch commit data for each repository
                */
                const commitPromises = data.map(repo => {
                    const repoName = repo.name;
                    const repoCommitsApi = `https://api.github.com/repos/${username}/${repoName}/commits`;
                    console.log(repoCommitsApi);

                    // fetch for commit data
                    return fetch(repoCommitsApi)
                        .then(response => response.json())
                        .then(commitsData => {
                            // Check if there are recent commits
                            const lastCommitDate = new Date(commitsData[0]?.commit?.author?.date || repo.updated_at);
                            if (lastCommitDate > recentDays) {
                                return {
                                    name: repoName,
                                    commitCount: commitsData.length,
                                };
                            } else {
                                return null;
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching commit data:", error);
                            return null;
                        });
                });

                // Wait for all commit data requests to complete
                Promise.all(commitPromises)
                    .then(repositories => {
                        repositories
                            .filter(repo => repo !== null) // Filter out repositories with no recent commits
                            .forEach(repo => {
                                const repoName = repo.name;
                                const repoURL = `${repoPath}${repoName}`;

                                const repoLink = document.createElement("a");
                                repoLink.href = repoURL;
                                repoLink.textContent = repoName;

                                const commitCount = repo.commitCount;
                                const commitCountText = document.createTextNode(`(${commitCount} commits)`);

                                const listItem = document.createElement("li");
                                listItem.appendChild(repoLink);
                                listItem.appendChild(commitCountText);

                                repoLinks.appendChild(listItem);
                            });
                    })
                    .catch(error => {
                        console.error("Error fetching commit counts:", error);
                    });
            });

        const apiUrl = `https://api.github.com/users/${username}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const avatarUrl = data.avatar_url;
                imgElement.src = avatarUrl;
                console.log("Avatar URL:", avatarUrl);
                formDiv.style.display = "none";
            })
            .catch(error => {
                imgElement.src = "";
                console.error("Error fetching data:", error);
            });

        reset.style.display = "inline-block";
    }

    function createClassLink(url, text) {
        const link = document.createElement("a");
        link.href = url;
        link.textContent = text;
        const listItem = document.createElement("li");
        listItem.appendChild(link);
        classLinks.appendChild(listItem);
    }
</script>
