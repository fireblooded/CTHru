/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';


// import Typography from '@mui/material/Typography';

const ScrollableList = ({ pledges }) => {
  const navigate = useNavigate();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleRowClick = (UID) => {
    navigate(`/pledges/${UID}`, { state: { pledges } });
  };

  return (
    <div className="scrollable-list">
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">GRI</TableCell>
                        <TableCell align="left">Pledge</TableCell>
                        <TableCell align="left">Deadline</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pledges.map((pledge, index) => (
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <TableRow key={index} className="list-row" onClick={() => handleRowClick(pledge.UID)}>
                            <TableCell>
                                {pledge.GRI.substring(4)}
                            </TableCell>
                            <TableCell>
                                {pledge.pledge}
                            </TableCell>
                            <TableCell>
                                {months[pledge?.deadline.getMonth()]} {pledge?.deadline.getDay()}, {pledge?.deadline.getFullYear()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
};

export default ScrollableList;