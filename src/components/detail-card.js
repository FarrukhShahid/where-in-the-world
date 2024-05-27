import { Typography } from '@mui/material'
import React from 'react'

function DetailCard({
    title,
    src,
    content,
    actiontitle,
    actions
}) {
    return (
        <div className="flex flex-col lg:flex-row items-start mt-4">
            <img src={src} alt={title} className="w-full lg:w-1/2 h-auto object-fit mb-4 lg:mb-0" />
            <div className="lg:ml-8">
                <Typography variant="h3" component="div" className="mb-4">{title}</Typography>
                <hr className='my-3'/>
                {
                    content && Array.isArray(content) && content.map((item, i) => (
                        <Typography key={i} variant="body2" color="textSecondary"><strong>{item.key}:</strong> {item.value}</Typography>
                    ))
                }
                <hr className='my-3'/>
                <div className={`mt-5`}>
                    <Typography variant="h4" className='font-bold'><strong>{actiontitle}:</strong></Typography>
                    {

                        <div className={`flex ms-2`}>
                            {
                                actions.length > 0 && actions.map((item, i) => (
                                    <div className={`me-2`} key={i}>
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
export default DetailCard