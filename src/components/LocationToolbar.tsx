import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box } from '@mui/material';

const LocationToolbar: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);

  const locationCounts = users.reduce((acc, user) => {
    acc[user.location] = (acc[user.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box className="location-toolbar">
      {Object.entries(locationCounts).map(([location, count]) => (
        <span key={location} className="location-chip">
          {location}: {count}
        </span>
      ))}
    </Box>
  );
};

export default LocationToolbar;