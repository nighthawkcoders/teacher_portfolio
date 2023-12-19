---
toc: true
comments: false
layout: post
title: Big Idea 4.2 Routing | 4.3 Computing
description: Discussion of systems and networks
type: ccc
courses: { csp: {week: 14} }
categories: [C7.1, C9.3]
---

## Fault Tolerence

Know how to determine if vertex of graph has more than one connection.  Multiple connections, in reference to a computing device, could be  considered "Fault Tolerant".  Building "Fault Tolerant" systems makes the network or internet stronger.

* Understanding Computer, Routers, Systems, and Purpose are a pre-requisite to understanding Fault Tolerance systems.  Regarding College Board videos, for clarification, a Router is typically used to connect computers.  Here is an illustration that is very similar to the key components we have used in this class and should be familiar to those who have done deployment.

1. As we are at school, using an HTTP client we request a page via LAN or Campus Network.  This Network has a router and an ISP router that directs us to the public internet.
1. DNS is used to translate [https://nighthawkcodingsociety.com](https://nighthawkcodingsociety.com) to an IP address, see [What's My DNS](https://www.whatsmydns.net/#A/nighthawkcodingsociety.com)
1. This targets the Web Server, the request is directed through a router to the Server running Nginx, which intern directs request to Gunicorn application hosting the Flask Website.

![webserver]({{site.baseurl}}/images/network/internetserver.png)

* Fault tolerant "routing" and "systems" on the internet is achieved by having redundancy in routing paths and computer functions.  Networks and Systems become stronger because of many routes and redundancy of function.  This AWS picture shows load balancing, multiple zones, redundant equipment, standby and fail over equipment and paths.  This is much more than just having multiple connections, there is A LOT of planning in making fault tolerance.  This is why there is such a rise in companies like AWS, Azure, Google Cloud, etc.

![aws]({{site.baseurl}}/images/network/faulttolerant.png)

* The path the TCP/IP packet will follow might be different from other packets, for instance from the same HTTP communication. The routers in the network are responsible for the right addressing, depending on traffic volume, errors in the network, etc.  Since the Internet is Fault Tolerant, there are many paths to a destination, similar to Google Maps providing alternate paths when we travel. Time can be seen with Ping. Routes and time can be see with TraceRoute command...

```
MacBook-Pro-3:~ johnmortensen$ traceroute yahoo.com
traceroute: Warning: yahoo.com has multiple addresses; using 74.6.231.20
traceroute to yahoo.com (74.6.231.20), 64 hops max, 52 byte packets
 1  osync (192.168.1.1)  3.698 ms  2.227 ms  1.533 ms
 2  142-254-184-101.inf.spectrum.com (142.254.184.101)  21.250 ms  16.529 ms  11.286 ms
 3  76.167.26.181 (76.167.26.181)  35.013 ms  32.531 ms  45.001 ms
 4  agg22.sndhcaax02r.socal.rr.com (72.129.1.142)  19.709 ms  26.443 ms  24.083 ms
 5  agg22.tustcaft01r.socal.rr.com (72.129.1.2)  25.561 ms  22.516 ms  31.393 ms
 6  bu-ether26.tustca4200w-bcr00.tbone.rr.com (66.109.3.232)  36.292 ms
    209-18-43-72.dfw10.tbone.rr.com (209.18.43.72)  29.504 ms  37.647 ms
 7  0.ae3.pr1.lax10.tbone.rr.com (107.14.19.56)  29.244 ms  22.536 ms
    0.ae2.pr1.lax10.tbone.rr.com (107.14.19.54)  29.889 ms
 8  xe-0-0-33-1.par2.lax.yahoo.com (216.115.96.14)  28.815 ms  21.496 ms  25.669 ms
 9  unknown.yahoo.com (216.115.102.186)  20.551 ms  23.971 ms  35.320 ms
10  ae-9.pat2.pao.yahoo.com (209.191.64.246)  27.373 ms  27.639 ms  29.064 ms
11  ae-7.pat2.dnx.yahoo.com (209.191.65.9)  59.405 ms  67.980 ms  58.710 ms
12  ae-6.pat1.nez.yahoo.com (209.191.64.226)  74.793 ms
    ae-5.pat2.nez.yahoo.com (209.191.64.224)  81.188 ms  77.055 ms
13  et-1-0-0.msr2.ne1.yahoo.com (216.115.105.183)  87.602 ms
    et-1-0-0.msr1.ne1.yahoo.com (216.115.105.29)  78.726 ms
    et-19-1-0.msr1.ne1.yahoo.com (216.115.105.27)  78.340 ms
14  unknown.yahoo.com (98.138.97.37)  75.661 ms  76.450 ms
    et-19-1-0.clr1-a-gdc.ne1.yahoo.com (98.138.97.71)  81.867 ms
15  lo0.fab4-2-gdc.ne1.yahoo.com (98.138.51.3)  93.363 ms
    lo0.fab3-2-gdc.ne1.yahoo.com (98.138.51.2)  96.854 ms
    lo0.fab4-2-gdc.ne1.yahoo.com (98.138.51.3)  76.542 ms
16  usw2-1-lbd.ne1.yahoo.com (98.138.97.157)  78.076 ms  78.943 ms  75.405 ms
17  media-router-fp73.prod.media.vip.ne1.yahoo.com (74.6.231.20)  81.217 ms  77.895 ms  84.628 ms
```

## Parallel and Distributed Computing

Single Core versus Multiple Cores allows allows parallel computing.  Using multiple Cores allows a sequential job to be split up with minimum time being the length of longest job(s).  What is best time for 30 seconds, 50 seconds, 40 seconds jobs on a two core computer?

* Distributed Computing - Bitcoin mining is an example of distributed computing.  A tough digital computing puzzle illustrates need for CPU/GPU power.  A distributed ledger amongst multiple miners is verified to avoid fraud.  The result of this distributed computing network is a new financial economy.

![bitcoin]({{site.baseurl}}/images/network/bitcoin_system.png)

* Parallel Computing - Chrome, the browser most of us use to run our Web Application is a great example of a multi process architecture.  There are two primary types of processes in Chrome : the browser process and the render process.

  * Browser process interacts with information from internet. This has multiple functions: Web contents represents a tab within the browser.  Render View manages all IPC (Inter Process Communication), for instance the HTTP actions.

  * Render process is responsible for constructing a web page.  Webkit is the engine and contains WebCore which constructs DOM (layout) and the JavaScript interpreter.

![chrome]({{site.baseurl}}/images/network/chrome_system.png)
