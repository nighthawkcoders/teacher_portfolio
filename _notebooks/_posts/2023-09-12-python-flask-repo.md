---
layout: post
toc: true
comments: false
title: Flask/Python Repo and App
description: Setting up a Flask/Python project.  Flask is a Web Application framework written in Python.
courses: { csp: {week: 5, categories: [5.A]}  }
categories: [C7.1]
type: devops
---

## Flask/Python Web Application
> Next up is making a Web Application from a completely customizable framework and language.  This project will focus on building a standalone Web Application.  The intentions are to use this framework for Group work and backend work.  At the conclusion of this article this project will only be run locally.  Ultimately, this project will be hosted on AWS.  
- Flask is the Web Application Framework.
- Python will be the Backend Development languages.
- Jinja2 is the Web Template language, that work well with Flask and Python.
- HTML, CSS, JavaScript will support frontend work built into the Flask project.
- The external Fastpages/Github Pages project will use the Flask/Python project for backend services, like persistent data or databases (ie SQL).

### Setup Flask/Python Project
> Start Flask/Python GitHub repo from a Template.  Setup VSCode project to run python.  Make a change and push to GitHub.
- Generate your own copy of repository GitHub: [https://github.com/nighthawkcoders/flask_portfolio/generate](https://github.com/nighthawkcoders/flask_portfolio/generate)
- "Copy" https address of newly Generated repository, use screen that looks like this:
![clone-address]({{site.baseurl}}/images/flask-python-repo/clone_http_address.png)
- Open terminal and goto your vscode directory: `cd ~/vscode`
- Clone new GitHub project by run `git clone <paste/replace with https link>`
- Run VSCode project `code <replace with name of project>`
- In VSCode type Shift-Command-P or Shift-Control-P to select your Python Interpreter
![python interpreter]({{site.baseurl}}/images/flask-python-repo/python_interpreter.png)
- Select Python that matches terminal: `which python`
![python interpreter]({{site.baseurl}}/images/flask-python-repo/python_conda.png)
- In VSCode terminal install project dependencies: `pip install -r requirements.txt`
- Select main.py from VSCode navigator and press ▶️ in upper right corner. An alternate method is type `python main.py` in terminal.  Observe terminal output, this sample illustrates a good outcome.
![python interpreter]({{site.baseurl}}/images/flask-python-repo/python_terminal_output.png)
- In terminal output you can shift-click on http://127.0.0.1:5000/, or goto Browser and type: `127.0.0.1:5000`
- Navigate the site, look for things to change.


## Hacks
> Try a little bit of customization and make sure you are able to run, edit, and push.  Most changes should update while server is running

- Conclude setup activity by pushing a minor change to Stub.html.  This will verify GitHub support with VSCode.   
    - Click for [VSCode guide for version control](https://code.visualstudio.com/docs/editor/versioncontrol#_git-support)
    - Stub.html lines of code to for simple change

```html
<div class="px-5 py-5 mx-auto">
    <h1 class="text-primary"><strong>Stubby Body</strong></h1>
    <p class="text-secondary">Put your name here</p>
</div>
```

>  Group/Collaboration activity. Share a GitHub project.
- Make a team project, make each person as a Collaborator through GitHub settings.
- Each member take the HTML file under the Project menu and customize it to point to individuals material (aka Fastpages).
- GitHub gotcha when Collaborating on a Repo.  Remember to Pull before you Push/Sync.  The repository will be updating while your copy is isolated.  Pull or Rebase gets you back on track with the shared branch of code.
