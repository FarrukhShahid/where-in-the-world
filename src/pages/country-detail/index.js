import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { getCountryByCode, getCountryByName } from '../../services/data';
import { ArrowBack } from '@mui/icons-material';
import { ApiVersionContext } from '../../api-version-context';
import { MODEL_DATA } from '../../utils/functions';

function CountryDetail() {
    const { name } = useParams();
    const { apiVersion } = useContext(ApiVersionContext);
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [borderCountries, setBorderCountries] = useState([]);
    const [laodingBorderCountries, setLaodingBorderCountries] = useState(false);
    
    

    useEffect(() => {
        if (name) {
            const fetchCountryDetails = async () => {
                try {
                    setCountry(null);
                    setLoading(true);
                    const response = await getCountryByName(name, apiVersion);
                    console.log('response', response);
                    const parsedData = MODEL_DATA(response.data[0], parseFloat(apiVersion))
                    setCountry(parsedData);
                } catch (error) {
                    console.log('Error fetching country details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCountryDetails();
        }
    }, [name, apiVersion]);

    useEffect(() => {
        if (country) {
            const fetchBorderCountries = async () => {
                try {
                    setLaodingBorderCountries(true);
                    const responseBorderCoutnries = await getCountryByCode(country.borders, apiVersion)
                    console.log('responseBorderCoutnries', responseBorderCoutnries)
                    setBorderCountries(responseBorderCoutnries.data);
                } catch (error) {
                    console.log('error', error);
                }
                finally {
                    setLaodingBorderCountries(false);
                }
            }
            fetchBorderCountries();
        }
    }, [country, apiVersion])

    if (loading) return <CircularProgress />;

    return (
        <div className="container mx-auto p-4">
            <Button LinkComponent={Link} to="/" variant="contained"  className='shadow-dm' startIcon={<ArrowBack />}>Back</Button>
            {
                country ?
                    <Card className="flex flex-col lg:flex-row items-start mt-4">
                        <img src={country.flag} alt={country.name} className="w-full lg:w-1/2 h-auto object-fit mb-4 lg:mb-0" />
                        <CardContent className="lg:ml-8">
                            <Typography variant="h4" component="div" className="mb-4">{country.name}</Typography>
                            <Typography variant="body1"><strong>Native Name:</strong> {country.nativeName}</Typography>
                            <Typography variant="body1"><strong>Population:</strong> {country.population.toLocaleString()}</Typography>
                            <Typography variant="body1"><strong>Region:</strong> {country.region}</Typography>
                            <Typography variant="body1"><strong>Sub Region:</strong> {country.subregion}</Typography>
                            <Typography variant="body1"><strong>Capital:</strong> {country.capital}</Typography>
                            <Typography variant="body1"><strong>Top Level Domain:</strong> {country.topLevelDomain.join(', ')}</Typography>
                            <Typography variant="body1"><strong>Currencies:</strong> {country.currencies.map(c => c.name).join(', ')}</Typography>
                            <Typography variant="body1"><strong>Languages:</strong> {country.languages.toString()}</Typography>
                            <div className={`mt-5`}>
                                <Typography variant="body1"><strong>Border Countries:</strong> { laodingBorderCountries? <CircularProgress />:
                                    country.borders ? country.borders.join(', ') : 'None'}</Typography>

                            </div>
                        </CardContent>
                    </Card> :
                    <div>No Data Found</div>
            }
        </div>
    );
}

export default CountryDetail;
