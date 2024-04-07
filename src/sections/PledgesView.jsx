/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';

// import { makeStyles } from '@mui/styles'
import { Button, Typography } from '@mui/material'

import { pledges } from '../_mock/pledges'
import ScrollableList from '../components/ScrollableList';

function PledgesView() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/pledges/create");
    };

    return (
        <div>
            <Typography>
                Pledges
            </Typography>
            <ScrollableList pledges={pledges}/>
            <div>
                <Button onClick={handleButtonClick}>
                    Take Another Step!
                </Button>
            </div>
        </div>
    )
}

export default PledgesView;