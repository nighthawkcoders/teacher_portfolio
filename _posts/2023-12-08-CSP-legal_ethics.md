---
toc: true
comments: false
layout: post
title: Big Idea 5.5 Legal and Ethical Concerns
description: This tech talk discusses legal and ethics in computing
type: ccc
courses: { csp: {week: 17} }
image: /images/unit5/blackduck.png
categories: [5.E]
---

## Cost of Free

In Mr Mortensen's most recent years in industry, there were many Lawyers making a profession on Patents and how they can be impacted on General Public Licensing (GPL).  

Qualcomm makes its **money on patents**, if you use GPL software you could be voiding your rights to charge for software and patents.  **Open Source** by nature, specifically GPL, says any derivative work is free and code should be shared.   Qualcomm wants all derivative work to **require a royalty payment** payment, also anyone who uses the idea/patent pays royalty.

![duck]({{site.baseurl}}/images/unit5/blackduck.png)

From synopsis.com, "Black Duck® software composition analysis (SCA) helps teams manage the security, quality, and license compliance risks that come from the use of open source and third-party code in applications and containers."  Qualcomm has had 20 technical jobs and 3 lawyers analyzing all the code produced, analyzing code for Open Source inclusion, and analyzing impact of such licenses to its ability to charge royalties for the use of their Patents.  

This may sound like a simple problem, but think about the **Students of Today**, often they are given an assignment and instead of developing their own algorithm they opt to copy something off the internet.   Well, don't think the **Workers of Today** are entirely different.  In summary, it is important to **know the type of software license you are copying**, it could impact billions of dollars in business.

## [License Communities](https://choosealicense.com/community/), License Types [Guide](https://choosealicense.com/)

* Adding and selecting a license [GitHub instructions](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository).  An author, a licensor, needs to determine a license.  This may result in asking...

1. Do I want to waive default copyright in reuse?
2. Do I want to allow derivative works or not?
3. Do I want to require all derivative code to be shared?

### Creative Commons Zero v1.0 Universal

The Creative Commons CC0 Public Domain Dedication waives copyright interest in a work you've created and dedicates it to the world-wide public domain.

### Open Source [MIT License](https://choosealicense.com/licenses/mit/)

This license in friendly to someone like Qualcomm!  This allows using code freely and making and distributing **closed source versions**.  Typically, the author of software with MIT License want credit.  Credit could be as simple as adding the authors name in comments.

Close source means the GitHub project could be private.

### Open Source GPL License

The GNU GPLv3 also lets people do almost anything they want with your project, **except** distributing closed source versions.

Open source means the GitHub project must be public.

For a company like Qualcomm, they are required to institute many practices to deliver their code in parts (public vs private).  Isolating their patent and secret code, far away from the GPL or Creative Commons code.  In fact, a company that is protecting their patents may need to division engineers, split distribution, not deploy to public, etc.   After distribution, the customer of the Patented (ie Qualcomm) product is required to put the public/private domain code back together again.

## Legal and Ethically

We need to comply with the terms of licenses.  We need to cite sources.  (I am particularly bad with internet pictures. However, in the picture of the Black Duck above I am actually advertising the Company).

As consumers, we have become aware that Music and Movie companies own content.  These companies build DRM (Digital Rights Management) software to protect, play, and/or distribute content.  Most of us buy subscriptions to services.  However, some figure out ways to bypass systems and allow download.  Often we will see these sites disappear, as they are illegal.

In software, it can be more complicated to understand all the Creative Commons licenses and its impact to our own ideas and businesses.   Mostly, if we use things in class, there is "no problem" with Open Source as our usage is considered educational use.   Creative Commons software has enabled amazing innovation as we are able to do so much for free, as we have done in this class.  However, Individuals and Companies are required to figure out techniques and business models in order to use Open Source software according to terms of license.  

Long ago, I remember being amazed that Red Hat was not selling its Linux distribution, they were giving away the software.  They had to! This was in the terms of the licenses they were using, GPL.   However, as an early pioneers in Linux distributions, they established a business model around buying their support agreement.  They rose in fortune, became a public company, and had an amazing Initial Public Offering (IPO).  Many, many vendors have followed the Red Hat model in building free distributions and establishing unique business models.  Qualcomm figured out how to mix Patent and GPL businesses and have flourished since abandoning all proprietary, to include Android in its very complicated business model using Android.

Creative Commons, Open Source are free terminologies!  However, businesses will not last without income.  And today, businesses won't last without engineers pulling Open Source software.

## Blog Post Reflection

1. When you create a GitHub repository it requests a license type.  Review the license types in relationship to this Tech Talk and make some notes in your personal blog.
2. In your blog, summarize the discussions and personal analysis on Software Licenses/Options, Digital Rights, and other Legal and Ethical thoughts from this College Board topic.
3. Make a license for your personal (blog) and Team repositories for the CPT project.  Be sure to have a license for both Team GitHub repositories (frontend/backend).  Document license(s) you picked and why.  FYI, frontend, since it is built on GitHub pages may come with a license and restrictions.  Document in blog how team made license choice and process of update.
