import axios from "axios"

export const getCountriesList = async (filters, version = 2) => {
    return await axios.get(`https://restcountries.com/v${version}/all?fields=name,capital,population,region,flags`)
}

export const getCountryByName = async (name, version = 2) => {
    return await axios.get(`https://restcountries.com/v${version}/name/${name}`)
}

export const getCountryByCode = async (codes, version = 2) => {
    return await axios.get(`https://restcountries.com/v${version}/alpha?codes=${Array.isArray(codes) ? codes.join(",") : codes}`)
}