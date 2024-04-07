import React from 'react';

// import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { pledges } from 'src/_mock/pledges';

const DetailedView = (uid) => {
    const pledge = pledges.find((item) => (item.UID), uid)
    const currentDate = new Date();
    const numDaysAway = Math.floor((pledge.deadline.getTime() - currentDate.getTime()) / 86400000)

    return (
        <div>
            <Typography align="center" variant="h3" component="h1" gutterBottom>
                {pledge?.pledge}
            </Typography>
            <Typography align="center" variant="h4" component="h1" gutterBottom>
                Time Left: {numDaysAway} Days
            </Typography>
            <Typography variant="body1" component="p">
                {pledge?.GRI}
            </Typography>
            {pledge?.howWeGetThere.map((step, index) => (
                <Typography key={index} variant="body1" component="p">
                {index + 1}. {step}
                </Typography>
            ))}
        </div>
    );
};

export default DetailedView;
