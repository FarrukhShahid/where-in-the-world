import { CircularProgress, Skeleton } from '@mui/material'
import React from 'react'

function ProgressX({
    skeleton, 
    rows,
    height,
    width,
    centered,
    block,
    ...rest
}) {
    if (skeleton) {
        if (block) {
            return <Skeleton variant='rectangular' width={width} height={height} {...rest}/>
        }
        return (
            rows && [...Array(parseInt(rows) || 8).keys()].map((_, i) => (
                <div key={i} className={``}>
                    <Skeleton width={width} height={height} className={`mt-2`} />
                </div>
            ))
        )
    }
    if (centered) {
        return (
            <div className={`flex justify-center`}>
                <CircularProgress color='secondary' />
            </div>
        )
    }
    return (
        <CircularProgress color='secondary' {...rest}/>
    )
}
export default ProgressX