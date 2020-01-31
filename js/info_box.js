/** Data structure for the data associated with an individual country. */
class InfoBoxData {
    /**
     *
     * @param country name of the active country
     * @param region region of the active country
     * @param indicator_name the label name from the data category
     * @param value the number value from the active year
     */
    constructor(country, region, indicator_name, value) {
        this.country = country;
        this.region = region;
        this.indicator_name = indicator_name;
        this.value = value;
    }
}

/** Class representing the highlighting and selection interactivity. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * Renders the country description
     * @param activeCountry the IDs for the active country
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeCountry, activeYear) {
        // ******* TODO: PART 4 *******
        // Update the text elements in the infoBox to reflect:
        // Selected country, region, population and stats associated with the country.
        /*
         * You will need to get an array of the values for each category in your data object
         * hint: you can do this by using Object.values(this.data)
         * you will then need to filter just the activeCountry data from each array
         * you will then pass the data as paramters to make an InfoBoxData object for each category
         *
         */

        //TODO - Your code goes here - 
        this.clearHighlight();
        let that = this;
        //console.log(activeCountry);
        if (this.data['population'].find(d => d.geo === activeCountry.toLowerCase())) {
            let Infoboxdata = [];

            let region = this.data['population'].find(d => d.geo === activeCountry.toLowerCase()).region.toLowerCase();
            let country = this.data['population'].find(d => d.geo === activeCountry.toLowerCase()).country.toUpperCase();
            //console.log(country);
            let infoBoxlist = [];

            for (let key of d3.keys(this.data)){
                //console.log(this.data[key]);
                let countryData = this.data[key].find(d => d.geo === activeCountry.toLowerCase());
                let value = countryData[activeYear];
                let indicatorName = countryData.indicator_name;
                infoBoxlist.push(new InfoBoxData(country,region,indicatorName,value));
            }
            //console.log(infoBoxlist);

            let CountryInfo = d3.select("#country-detail").selectAll("span")
                .data([{"country": infoBoxlist[0].country, "region": infoBoxlist[0].region}]);

            CountryInfo.exit().remove();

            let newCountryInfo = CountryInfo.enter().append("div").classed("label", true);

            CountryInfo = newCountryInfo.merge(CountryInfo);

            CountryInfo.append("i")
                .attr("class", d => d.region)
                .classed("fas fa-globe-americas", true);

            CountryInfo.append("span")
                .text(d => " "+d.country );

            let statsData = d3.select("#country-detail").selectAll("div#sInfo").data(infoBoxlist);
            statsData.exit().remove();

            let newstatsData = statsData.enter()
                .append("div")
                .classed("stat", true)
                .attr('id', 'sInfo');

            statsData = newstatsData.merge(statsData);
            statsData.append("text")
                .text(d => (d.indicator_name + ' : ' + d.value));
        }
    }

    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {

        //TODO - Your code goes here -
        d3.select('#country-detail').html('');
    }

}