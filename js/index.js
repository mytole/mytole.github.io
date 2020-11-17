const results = new SearchResult(vars.resultsRow);
const marquee = new Marquee(vars.marquee);
marquee.load();
const search = new Search(vars.searchForm);
search.onSearch(() => {
    results.renderResults(search.input.value)
});
const compare = new Compare(document.getElementById('compare'));
compare.load();


