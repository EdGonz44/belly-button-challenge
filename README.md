# belly-button-challenge

## Project Overview

This project involves creating a data visualization of the biodiversity of bacteria found in human navels using the data provided from the Belly Button Biodiversity dataset. This data would be presented through an interactive dashboard created using JavaScript. The process invovled in creating this dashboard begins with calling data in the form of a .json from an external site, and then using said data to build an application with JavaScript that is then deployed using a seperate .html file. The resulting interactive application can then be seen on the GitHub Pages deployed for this repository using this link: [Interactive Dashboard](https://edgonz44.github.io/belly-button-challenge/).

### Interactive Dashboard
The interactive dashboard is created using the code made in the [app.js](https://github.com/EdGonz44/belly-button-challenge/blob/main/static/js/app.js) file. The application draws upon two custom functions that take the sample id provided for them to create a metadata panel for the specified subject, as well as a bar chart and a bubble chart, respectively depicting the top bacterial strains found in the bellybutton and the density of the bacteria cultures. The application has an intitialization function that loads the the dashboard with the charts and metadat panel relevant to the first sample listed in the data, whose ID is automatically populated as the first entry in the interactive dropdown menu. This dropwdown menu is populated with the ID for each subject present in the data, and upon selecting a different ID, another custom function will take this change and update the panel and charts to represent the currently selected ID.

### HTML Deployment
The website is created using the [index.html](https://github.com/EdGonz44/belly-button-challenge/blob/main/index.html) file.


## Project Structure

The project repository should have the following structure:

```plaintext
belly-button-challenge/
│
├── static/js
|   ├── app.js
├── README.md
├──index.html
└──samples.json

```
