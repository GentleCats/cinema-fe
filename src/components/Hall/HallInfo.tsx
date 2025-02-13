import React from 'react';

import { Hall } from '@/models/Hall';
import { Card, CardContent, Typography } from '@mui/material';

interface HallInfoProps {
  hall: Hall;
}

const HallInfo: React.FC<HallInfoProps> = ({ hall }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{hall.name}</Typography>
        <Typography variant="body2">Capacity: {hall.capacity}</Typography>
      </CardContent>
    </Card>
  );
};

export default HallInfo;
