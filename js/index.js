const results = new SearchResult(vars.resultsRow);
const marquee = new Marquee(vars.marquee);
marquee.load();
const search = new Search(vars.searchForm);
search.onSearch(()=>{
    results.renderResults(search.input.value)});



