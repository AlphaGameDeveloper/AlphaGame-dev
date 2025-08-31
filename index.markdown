---
layout: portfolio
title: Home
projects:
  - name: AlphaGameBot
    description: A user engagement Discord bot. Free, Open Source, and built with love.
    time: 2023-present
    technologies: [Python, Pycord, Docker, MySQL, and Jenkins]
    link: https://www.alphagamebot.com/?utm_source=portfolio
  - name: St. Anthony Novato Youth Website
    description: A Website for the St. Anthony Novato Youth Group, and Confirmation programs.
    technologies: [Jekyll, Ruby, HTML, SCSS, JavaScript]
    link: https://github.com/StAnthonyNovato/SAY-Website

awards:
    - title: "Best Use of Palantir AI Platform"
      event: "Los Altos Hacks IX"
      description: "Developed an AI-powered email spam classification tool, Phishnet.  Used Next.JS for the frontend, and Flask for the backend."
      date: "2025-04-06"

---

{% include sections/hero.html %}

{% capture about_content %}
<p>I'm a high school student with a strong and growing passion for software development, networking, sysadminery, and all things tech. I love creating innovative solutions and exploring new technologies.</p>
<p>In my free time, I enjoy working on personal projects, spend time creating innovative software at the school robotics team, <a target="_blank" href="https://penguinempirerobotics.org/">Penguin Empire Robotics</a>.</p>
<p>I also lead the Youth Technology Ministry at my church, where I manage A/V systems, create and run websites and social media content, and write software for the Youth Group and Confirmation programs.</p>

{% endcapture %}

{% include sections/about.html content=about_content %}

{% include sections/projects.html 
    title="Featured Projects"
    projects=page.projects
    last=true %}

{% include sections/awards.html awards=page.awards %}