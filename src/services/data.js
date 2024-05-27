import axios from "axios"

/**
 * Get all countries
 * @param {String} fields Fields to search
 * @param {Double} version api version defaulting to 2 
 * @returns promise
 */
export const getCountriesList = async (fields, version = 2) => {
    return await axios.get(`https://restcountries.com/v${version}/all?fields=${Array.isArray(fields) ? fields.join(",") : fields}`)
}

/**
 * Get a specific country by name  
 * @param {String} name country name
 * @param {Double} version api version defaulting to 2
 * @returns promise
 */
export const getCountryByName = async (name, version = 2) => {
    return await axios.get(`https://restcountries.com/v${version}/name/${name}`)
}


/**
 * Get countries by any type of country codes
 * @param {Array} codes array of codes of countries
 * @param {Double} version api version defaulting to 2
 * @returns promise
 */
export const getCountryByCode = async (codes, version = 2) => {
    return await axios.get(`https://restcountries.com/v${version}/alpha?codes=${Array.isArray(codes) ? codes.join(",") : codes}`)
}