---
title: Six Django Template Tags Not Often Presented In Tutorials
date: 2019-12-18T23:48:18.398Z
thumb_img_path: /images/django-logo-negative.png
img_path: /images/django-logo-negative.png
excerpt: >-
  This article is for those who don't read the documentation, and I, who had the
  Dash app for a few months now, which I never tinkered until last night.
template: post
---
*This article was first seen at https://dev.to/highcenburg/ on the 6th of October 2019*

This article is for those who don't read the documentation, and I, who had the [Dash](https://kapeli.com/das) app for a few months now, which I never tinkered until last night.

During my first day on my internship a couple of months back, I was tasked to work on the scaffold of the company on which I was overwhelmed with the tags on it and never really bothered to research about them.

Some of these are taken from the scaffold, some not.

Side note: There are spaces on the template tag because I have not figured out how to make the tags work on this site.

# **1.) for...empty**

The for tag can take an optional `{% empty %}` clause whose text is displayed if the given array is empty or could not be found:

`{% for student in student_list %}`

`...`

`{% empty %}`

`...`

`{% endfor %}`

Which is also equivalent to:

`{% if student_list %}`

`{% for student in student_list %}`

`...`

`{% endfor %}`

`{% else %}`

`...`

`{% endif %}`

# **2.) lorem**

No, you don't need any other packages nor copy/paste a lorem text. This tag displays random “lorem ipsum” Latin text. This is useful for providing sample data in templates. Unless, of course, you don't.

`{% lorem [count] [method] [random] %}`

e.g.

`{% lorem %} will output the common “lorem ipsum” paragraph.`

`{% lorem 3 p %} will output the common “lorem ipsum” paragraph and two random paragraphs each wrapped in HTML <p> tags.`

`{% lorem 2 w random %} will output two random Latin words.`

# 3.) now

Displays the current date and/or time, using a format according to the given string. Such string can contain format specifiers characters as described in the date filter section.

`{% now "jS F Y" %}`

# 4.) resetcycle

Resets a previous cycle so that it restarts from its first item at its next encounter. Without arguments,  `{% resetcycle %}` will reset the last `{% cycle %}` defined in the template.

`{% for coach in coach_list %}`

`{{ coach.name }}`

`{% for athlete in coach.athlete_set.all %}`

`<p class="{% cycle 'odd' 'even' %}">{{ athlete.name }}</p>`

`{% endfor %}`

`{% resetcycle %}`

`{% endfor %}`

This example would return this HTML:

`<h1>José Mourinho</h1>`

`<p class="odd">Thibaut Courtois</p>`

`<p class="even">John Terry</p>`

`<p class="odd">Eden Hazard</p>`

`<h1>Carlo Ancelotti</h1>`

`<p class="odd">Manuel Neuer</p>`

`<p class="even">Thomas Müller</p>`

# **5.) verbatim**

Stops the template engine from rendering the contents of this block tag. A common use is to allow a JavaScript template layer that collides with Django’s syntax. For example:

`{% verbatim %}`

`{{if dying}}Still alive.{{if}}`

`{% endverbatim %}`

You can also designate a specific closing tag, allowing the use of `{% endverbatim %}` as part of the unrendered contents:

`{% verbatim myblock %}`

Avoid template rendering via the `{% verbatim %}{% endverbatim %}` block.

`{% endverbatim myblock %}`

# **6.) widthratio**

For creating bar charts and such, this tag calculates the ratio of a given value to a maximum value, and then applies that ratio to a constant.

`<img src="#" alt="Imagine an image here" height="10" width="{% widthratio this_value max_value max_width %}">`

If this_value is 175, max_value is 200, and max_width is 100, the image in the above example will be 88 pixels wide (because 175/200 = .875; .875 * 100 = 87.5 which is rounded up to 88).

In some cases you might want to capture the result of widthratio in a variable. It can be useful, for instance, in a blocktrans like this:

`{% widthratio this_value max_value max_width as width %}`

`{% blocktrans %}The width is: {{ width }}{% endblocktrans %}`

Final side note: There are spaces on the template tag because I have not figured out how to make the tags work on this site.
