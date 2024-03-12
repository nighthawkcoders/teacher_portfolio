# IMPORTANT

This is a general help for NightHawk pages.  

- Go to settings and configure pages, and configure Build and Deployment for "GitHub Actions". IF YOU DO NOT DO THIS YOUR PAGE WILL NOT BUILD.

- In case of issues with the user for your repository not being able to be resolved resulting in the page not building do the following: instead of the usual `repository: yourRepoName` in the repository section write `repository: usr/yourRepoName`

- Game projects use the minima theme.   To understand files and organization read [Minima README.md](https://github.com/jekyll/minima#readme)

## File Names in "_posts", "_notebooks"

- To name a file, use the following structure (Note that dates should never be in the future and should always be in the format YYYY-MM-DD):

- Make sure that notebooks are in the notebook folder and posts are in the posts folder.

  - For markdown files in _posts:
    - year-month-day-fileName.md
      - GOOD EXAMPLE: 2021-08-02-First-Day.md
      - BAD EXAMPLE: 2021-8-2-first-day.md
      - BAD EXAMPLE: first-day.md
      - BAD EXAMPLE: 2069-12-31-First-Day.md

  - For jupyter notebooks in _notebooks:
    - year-month-day-fileName.ipynb
      - GOOD EXAMPLE: 2021-08-02-First-Day.ipynb
      - BAD EXAMPLE: 2021-8-2-first-day.ipynb
      - BAD EXAMPLE: first-day.ipynb
      - BAD EXAMPLE: 2069-12-31-First-Day.ipynb

## NIGHTHAWK-Pages CHANGES

### TAGS

- Tags are used to organize pages by their tag the way to add tags is to add the following to your front matter such as the example seen here `categories: [`C1.4]` Each item in the same category will be lumped together to be seen easily on the tags page.

### SEARCH

- All pages can be searched for using the built-in search bar. This search bar will search for any word in the title of a page or in the page itself. This allows for easily finding pages and information that you are looking for. However, sometimes this may not be desirable so to hide a page from the search you can add `search_exclude: true` to the front matter of the page. This will hide the page from appearing when the viewer uses search.

### NAVIGATION BAR

- To add pages to the navigation bar add them to the general main directory then add the alpha tag that will order them in the way that you desire such as AA Being the first page and ZZ being the last page.

### BLOG PAGE

- There is a newly designed blog page with all pages having images and a description of what the page is about. This is to help the viewer understand what the page is about and what they can expect to find on the page. The way to add images to a page is to have the following front matter `image: /images/file.jpg` and then the name of the image that you want to use. The image must be in the `images` folder. Furthermore, if you would like the file to not show up on the blog page `hide: true` can be added to the front matter.

### SASS support

- NIGHTHAWK-Pages supports a variety of different themes that are each overlaid on top of minima. To use each theme, go to the "custom-styles.scss" file and simply uncomment the theme you want to use. To toggle the theme off, comment in front of the line that imports the theme in the file. To add your themes, find the desired theme’s GitHub repository and make a new folder in the sass directory that’s named the name of your theme. Copy the import statement format from the other styles on "custom-styles.scss", add your import statement, and you're done. Note that adding personal themes may cause things to break and a given theme’s compatibility with NIGHTHAWK-Pages may be suboptimal. To add a personal styling twist, add your unique .scss file to "custom-styles" via import. Here is an example import `@import "minima/NIGHTHAWK-Pages-styles";`. Note that you can also add your own SCSS in the file itself in the area labeled specifically for that purpose. Also, you can mix different styles by combining them together in NIGHTHAWK-Pages however the effects may vary.

### INCLUDES

- NIGHTHAWK-Pages uses liquid to import many common page elements that are present throughout the repository. These common elements are imported from the _includes directory. If you want to add one of these common elements, use liquid syntax to import the desired element to your file. Here’s an example of the liquid syntax used to import: `{%- include post_list.html -%}` Note that the liquid syntax is surrounded by curly braces and percent signs. This can be used anywhere in the repository.

### LAYOUTS

- To create a custom page layout, make an HTML page inside the _layouts directory, and when you want to use that layout in a file, use the following front matter `layout: [your layout here]` Using another pre-existing layout use the same front matter syntax as defined above. This layout will have to be written in in logic customizing liquid to define the structure of the page.

### CONFIG.YML

- NIGHTHAWK-Pages allows for social links to be added at the bottom of every page, along with other things. To change the pre-set social links and names, go to the _config.yml file and change the desired category to the desired nomenclature. There are only a few supported social links that you can choose from.

## Blog site using GitHub Pages and Jekyll

> This site is intended for Students.   This is to record plans, complete hacks, and do work for your learnings.

- This can be customized to support computer science as you work through the pathway (JavaScript, Python/Flask, Java/Spring)
- All tangible artifact work is in a _posts|_notebooks.  
- Front matter (aka metadata) in ".ipynb" and md files are used to organize information according to week and column in the running website.

## GitHub Pages

All `GitHub Pages` websites are managed on GitHub infrastructure. GitHub uses `Jekyll` to transform your content into static websites and blogs. Each time we change files in GitHub it initiates a GitHub Action that rebuilds and publishes the site with Jekyll.  

- GitHub Pages is powered by: [Jekyll](https://jekyllrb.com/).
- Published teacher website: [nighthawkcoders.github.io/teacher](https://nighthawkcoders.github.io/teacher/)

## Preparing a Preview Site

In all development, it is recommended to test your code before deployment.  The GitHub Pages development process is optimized by testing your development on your local machine, before committing files to GitHub.

Development Cycle. For GitHub pages, the tooling described below will support a development cycle, such as `make-code-save-preview`.  In the development cycle, it is a requirement to preview work locally, before doing a VSCode `commit` to git.  Preview functionality requires Python and Python libraries.

Deployment Cycle.  In the deployment cycle, `sync-github-action-review`, it is a requirement to complete the development cycle before doing a VSCode `sync`.  The sync triggers a GitHub repository update.  The action starts with the Jekyll build to publish the website.  Any step can have errors and will require you to do a review of GitHub Actions.

### WSL and/or Ubuntu installation requirements

- The result of these steps is Ubuntu tools to run the preview server.  These procedures were created using [jekyllrb.com](https://jekyllrb.com/docs/installation/ubuntu/)
- Run scripts in the scripts directory of the student repo: activate_ubuntu.sh. The expected name of the repository to run these scripts is the name of the repo, ie 'student'.

### MacOs installation requirements

The result of these steps is MacOS tools to run the preview server.  These procedures were created using [jekyllrb.com](https://jekyllrb.com/docs/installation/macos/). Run scripts in the scripts directory of the student repo: activate_macos.sh. The expected name of the repository to run these scripts is 'student'.

### Preview

- The result of these steps is the server running on: <http://0.0.0.0:4100/teacher/>.  Regeneration messages will run in the terminal on any save.  Press the Enter or Return key in the terminal at any time to enter commands.

- Complete installation

```bash
bundle install
```

- Run Server.  This requires running terminal commands `make`, `make stop`, `make clean`, or `make convert` to manage the running server.  Logging of details will appear in the terminal.   A `Makefile` has been created in the project to support commands and start processes.

  - Start the preview server in the terminal
The terminal output shows the server address. "Cmd" or "Ctl" click the http location to open the preview server in a browser. Example Server address message...

    ```text
    Server address: http://0.0.0.0:4100/teacher/
    ```

    - Save on ".ipynb" or ".md" file activiates "regeneration". Refresh the browser to see updates. Example terminal message...

    ```
    Regenerating: 1 file(s) changed at 2023-07-31 06:54:32
        _notebooks/2024-01-04-cockpit-setup.ipynb
    ```

  - Terminal messages are generated from background processes.  Click return or enter to obtain a prompt and use the terminal as needed for other tasks.  Always return to the root of project `cd ~/vscode/teacher` for all "make" actions.

  - Stop the preview server, but leave constructed files in the project for your review.

    ```bash
    make stop
    ```

  - Stop the server and "clean" constructed files, this is the best choice when renaming files to eliminate potential duplicates in constructed files.

    ```bash
    make clean
    ```

  - Test notebook conversions, this is the best choice to see if IPYNB conversion is acting up.

    ```bash
    make convert
    ```

Metadata, also known as "front matter", is a set of key-value pairs that can provide additional information to GitHub Pages about .md and .ipynb files. This can and probably will be used in other file types (ie doc, pdf) if we add them to the system.

- In the front matter, you can also define things like a title and description for the page.  Additional front matter is defined to place content on the "Computer Science Lab Notebook" page.  The `courses:` key will place data on a specific page with the nested `week:` placing data on a specific row on the page.  The `type:` key in "front matter" will place the blog under the plans, hacks(ToDo), and tangibles columns.

- In our files, the front matter is defined at the top of the page or the first markdown cell.

  - First, open one of the .md or .ipynb files already included in either your _posts|_notebooks folder.

  - In the .md file, you should notice something similar to this at the top of the page. To see this in your .ipynb files you will need to double-click the markdown cell at the top of the file.

  ```yaml
  ---
  toc: true
  comments: false
  layout: post
  title: Daily Plan Sample
  description: Example Blog!!!  This shows planning and notes from hacks.
  type: plans
  courses: { compsci: {week: 0} }
  ---
  ```

- The front matter will always have '---' at the top and bottom to distinguish it and each key-value pair will be separated by a ':'.

- Here we can modify things like the title and description.

- The type value will tell us which column this is going to appear under, supported values: `plans`, `hacks`, `tangibles`.

- The courses will tell us which menu item it will be under, in this case, the `compsci` menu, and the `week` tells it what row (week) it will appear under that menu.

- In our examples,  hacks(ToDo) contain references to our IPYNB files; these are stored in GitHub under the `_notebooks` folder.   The plans and tangibles contain references to our MD files; these are stored in GitHub under the `_posts` folder.

### Key files in Computer Science Lab Notebook

- `compsci.md` - this is the "Computer Science Lab Notebook" page and is the link `https://nighthawkcoders.github.io/student/compsci`.  It contains the Title and Number of units on the page.
- `_data/compsci.yml` - this contains the supporting data that helps organize the units on the page.
- `_layouts`\schedule.html - this contains code, in the Liquid language, that generates the HTML for all the rows and columns.
- FYI, the schedule.html could work for another type of page.  For instance, you could make a csa.md, _data/csa.yml, and tag files with `csa: {week: 0}` under courses.
