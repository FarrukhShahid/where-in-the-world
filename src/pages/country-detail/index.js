import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { getCountryByName } from '../../services/data';
import { ArrowBack } from '@mui/icons-material';
import { ApiVersionContext } from '../../api-version-context';
import { MODEL_DATA } from '../../utils/functions';

function CountryDetail() {
    const { name } = useParams();
    const { apiVersion } = useContext(ApiVersionContext);
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (name) {
            const fetchCountryDetails = async () => {
                try {
                    setLoading(true);
                    const response = await getCountryByName(name, apiVersion);
                    console.log('response', response);
                    setCountry(MODEL_DATA(response.data[0], parseFloat(apiVersion)));
                } catch (error) {
                    console.log('Error fetching country details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCountryDetails();
        }
    }, [name, apiVersion]);

    if (loading) return <CircularProgress />;

    return (
        <div className="container mx-auto p-4">
            <Button LinkComponent={Link} to="/" variant="contained" color='inherit' className='shadow-dm' startIcon={<ArrowBack />}>Back</Button>
            {
                country ?
                    <Card className="flex flex-col lg:flex-row items-start mt-4">
                        <img src={country.flag} alt={country.name} className="w-full lg:w-1/2 h-auto object-cover mb-4 lg:mb-0" />
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
                            <Typography variant="body1"><strong>Border Countries:</strong> {country.borders ? country.borders.join(', ') : 'None'}</Typography>
                        </CardContent>
                    </Card> :
                    <div>No Data Found</div>
            }
        </div>
    );
}

export default CountryDetail;
