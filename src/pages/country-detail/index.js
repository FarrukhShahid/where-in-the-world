import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { getCountryByCode, getCountryByName } from '../../services/data';
import { ArrowBack } from '@mui/icons-material';
import { ApiVersionContext } from '../../api-version-context';
import { MODEL_DATA } from '../../utils/functions';
import { AlertX, DetailCard, ProgressX } from '../../components';

function CountryDetail() {
    const { name } = useParams(); // Getting the country name in params
    const { apiVersion } = useContext(ApiVersionContext); // getting the api version from context api
    const navigate = useNavigate(); // to navigate
    const location = useLocation(); // to use the current location
    const [country, setCountry] = useState(null); // current country data
    const [loading, setLoading] = useState(false); 
    const [borderCountries, setBorderCountries] = useState([]); // border countries list of the current country
    const [laodingBorderCountries, setLaodingBorderCountries] = useState(false);
    const [refreshContent, setRefreshContent] = useState(false);


    useEffect(() => {
        if (name) {
            const fetchCountryDetails = async () => {
                try {
                    setCountry(null);
                    setLoading(true);
                    /**
                     * Fetching the specified country complete data using the Name of the country
                     */
                    const response = await getCountryByName(name, apiVersion);
                    // console.log('response', response);
                    // saving the results after modeling them
                    setCountry(MODEL_DATA(response.data[0], parseFloat(apiVersion)));
                } catch (error) {
                    console.error('Error fetching country details:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCountryDetails();
        }
    }, [name, apiVersion, refreshContent]); // Listining to name, api version and forced refreshContent changes

    useEffect(() => {
        if (country) {
            const fetchBorderCountries = async () => {
                try {
                    setBorderCountries([])
                    setLaodingBorderCountries(true);
                    /**
                     * Getting the border countries list using the codes fetched in the country data from the other API
                     */
                    const responseBorderCoutnries = await getCountryByCode(country.borders, apiVersion)
                    // saving the results after modeling them
                    setBorderCountries(MODEL_DATA(responseBorderCoutnries.data, apiVersion));
                } catch (error) {
                    console.log('error', error);
                }
                finally {
                    setLaodingBorderCountries(false);
                }
            }
            fetchBorderCountries();
        }
    }, [country, apiVersion]) // Listining to country, api version

    const handleNavigation = () => {
        // If the details page is hit directly using the url, the key will be default so we will redirect back to home page
        if (location.key !== 'default') {
            navigate(-1);
          } else {
            navigate('/');
          }
      };

    return (
        <div className="container mx-auto p-4">
            <Button onClick={handleNavigation} variant="contained" color='primary' className='shadow-dm' startIcon={<ArrowBack />}>Back</Button>
            {
                loading ? <DetailCard loading={true} /> :

                    country ? <DetailCard
                        title={country.name}
                        src={country.flag}
                        content={[
                            { key: "Native Name", value: country.nativeName },
                            { key: "Population", value: country.population.toLocaleString() },
                            { key: "Region", value: country.region },
                            { key: "Sub Region", value: country.subregion },
                            { key: "Capital", value: country.capital },
                            { key: "Top Level Domain", value: country.topLevelDomain.join(', ') },
                            { key: "Currencies", value: country.currencies.map(c => c.name).join(', ') },
                            { key: "Languages", value: country.languages.map(c => c.name || c).join(', ') },
                        ]}
                        actiontitle={"Border Countries"}
                        actions={
                            laodingBorderCountries ? [<ProgressX skeleton={true} block={true} width={100} height={30} />, <ProgressX skeleton={true} block={true} width={100} height={30} />, <ProgressX skeleton={true} block={true} width={100} height={30} />] :
                                (borderCountries.length > 0 ? borderCountries.map(ncountry =>
                                    <Button LinkComponent={Link} size='small' variant='outlined' color="secondary" to={`/country/${ncountry.name}`}>{ncountry.name}</Button>
                                ) : [])
                        }
                    /> : <div className={`p-4`}>
                        <AlertX
                            type={"error"}
                            message={"Somthing went wrong, Please try again."}
                            action={<Button color='secondary' onClick={() => setRefreshContent(!refreshContent)}>Try Again</Button>}
                        />
                    </div>
            }
        </div>
    );
}

export default CountryDetail;
