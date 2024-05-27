
/**
 * Validates and parse an array
 * @param {Any} elem 
 * @returns If its array it will return as it is, if object, then its values, else a string
 */
export const makeItReadable = (elem) => {
    try {
        return Array.isArray(elem) ? elem : typeof elem === "object" ? Object.values(elem): elem.toString()
    }
    catch(err) {
        return "---"; // Unable to parse data;
    }
}

/**
 * Model the api data of multiple versions to make it simple
 * @param {Object} data Array or object to model as a schema
 * @param {Double} version api version defaulting to 2
 * @returns returns Array or an object depending on the input
 */
export const MODEL_DATA = (data, version) => {
    const parsedVersion = parseFloat(version);
    if (parsedVersion === 2) {
        return Array.isArray(data) ? data.map(item => ({
            ...item,
            flag: item.flags.png,
        }
        )
        ) : {
            ...data,
            flag: data.flags.png,
            languages: makeItReadable(data.languages),
            currencies: makeItReadable(data.currencies),
        }
    }
    else if (parsedVersion === 3.1) {
        return Array.isArray(data) ? data.map(item => ({
            ...item,
            name: item.name.common,
            flag: item.flags.png
        }
        )
        ) : {
            ...data,
            name: data.name.common,
            flag: data.flags.png,
            nativeName: makeItReadable(data.nativeName),
            population: data.population,
            region: data.region,
            subregion: data.subregion,
            capital: data.capital,
            topLevelDomain: data.tld,
            currencies: makeItReadable(data.currencies),
            languages: makeItReadable(data.languages),
            borders: data.borders
        }
    }
}