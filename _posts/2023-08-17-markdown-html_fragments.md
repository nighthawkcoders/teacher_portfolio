---
toc: true
layout: post
title: Build a Student Page
description: JavaScript, HTML, CSS and Markdown are coding languages used by bloggers when developing in the GitHub Pages system. By using these languages, student developers can add functionality to their GitHub pages site.
categories: [1.B, C7.0]
courses: { csse: {week: 2}, csp: {week: 0}, csa: {week: 0} }
categories: [C4.3, C5.0]
type: devops
---

## HTML Fragments and Markdown
<mark>Building an entire frontend web application requires HTML, CSS, and JavaScript</mark>. HTML is responsible for the content, CSS adds styling to the web page, and JavaScript adds functionality and interactivity.  <mark>Markdown is a short hand way of writing HTML</mark>, the GitHub pages system transforms Mardown to HTML.

In GitHub Pages, Jekyll serves as the build framework. It takes our choice of theme specified in the `_config.yml` file, along with our Markdown, HTML, and notebook files, to construct a complete static website. A significant portion of the frontend design work has already been done for users through the selection and use of a theme; this greatly reduces the need to code in CSS.

Jekyll converts Markdown (.md) files into HTML. Behind the scenes of GitHub Pages, Jekyll and Liquid programming language build and programmatically construct each Markdown file into a specific web page. Markdown provides a straightforward way to start with GitHub Pages development. <mark>In a Markdown file, you can exclusively use Markdown syntax or incorporate HTML, CSS, and JavaScript</mark> based on your expertise and experience.

### Review these Fragments
> The remainder of this document will describe and show code fragments to get the student developer ready for coding and commiting changes to GitHub.
#### GitHub Pages index.md
In GitHub Pages you can define code in Markdown. The <mark>index.md uses markdown</mark> to define a page about CompSci courses at Del Norte High School.

- Markdown fragment. The markdown fragment is written by the developer and is an example of how to start a home page using Markdown.

    ```markdown
    ## Build your Home Page here 
    # Investing in your Technical Future
    > Explore the Computer Science Pathway at Del Norte High School and invest in your technical skills. All Del Norte CompSci classes are designed to provide a real-world development experience. Class time includes tech talks (lectures), peer collaboration, communication with teachers, critical thinking while coding, and creativity in projects. Grading is focused on time invested, participation with peers, and engagement in learning.
    - Introduction to concepts and requirements by the teacher
    - Project-based learning with teacher support
    - Peer communication and collaboration
    - Coding, developer operations, and critical thinking
    - Creativity, research, and utilizing ChatGPT
    - Class work with approximately 2-3 hours of homework per week

    ![csse]({{site.baseurl}}/images/ccr.png)
    ```
- HTML conversion.  The HTML <mark>conversion of the Markdown fragment produced by GitHub Pages using Jekyll</mark>. This is programmatically converted from Markdown to HTML.

    ```html
    <div class="language-markdown highlighter-rouge"><div class="highlight"><pre class="highlight"><code>  
    ## Build your Home Page here 
    # Investing in your Technical Future
    <span class="gt">  &gt; Explore the Computer Science Pathway at Del Norte High School and invest in your technical skills. All Del Norte CompSci classes are designed to provide a real-world development experience. Class time includes tech talks (lectures), peer collaboration, communication with teachers, critical thinking while coding, and creativity in projects. Grading is focused on time invested, participation with peers, and engagement in learning.</span>
    <span class="p">  -</span> Introduction to concepts and requirements by the teacher
    <span class="p">  -</span> Project-based learning with teacher support
    <span class="p">  -</span> Peer communication and collaboration
    <span class="p">  -</span> Coding, developer operations, and critical thinking
    <span class="p">  -</span> Creativity, research, and utilizing ChatGPT
    <span class="p">  -</span> Class work with approximately 2-3 hours of homework per week

    !<span class="p">[</span><span class="nv">csse</span><span class="p">](</span><span class="sx">/teacher/images/ccr.png</span><span class="p">)</span>
    </code></pre></div>    
    </div>
    ```

#### Images
In GitHub Pages, you can <mark>insert images</mark> in HTML or Markdown.  The Teacher finds \<img\> easier to work with for embedding links when trying to control size.  This example shows Markdown syntax for embedding images, but students can also use HTML syntax with the <img> tag.
- See index.md for !\[\]\(\) syntax for images, or reference [Markdown images](https://www.markdownguide.org/basic-syntax/#images-1)
- Or use "img" tage referencing [HTML images](https://www.w3schools.com/html/html_images.asp)


#### Links
HTML contains an ```<href>``` tag to <mark>create links</mark>. Students can use either HTML or Markdown syntax for links.
- Look up [HTML links](https://www.w3schools.com/html/html_links.asp) \<href\> or [Markdown links](https://www.markdownguide.org/basic-syntax/#links) \[\]\(\) syntax.  These should become easy and familiar.


### Web Page Layout
A complete HTML Web Application is typically made off of a Layout and a series of Fragments (sometimes called templates).  
- The design of GitHub pages allows us to <mark>change themes</mark> with the _config.yml file key/value, change the value to a [supported theme](https://pages.github.com/themes/).  Here is a portion of the _config.yml, the ```#``` is a comment symbol.  Add a comment to midnight line, uncomment dinky line to try a new theme. Repeate process until you find something you like.  

```yml
# theme requirements
remote_theme: pages-themes/midnight@v0.2.0
# remote_theme: pages-themes/dinky@v0.2.0
# remote_theme: pages-themes/minimal@v0.2.0
# remote_theme: pages-themes/hacker@v0.2.0
# remote_theme: pages-themes/cayman@v0.2.0
# remote_theme: pages-themes/time-machine@v0.2.0
plugins:
- jekyll-remote-theme
```
- Extensive customization of CSS may require advanced knowledge and can be time-consuming for beginners. I have observed many Students spending  to much of their time writing custom CSS.  It is better, for now, to <mark>learn to extend or change a GitHub theme</mark> and work with fragments of Markdown or HTML.


## Hacks
At the end of this week you should select your theme and start customizing your page. 
- Students should select a theme from the available options in the _config.yml file and start customizing their page accordingly.
- Try to alter index.md with images and links according to some of your personal interests.  For instance, make an outline of your classes, school activities, and homework requirements.  Add your freeform picture.
- Google `Markdown Cheatsheet` or `W3Schools HTML Tutorial` for guideance.  Try to do something on your index.md not discussed in this blog.
