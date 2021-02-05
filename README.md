# aptitu.de

![Cover Photo](https://raw.githubusercontent.com/drewrerikson/aptitu.de/main/cover.png)

## Full-stack RESTful personal webapp for monitoring and analyzing Apple Health data.
Aptitu.de is a full-stack personal project whose goal it is to pull real-time data from my Apple Watch and Apple Health endpoints to display them in a dynamic and intuitive web-app. Using Apple App Store app 'Health Auto Export', ~90 data-sets of personal health data are posted via REST API to a locally run server. Data is stored using MongoDB and then is rendered and displayed using React, using Chartist for data visualization.

### Usage
Aptitu.de consists of two parts: the `client` web-server and the `api` back-end. By default, `client` uses port 3000 and `api` uses port 5000.

#### Client
```bash
cd aptitu.de/client
npm install
npm start
```

#### API
```bash
cd aptitu.de
npm install
node api/index
```

### Version

#### v1.3.0
Supports more graphs and cleaner visualizations. Did some optimization and code clean-up!

#### v1.2.0
Initial framework is set up and two visualizations are (pretty brokenly) displaying on the webapp. All data is updated in real-time using Express, a lot of work to be done for performance and UI.

### To-DO

- More graphs (of course)
- Aggregate inconsistent data-sources by hour or minute, fixing the heart rate issue with multiple entries per unit
- Move MongoDB to a permanent location, not just in memory (deployment branch)
- Make tabs for different categories of analysis
- Animations?
- Insights (way way down the line)
