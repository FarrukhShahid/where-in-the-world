import React, { useState, useEffect, useContext } from 'react';
import { TextField, MenuItem, Select, Paper, InputAdornment, Button } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { getCountriesList } from '../../services/data';
import { MODEL_DATA } from '../../utils/functions';
import { ApiVersionContext } from '../../api-version-context';
import { AlertX, CardX, UxSpace } from '../../components';

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
                {error && <AlertX 
                    type="error"
                    message="Error fetching data"
                    action={<Button onClick={() => setRefreshContent(!refreshContent)}>Try Again</Button>}/>
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading ? [...Array(10).keys()].map((_, i) => <CardX key={i} loading={true} />) :
                        // <VirtualizedList data={filteredCountries}/>
                        filteredCountries.map(country => (
                            <CardX
                                key={country.name}
                                title={country.name}
                                src={country.flag}
                                to={`/country/${country.name}`}
                                alt={country.name}
                                content={[
                                    { key: "Population", value: country.population.toLocaleString() },
                                    { key: "Region", value: country.region },
                                    { key: "Capital", value: country.capital }
                                ]}
                            />
                        ))
                    }
                </div>
                <UxSpace />
            </div>
        </div>
    );
}

export default Home;
