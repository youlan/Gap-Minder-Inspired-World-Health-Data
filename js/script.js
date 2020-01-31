loadData().then(data => {

    // no country selected by default
    this.activeCountry = null;
    // deafultActiveYear is 2000
    this.activeYear = '2000';
    let that = this;
    let listOfCountries = data["life-expectancy"].map(d => d.geo);

    // ******* TODO: PART 3 *******
    /**
     * Calls the functions of the views that need to react to a newly selected/highlighted country
     *
     * @param countryID the ID object for the newly selected country
     */
    function updateCountry() {

        if(that.activeCountry == undefined || that.activeCountry == null){
            return null;
        }
        //console.log(that.activeCountry);

        infoBox.updateTextDescription(that.activeCountry, that.activeYear);
        worldMap.updateHighlightClick(that.activeCountry);
        gapPlot.updateHighlightClick(that.activeCountry);
        //TODO - Your code goes here - 

    }

    // ******* TODO: PART 3 *******

    /**
     *  Takes the specified activeYear from the range slider in the GapPlot view.
     *  It takes the value for the activeYear as the parameter. When the range slider is dragged, we have to update the
     *  gap plot and the info box.
     *  @param year the new year we need to set to the other views
     */
    function updateYear(year) {

        //TODO - Your code goes here - 
        that.activeYear = year;
        if(that.activeCountry){
            infoBox.updateTextDescription(that.activeCountry.toLowerCase(), year);
        }

    }
    // Creates the view objects
    const infoBox = new InfoBox(data);
    const worldMap = new Map(data, updateCountry);
    const gapPlot = new GapPlot(data, updateCountry, updateYear, this.activeYear, this.activeCountry);


    // Initialize the plots; pick reasonable default values

    // here we load the map data
    d3.json('data/world.json').then(mapData => {

        // ******* TODO: PART I *******
        // You need to pass the world topo data to the drawMap() function as a parameter

        worldMap.drawMap(mapData);

    });

    // This clears a selection by listening for a click
    document.addEventListener("click", function(e) {
        //TODO - Your code goes here - 
		// call clear highight methods
        //console.log(e.target.value);
        let selection = e.target.value;
        //console.log(e.path[0].id);
        let selectedCountry = e.path[0].id;
        if(selectedCountry != "" && listOfCountries.includes(selectedCountry.toLowerCase())){
            //console.log(1);
            that.activeCountry = selectedCountry;
            updateCountry();
        }
        else {
            if (selection === undefined)
                {
                //console.log("2")
                that.activeCountry = null;
                worldMap.clearHighlight();
                gapPlot.clearHighlight();
                infoBox.clearHighlight();
                }
        }

        e.stopPropagation();
    }, true);
});

// ******* DATA LOADING *******
// We took care of that for you

/**
 * A file loading function or CSVs
 * @param file
 * @returns {Promise<T>}
 */
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let pop = await loadFile('data/pop.csv');
    let gdp = await loadFile('data/gdppc.csv');
    let tfr = await loadFile('data/tfr.csv');
    let cmu = await loadFile('data/cmu5.csv');
    let life = await loadFile('data/life_expect.csv');

    //return [pop, gdp, tfr, cmu, life];
    return {
        'population': pop,
        'gdp': gdp,
        'child-mortality': cmu,
        'life-expectancy': life,
        'fertility-rate': tfr
    };
}
