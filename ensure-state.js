require('dotenv').config()

const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY;
const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY);

// Creamos el indice dev_Ecommerce
const run = async () => {
    
    const index = algoliaClient.initIndex('dev_Ecommerce');
    await index.setSettings({
        "minWordSizefor1Typo": 4,
        "minWordSizefor2Typos": 8,
        "hitsPerPage": 20,
        "maxValuesPerFacet": 100,
        "searchableAttributes": [
            "name",
            "brand",
            "type",
            "categories,hierarchicalCategories",
            "unordered(description)"
        ],
        "numericAttributesToIndex": null,
        "attributesToRetrieve": null,
        "unretrievableAttributes": null,
        "optionalWords": null,
        "attributesForFaceting": null,
        "attributesToSnippet": null,
        "attributesToHighlight": null,
        "paginationLimitedTo": 1000,
        "attributeForDistinct": null,
        "exactOnSingleWordQuery": "attribute",
        "ranking": [
            "typo",
            "geo",
            "words",
            "filters",
            "proximity",
            "attribute",
            "exact",
            "custom"
        ],
        "customRanking": [
            "desc(price)",
            "desc(free_shipping)",
            "asc(popularity/rating)"
        ],
        "separatorsToIndex": "",
        "removeWordsIfNoResults": "none",
        "queryType": "prefixLast",
        "highlightPreTag": "<em>",
        "highlightPostTag": "</em>",
        "snippetEllipsisText": "",
        "alternativesAsExact": [
            "ignorePlurals",
            "singleWordSynonym"
        ]
    }); 




    // const saveOne = async () => {  
    //     const employee = {"id":2,"firstName":"Rhoda","lastName":"Trevarthen","email":"rtrevarthen1@google.co.jp","gender":"Male","ipAddress":"130.62.87.233","company":"Tagfeed","salaryCurrency":"BRL","salary":9908.96}
    //     const result = await index.saveObject(employee, { autoGenerateObjectIDIfNotExist: true })
    //     console.log(result)  
    // }

    const saveMultiple = async () => {
        const employees = require('./employees.json')
        result = await index.saveObjects(employees, { autoGenerateObjectIDIfNotExist: true })     
    }

    saveMultiple();

    // const saveFromDB = async () => {
    //     pgClient.connect()
    //     const res = await pgClient.query('SELECT * FROM EMPLOYEE_small')
    //     index.saveObjects(res.rows, { autoGenerateObjectIDIfNotExist: true })
    //     pgClient.end()
    // }
      
    // saveFromDB().catch(err => console.log(err));

    // const saveFromDBUsingChunks = async () => {
    //     pgClient.connect()
    //     const res = await pgClient.query('SELECT * FROM EMPLOYEE')
    //     const chunks = _.chunk(res.rows, 1000)  
    //     chunks.forEach(chunk => index.saveObjects(chunk, { autoGenerateObjectIDIfNotExist: true }))  
    //     pgClient.end()
    // }
    
    // saveFromDBUsingChunks().catch(err => console.log(err));
}

run().catch(err => console.log(err));



