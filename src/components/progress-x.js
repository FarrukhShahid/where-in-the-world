import { CircularProgress, Skeleton } from '@mui/material'
import React from 'react'

function ProgressX({
    skeleton, 
    rows,
    height,
    width,
    centered,
    block,

}) {
    if (skeleton) {
        if (block) {
            return <Skeleton variant='rectangular' width={width} height={height} />
        }
        return (
            rows && [...Array(parseInt(rows) || 8).keys()].map((_, i) => (
                <div key={i} className={``}>
                    <Skeleton width={width} height={height} />
                </div>
            ))
        )
    }
    if (centered) {
        return (
            <div className={`flex justify-center`}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <CircularProgress />
    )
}
export default ProgressX