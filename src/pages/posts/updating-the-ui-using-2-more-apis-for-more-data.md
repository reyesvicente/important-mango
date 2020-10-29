---
title: "Updating the UI & using 2 more API's for more data "
date: 2020-10-29T13:20:52.124Z
thumb_img_path: /images/unofficial-covid-19-philippines-tracker.png
excerpt: For the past month, I've been recreating the app, finding APIs that can
  help users, and finding the perfect design system that would make the web app
  look professional and not like a *developer* who designed it.
template: post
---
The covid tracker that I made and [wrote](https://dev.to/highcenburg/developing-my-local-covid-19-side-project-2oa6) about a couple of months ago had crashed without knowing that you should have an inbound firewall to Django, port 80 and 443.

For the past month, I've been recreating the app, finding APIs that can help users, and finding the perfect design system that would make the web app look professional and not like a *developer* who designed it.

Browsing through my browser's bookmarks and the files on my mac, I stumbled upon the [USWDS](https://designsystem.digital.gov/) folder inside the Design-System folder of my Dev files and went on to find more about it on [DuckDuckGo](https://duckduckgo.com).

![Design-System folder showing uswds-2.8.0.zip](https://dev-to-uploads.s3.amazonaws.com/i/15no1tyd2vchjfenzfxh.png)


My side project went from this:

![Old UI on the covid project](https://res.cloudinary.com/practicaldev/image/fetch/s--Hq9YS0Kh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://highcenburgtech.files.wordpress.com/2020/04/screen-shot-2020-04-27-at-10.05.05-am.png)


to this:

![New UI of the Unofficial covid-19 tracker for the Philippines](https://dev-to-uploads.s3.amazonaws.com/i/gw2vn6y1brt9n0a4v7g0.png)

The API on the [old site](https://dev.to/highcenburg/developing-my-local-covid-19-side-project-2oa6) was no longer active, or it moved to a new domain. While looking for a much better, faster, and an API with more data than what I used in the old site, I stumbled upon [disease.sh](https://disease.sh), which was the new site of the old domain. Realizing that it had a lot of useful data I could use on the site, I decided to also pull the COVID-19 vaccine trial and therapeutic trial data from [raps.org](https://raps.org).

``` python
# covid_data.py
def get_data():
    DATA_URL = "https://disease.sh/v3/covid-19/countries/PH?strict=true&allowNull=false"
    headers = {'Accept': 'application/json'}
    r = requests.get(DATA_URL, headers=headers)
    stat = r.json()
    stat_data = {
      'stat': stat
    }
    return stat_data


def get_vaccine():
  VACCINE_URL = "https://disease.sh/v3/covid-19/vaccine"
  headers = {'Accept': 'application/json'}
  request = requests.get(VACCINE_URL, headers=headers)
  vaccine = request.json()
  vaccine_data = {
    'vaccine': vaccine
  }
  return vaccine_data


def get_therapeutic():
  TP_URL = "https://disease.sh/v3/covid-19/therapeutics"
  headers = {'Accept': 'application/json'}
  r = requests.get(TP_URL, headers=headers)
  therapeutic = r.json()
  tp_data = {
    'therapeutic': therapeutic
  }
  return tp_data
```

The APIs above return this JSON in chronological order:

``` json
# get_data():
{
  "updated": 0,
  "country": "string",
  "countryInfo": {
    "_id": 0,
    "iso2": "string",
    "iso3": "string",
    "lat": 0,
    "long": 0,
    "flag": "string"
  },
  "cases": 0,
  "todayCases": 0,
  "deaths": 0,
  "todayDeaths": 0,
  "recovered": 0,
  "todayRecovered": 0,
  "active": 0,
  "critical": 0,
  "casesPerOneMillion": 0,
  "deathsPerOneMillion": 0,
  "tests": 0,
  "testsPerOneMillion": 0,
  "population": 0,
  "continent": 0,
  "oneCasePerPeople": 0,
  "oneDeathPerPeople": 0,
  "oneTestPerPeople": 0,
  "activePerOneMillion": 0,
  "recoveredPerOneMillion": 0,
  "criticalPerOneMillion": 0
}

# get_vaccine():
{
  "source": "string",
  "totalCandidates": "string",
  "phases": [
    {
      "phase": "string",
      "candidates": "string"
    }
  ],
  "data": [
    {
      "candidate": "string",
      "mechanism": "string",
      "sponsors": [
        "string"
      ],
      "details": "string",
      "trialPhase": "string",
      "institutions": [
        "string"
      ]
    }
  ]
}

# get_therapeutic():
{
  "source": "string",
  "totalCandidates": "string",
  "phases": [
    {
      "phase": "string",
      "candidates": "string"
    }
  ],
  "data": [
    {
      "medicationClass": "string",
      "tradeName": [
        "string"
      ],
      "details": "string",
      "developerResearcher": [
        "string"
      ],
      "sponsors": [
        "string"
      ],
      "trialPhase": "string",
      "lastUpdate": "string"
    }
  ]
}
```

## The problem

The pulled data is not human-readable - no commas or decimal points for the numbers, and there are unwanted characters. This is where `django.contrib.humanize` and the built-in Django template tags and filter comes in handy. Watch:

``` django
# get_data():
...
{% load humanize %}
...

{{ stat.todayCases|intcomma }}
{{ stat.todayDeaths|intcomma }}
{{ stat.todayRecovered|intcomma }}
```

![New UI of the Unofficial covid-19 tracker for the Philippines](https://dev-to-uploads.s3.amazonaws.com/i/gw2vn6y1brt9n0a4v7g0.png)

``` django
# get_vaccine():
...
{% load static humanize % }
...
{% for v in vaccine.data %}
{% autoescape off %}
    {{ v.candidate }}
    {{ v.mechanism }}
    {{ v.sponsors|cut:"['"|cut:"'"|cut:"'"|cut:"]" }}
    {{ v.trialPhase }}
    {{ v.institutions|cut:"['"|cut:"'"|cut:"'"|cut:"]" }}
    {{ v.details|truncatechars:250 }}
{% endautoescape %}
{% endfor %}

```

![UI of the Vaccine Page](https://dev-to-uploads.s3.amazonaws.com/i/bwg13l4q7o8ch4ljmwbg.png)

``` django
# get_therapeutic()
...
{% load humanize %}
...

{% for t in therapeutic.data %}
{% autoescape off %}
    {{ t.medicationClass }}
    {{ t.lastUpdated }}
    {{ t.trialPhase }}
    {{ t.developerResearcher|cut:"['"|cut:"'"|cut:"'"|cut:"]" }}
    {{ t.details|truncatechars:250 }}
{% endautoescape %}
{% endfor %}
```

![UI of the Therapeutics Page](https://dev-to-uploads.s3.amazonaws.com/i/kfi88y57cw19aqbpcxbj.png)

The `cut` filter [Removes all values of arg from the given string](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#cut). I used this because `{{ t.developerResearcher }}`, `{{ v.sponsors }}` and `{{ v.institutions }}` return unwanted characters.

To add oomph(sorry if this isn't the appropriate word, but I'm a musician, and I will forever add the word oomph to what I do) to the web app, I decided to scrape news related to COVID-19 using contextual web search's news API.

``` python
def get_news():
    NEWS_URL = https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI
    querystring = {"safeSearch":"true","toPublishedDate":"null","fromPublishedDate":"null","withThumbnails":"true","pageSize":"10","q":"covid, covid vaccine trial, covid therapeutics","autoCorrect":"false","pageNumber":"1"}
    headers = {
      'x-rapidapi-host': env("API_HOST"),
      'x-rapidapi-key': env("API_KEY"),
    }
    r = requests.get(NEWS_URL, headers=headers, params=querystring)
    news = r.json()
    article_data = {
      'news': news,
    }
    return article_data
```

The API returned:

``` json
{11 items
"id":"7658671761283948852"
"title":"CGV shuts down 7 branches with more closures to follow"
"url":"http://www.koreaherald.com/view.php?ud=20201023000524"
"description":"Multiplex cinema chain CGV announced Thursday that it would close seven of its branches, including the Daehangno location in Seoul, due to the financial burden of COVID-19. The announcement came just three days after CGV decided to reduce the number of branches by 30 percent due to COVID-19 losses on Monday. The company announced that 35-40 branches of the current 119 branches will close within three years. ..."
"body":"More article by this Writer CGV theater (Yonhap) Multiplex cinema chain CGV announced Thursday that it would close seven of its branches, including the Daehangno location in Seoul, due to the financial burden of COVID-19. The announcement came just three days after CGV decided to reduce the number of branches by 30 percent due to COVID-19 losses on Monday. The company announced that 35-40 branches of the current 119 branches will close within three years. As COVID-19 continues, we have unfortunately decided to stop operation of some branches to overcome difficulties, said CGV on Thursday. The seven CGV branches closing from Monday are Daehangno, Myeongdong Station Cine Library, Deungchon, Yeonsu Station, Hongseong, Daegu Academy and Gwangju Geumnamro. However, the Seoul International Pride Film Festival will be held at CGV Myeongdong Station Cine Library as planned from Nov. 5-11. CGV previous announced on Sunday that it will also increase ticket prices by 1,000 won ($0.88) and 2,000 won at most of its branches from Monday. CGV had already shut down its Incheon Airport branch on Sept. 1. Meanwhile, the number of cinemagoers tallied 2.99 million for the month of September, according to the Korean Film Council. That was 79.7 percent lower than the same month last year and an all-time low for September since data collection began in 2004. By Lim Jang-won ("
"keywords":""
"language":"en"
"isSafe":true
"datePublished":"2020-10-23T13:13:11"
"provider":{1 item
"name":"koreaherald"
}
"image":{12 items
"url":""
"height":0
"width":0
"thumbnail":""
"thumbnailHeight":0
"thumbnailWidth":0
"base64Encoding":""
"name":NULL
"title":NULL
"provider":{...
}1 item
"imageWebSearchUrl":NULL
"webpageUrl":"http://www.koreaherald.com/view.php?ud=20201023000524"
}
```

![UI for the Global News Page](https://dev-to-uploads.s3.amazonaws.com/i/lgapphnhxeffzl0il7k6.png)

Finally, deploying a cookiecutter-django app in docker is not easy the first time I tried deploying an app. If you'd ask me what it is, it's my portfolio that's built on the same stack I used on this app except for the USWDS design system. Luckily, I found a great [resource](https://codeburst.io/a-full-deployment-of-cookiecutter-django-on-digitalocean-with-docker-5293f31a1fdc?source=rss----61061eb0c96b---4) on how to deploy a dockerized cookiecutter-django to [Digital Ocean](https://bit.ly/highcenbugtv)(affiliate link).

On the app's performance based on [performance.sucuci.net](https://performance.sucuci.net)'s metrics, the time to first byte of the homepage returned 0.079. I don't know about you, but I don't know the definition of a fast web app anymore if this isn't fast for you.

### What I learned while building the app.

I learned that deploying an app on Digital Ocean requires an inbound firewall on port 443, 80, and the port of your Django app for the app to stay online. This app's first deployment had crashed without knowing what I did wrong regardless of whether I had sentry installed.

### What I want to change in the app.

The global news APIs latency is 2,286.7ms. It's super slow, especially in the Philippines, where a senator thinks our internet speed is [pretty fast at an average of 3-5mbps](https://interaksyon.philstar.com/politics-issues/2020/09/16/177011/honasan-claims-philippines-internet-connectivity-is-not-that-bad-heres-what-speed-test-says/)(here's a shoutout to all the clients I've worked with. I'm sorry.)

Second, the homepage's pulled data returns zero at around 9am - 4pm GMT+8. I know there's a better API that I can use to get data to show on the web app.

Third, CI/DI. The app is manually pulled from GitHub when I make changes. I run `docker-compose -f production.yml down` and pull the GitHub changes, then run `docker-compose -f production.yml up --build -d` to get the app up and running again.

Finally, testing. I have no tests in this web app. I will have to write another blog post for it soon.

You can view the new web app here [https://covid19ph-unofficial.icvn.tech](https://covid19ph-unofficial.icvn.tech)
