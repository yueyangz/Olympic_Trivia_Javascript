/**
 * Created by karin on 12/12/16.
 */
    // Construct a new tweet object


module.exports = function(searchKey, Bing, io){
    console.log('BingSearchHandler: ' + searchKey);
    var results = [];
    Bing.web(searchKey, {
        top: 50,  // Number of results (max 50)
        skip: 0   // Skip first 3 results
    }, function(error, res, body) {
        var data = body.webPages.value;
        var dataLen = data.length;
        for(i=0;i<dataLen;i++){
            var curr = data[i];
            var result = {
                name: curr['name'],
                snippet: curr['snippet'],
                url:curr['url'],
                displayUrl: curr['displayUrl'],
                data: curr['dateLastCrawled'].split("T")[0]
            };
            results.push(result);
        }
        io.emit('searchResult', results);
    });

};