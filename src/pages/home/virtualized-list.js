import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { FixedSizeList } from 'react-window'



function VirtualizedList({
    data
}) {

    
function renderRow(props) {
    const { index, style } = props;
  
    const country = data[index];
    return (
      <Link to={`/country/${country.name}`} style={style} key={index}>
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
    );
  }

    return (
        <div className={``}>
            <FixedSizeList
                height={400}
                width={"100ch"}
                itemSize={46}
                itemCount={data.length}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    )
}
export default VirtualizedList