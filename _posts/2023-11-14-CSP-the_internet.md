---
toc: true
comments: false
layout: post
title: Big Idea 4.1 The Internet
description: Reviewing the internet and protocols
type: ccc
courses: { csp: {week: 14} }
categories: [C7.2]
---

## The Internet

To date, with deployment individuals and teams have been very active Computing Systems and Networks.  Here are some key elements that have been a part of the students Internet experience...

1. HTTP/HTTPs protocol.  Think about elements in videos and experience so far in class that relate to this College Board topic.
2. DNS.  Where is this show in the College Board materials.  Think about Domain Name Service provider and places where you configured or used a Domain.  Also, identify a Sub Domain and how it is different than a Domain.  Include in discussion usage an purpose of [https://www.whatsmydns.net/](https://www.whatsmydns.net/), A record and CNAME.
3. IP Address.  Try to describe at least 6 IP addresses you use daily.  Try using and understanding [https://www.whatsmyip.org/](https://www.whatsmyip.org/).
4. Observe Internet Traffic.  Try Linux tools bandwidth tools [Article](https://www.binarytides.com/linux-commands-monitor-network/)
5. Finish up with OSI.  Try to make it real, according to what we have done.

### Web browsers and servers use TCP/IP protocols to connect to the Internet. Common TCP/IP protocols are

Internet, Word Wide Web, Local Area Network, HTTP, DNS, TCP, UDP, IP.   Discussion focuses on Letters and Jig Saw puzzles as analogy for Source, Destination, and Packets.

* HTTP - Hyper Text Transfer Protocol, HTTPS - Secure HTTP

  * HTTP takes care of the communication between a web server and the clients web browser. HTTP is used for sending **requests** from a web client to receive a **response** from the server.  Response could be HTML or JSON.

  * HTTPS takes care of secure communication between a web server and a web browser.  In our deployment process we used **certbot** to make HTTP communication secure all the time.

* TCP/IP - Transmission Control Protocol, Internet Protocol

  * TPC/IP messages are broken up into small independent "packets" and sent between computers via the Internet.

  * IP is responsible for "routing" each packet to the correct destination.  When an IP packet is sent from a computer, it arrives at an IP router. The IP router is responsible for "routing" the packet to the correct destination, directly or via another router.

* Network Layer - The wireless and physical layers that move bits and bytes "11010001" across the internet.

![http]({{site.baseurl}}/images/network/httpstack.png)

## Hacks

Show individual, pair, and team knowledge of Systems and interactions of Systems.

- Review Big Idea Unit 4.1 videos and questions
- Produce a Blog showing idea in ths Blog thinking about Systems and Devops so far in your experience.  This blog will also show how you are planning and taking notes for College Board and PBL topics.
- Electronic and Wall diagrams are highly recommended.  These should be incorporated into blog(s).
