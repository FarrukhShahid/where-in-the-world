import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ProgressX from './progress-x'

function CardX({
    title,
    src,
    alt,
    to,
    content,
    loading
}) {
    return (
        loading ?
            <Card>
                <div className={`mb-4`}>
                <ProgressX skeleton={true} block={true} width={"100%"} height={120} />
                </div>
                <CardContent>
                    <Typography variant="h6" component="div"><ProgressX rows={1} skeleton={true} height={30} width={"50%"}/></Typography>
                    <ProgressX rows={3} skeleton={true} height={20} width={"100%"}/>
                </CardContent>
            </Card> :
            <Link to={to}>
                <Card>
                    <img src={src} alt={alt} className="w-full h-40 object-fit mb-4" />
                    <CardContent>
                        <Typography variant="h6" component="div" className='font-bold'>{title}</Typography>
                        {
                            content && Array.isArray(content) && content.map((item, i) => (
                                <Typography key={i} variant="body2" color="textSecondary"><strong>{item.key}:</strong> {item.value}</Typography>
                            ))
                        }
                    </CardContent>
                </Card>
            </Link>
    )
}
export default CardX