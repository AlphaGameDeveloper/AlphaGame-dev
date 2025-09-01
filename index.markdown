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
    description: A Website for the St. Anthony Novato Youth Group, and Confirmation programs. (Frontend & Backend)
    technologies: [Jekyll, Ruby, HTML, SCSS, JavaScript, Python, Flask, MySQL]
    link: https://github.com/StAnthonyNovato/SAY-Website

awards:
    - title: "Best Use of Palantir AI Platform"
      event: "Los Altos Hacks IX"
      description: "Developed an AI-powered email spam classification tool, Phishnet.  Used Next.JS for the frontend, and Flask for the backend."
      date: "2025-04-06"

---

{% include sections/hero.html %}

{% capture about_content %}
<p>I'm a high school student with a deep and growing passion for software development, networking, system administration, and all things tech. I love building innovative solutions and exploring emerging technologies that challenge me to grow as a developer.</p>

<p>In my free time, I work on personal projects and contribute to <a target="_blank" href="https://penguinempirerobotics.org/">Penguin Empire Robotics</a>, my school’s robotics team, where I design and develop software to support our competitions and team operations.</p>

<p>I also lead the Youth Technology Ministry at my church, where I manage audio/visual systems, develop and maintain websites, create social media content, and write custom software for the Youth Group and Confirmation programs.</p>
{% endcapture %}

{% include sections/about.html content=about_content %}


{% include sections/projects.html 
    title="Featured Projects"
    projects=page.projects %}

{% include sections/awards.html awards=page.awards %}

{% include sections/skills.html last=true %}