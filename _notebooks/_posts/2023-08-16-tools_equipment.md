---
toc: true
comments: true
layout: post
title: Tools and Equipment Overview
description: Tools and equipment have changed lives, look at the mobile phone.  Tools, equipment, with the addition of coding can make you immensely more successful in any field.
courses: { csse: {week: 0}, csp: {week: 0}, csa: {week: 0} }
categories: [C4.3, C5.0]
type: devops
---

## Make Development Easy
Learning Development tools, working with Projects, is the key to a <mark>rapid entry into Code/Code/Coding</mark>.  A Computer, Git, and an Code Editor are the starting points for coding.  Add Jupyter Notebooks (computational documents) and you bridge a Computer with Data Science.  The beauty of Jupyter Notebooks is that it creates a computational narrative, a document that allows code and data with visual analysis, hypothesis, and conjecture.

- `A laptop`, <mark>bring a laptop to class every day with the Development Tools installed</mark> on it.  Preferred laptops are MacOS or Windows.  Computers using either MacOS, Windows, or Linux are requirements for the course.  Computers issued by the School, ie Chromebook, are not as effective because of the restrictions placed on adding software by PUSD.  <mark>If you only have access to a school issued Chromebook, we will provide an option to access a Linux machine on AWS.</mark>
- Sharing Code. `GitHub`, is the defacto hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere in the world.  Git enables tracking changes, collaborating with others, and reverting to previous versions if needed.  Think of it as the Google Docs for Coders. We will clone/push/pull changes to and from GitHub, this is the server where we store and share code in the cloud. 
   - Setup GitHub with a personal ID, not a school ID.  [GitHub Account](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account).  It is best if you can incorporate you first name or initials into your account, for recognition by those who know you. 
- `Visual Studio Code` (abbreviations VS Code, VSCode or VSC) is a powerful Code Editor.  VSCode performs a lot of magic and automation behind the scenes to make your Code/Code/Coding life easier, ie telling you about errors in syntax.  VS Code supports many programming languages, and has a marketplace of plugins and extensions that enhance the coding experience.
   - [VSCode Setup](https://code.visualstudio.com/learn/get-started/basics.)
- `GitHub Pages` will be used to host your personal web site, notes, and experiences. GitHub Pages allows students to showcase their projects and create personal websites. Students can publish their coding projects, technical notes, and experiences on GitHub Pages for others to see. 
   - <mark>Review GitHub concepts 2-min</mark> [https://www.youtube.com/watch?v=phGdqJB6ep0](https://www.youtube.com/watch?v=phGdqJB6ep0)
- `Jupyter Notebooks` will be used to build running JavaScript, Python, or Java Code in to your own Technical Notes. Jupyter Notebooks is a valuable tool in data science and coding. It provides an interactive environment for running code, analyzing data, documenting code, and writing explanations. 
   - <mark>Review Jupyter basics 6-min</mark> [https://www.youtube.com/watch?v=3jZYC9rGrNg](https://www.youtube.com/watch?v=3jZYC9rGrNg)
- `Slack Account and App`, install App on Laptop, get used to reading announcements. Slack is a messaging tool similar to Discord. There will be important announcements and daily messages will be shared through Slack.
    - [Slack for Windows](https://slack.com/downloads/windows)
    - [Slack for MacOS](https://slack.com/intl/en-in/downloads/mac)
    - [Slack for Linux](https://slack.com/intl/en-gb/downloads/linux)
- [Windows Desktops install WSL](https://learn.microsoft.com/en-us/windows/wsl/install).  WSL enables students to work with Linux tools and environments on Windows machines.  WSL supports a Linux-like terminal experience within the Windows operating system.   WSL users will install WSL 2 and Ubuntu distriibutions.   Everyone in this class will be working on a form of Linux when in Terminal. 
   - [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- `Docker` is an open platform for developing, shipping, and running applications. Docker allows students to create isolated environments for testing and deploying their applications, ensuring consistency across different systems. Docker Desktop allows users to test deployment scripts on their local machines, enabling them to debug and troubleshoot their applications before deploying them on AWS.
    - [Docker Desktop for Macos](https://docs.docker.com/desktop/install/mac-install/)  
    - [Docker Desktop for WSL2 Backend on Windows](https://docs.docker.com/desktop/wsl/#:~:text=With%20Docker%20Desktop%20running%20on,to%20improve%20the%20resource%20consumption.)
- Tools and Terminal Installs
   - <mark>Deprecated</mark>`Anaconda` (Conda) is the environment manager.  Conda is an open-source package and environment management system that runs on Windows, MacOS, and Linux desktops.   Conda is an environment manager that is very popular for data science projects. It helps you manage you tools in a controlled manner, this is called a virtual environment.  <mark>Likely we will move away from Anaconda.</mark>  The purpose of Conda is to avoid dependencies, but many people had problems with managing Python and Pid in VSCode related to Conda shell.
      - [Download Anaconda](https://www.anaconda.com/download)
   - Install a package manager.  A package manager helps you install tools and manage updates.  Homebrew is a package manager specifically for MacOS, while Ubuntu and AWS EC2 machines require the apt package manager for installing additional tools.
      - Homebrew (```brew install```) for MacOS will be used to install tools.  Homebrew is a package manager for MacOS.  Apple's MacOS does not have a development package manager by default. [Install Homebrew](https://brew.sh/)
      - On Windows, Windows Subystem for Linux (WSL Ubuntu), use (```sudo apt install```) installs for packages.  Things like Java, Python, and more will require installation with apt, as they are not included in Ubuntu by default.
      - On AWS Linux EC2 machines we will use (```sudo apt install```), similar to WSL, but is temporary to session. An AWS/Kasm Account for cloud computing will be required., account access will be provided by Teacher.  AWS Cloud Computing and Electric Cloud Computing (EC2's) will be used to run Development Enviornment from the Internet.

## Hacks
> Review all the items mentioned above and get started with setup.   Try to understand the concepts behind these tools and seek clarification when needed. Each student needs to take the setup process seriously and should highlight that consistent access to the necessary tools is essential for active participation in the class.
- Bring your computer daily. <mark>If you don't have computer and tools access, you are effectually absent!!!</mark>
- Review material on tools, draw a picture.  Installing tools can be a bit of a process.  Read, review, and get started.  After you do it a little, it starts to become easy.
- Blog why you love your tools.  Do not fear your tools, <mark>love your tools'</mark>. Then you become familiar and proficient in using your tools, they become extensions of your abilities and empower you to accomplish Code/Code/Coding tasks more efficiently.
- <mark>Add yourself to Users Database. </mark> We need you registered so we know how to support you best.  This registration will be used for automation now and through the year. 
