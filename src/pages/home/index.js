import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Card, CardContent, Typography, MenuItem, Select, Paper, InputAdornment, CircularProgress, Alert, Button } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { getCountriesList } from '../../services/data';
import { MODEL_DATA } from '../../utils/functions';
import { ApiVersionContext } from '../../api-version-context';

function Home() {
    const { apiVersion } = useContext(ApiVersionContext);
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshContent, setRefreshContent] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setError(null);
                setLoading(true);
                const response = await getCountriesList("", apiVersion);
                console.log('response', response);
                setCountries(MODEL_DATA(response.data, apiVersion)); // saving the original results
                // Extract unique regions
                const uniqueRegions = [...new Set(response.data.map(country => country.region))];
                setRegions(uniqueRegions);
            } catch (error) {
                // TODO: Add the notify package here
                setError(error);
                console.log('error', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCountries();
    }, [apiVersion, refreshContent]);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedRegion === '' || country.region === selectedRegion)
    );

    return (
        <div className="container mx-auto p-4">
            <div className={`flex flex-wrap justify-between`}>
                <TextField
                    placeholder="Search"
                    component={Paper}
                    fullWidth
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{ maxWidth: '50ch' }}
                    className='shadow-md'
                    InputProps={{
                        startAdornment: <InputAdornment position="start" className='ms-5'>
                            <SearchRounded />
                        </InputAdornment>,
                    }}
                />
                
                <Paper className='shadow-md'>
                    <Select
                        // placeholder='Filter by Region'
                        fullWidth
                        sx={{ maxWidth: '30ch' }}
                        displayEmpty
                        value={selectedRegion}
                        onChange={e => setSelectedRegion(e.target.value)}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Filter by Region</em>;
                            }

                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>
                        {
                            regions.map((item, i) => (
                                <MenuItem value={item} key={i}>{item}</MenuItem>
                            ))
                        }
                    </Select>

                </Paper>
            </div>
            <div className={`mt-4`}>
                {error &&
                    <Alert severity='error' action={<Button onClick={() => setRefreshContent(!refreshContent)}>Try Again</Button>}>Error fetching data</Alert>
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading ? <CircularProgress /> :
                        // <VirtualizedList data={filteredCountries}/>
                        filteredCountries.map(country => (
                            <Link to={`/country/${country.name}`} key={country.name}>
                                <Card>
                                    <img src={country.flag} alt={country.name} className="w-full h-32 object-cover mb-4" />
                                    <CardContent>
                                        <Typography variant="h6" component="div">{country.name}</Typography>
                                        <Typography variant="body2" color="textSecondary"><strong>Population:</strong> {country.population.toLocaleString()}</Typography>
                                        <Typography variant="body2" color="textSecondary"><strong>Region:</strong> {country.region}</Typography>
                                        <Typography variant="body2" color="textSecondary"><strong>Capital:</strong> {country.capital}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default Home;
