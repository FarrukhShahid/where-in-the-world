export const makeItReadable = (elem) => {
    try {
        return Array.isArray(elem) ? elem : typeof elem === "object" ? Object.values(elem): elem.toString()
    }
    catch(err) {
        return "---"; // Unable to parse data;
    }
}

export const MODEL_DATA = (data, version) => {
    console.log('data', data, version);
    const parsedVersion = parseFloat(version);
    if (parsedVersion === 2) {
        return Array.isArray(data) ? data.map(item => ({
            ...item,
            flag: item.flags.png,
        }
        )
        ) : {
            ...data,
            flag: data.flags.png
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