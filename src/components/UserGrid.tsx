import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers, deleteUser, updateUser } from '../store/usersSlice';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Select, MenuItem, Box, CircularProgress } from '@mui/material';

const locations = ['ABU DHABI', 'AMSTERDAM', 'AUSTIN', 'BARCELONA', 'BENGALURU', 'BRASÍLIA', 'BRUSSELS', 'BUENOS AIRES'];

const UserGrid: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleLocationChange = (id: string, newLocation: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      dispatch(updateUser({ ...user, location: newLocation }));
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'hobby', headerName: 'Hobby', width: 150 },
    { field: 'createdAt', headerName: 'Creation Date', width: 200 },
    {
      field: 'location',
      headerName: 'Location',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Select
          value={params.value}
          onChange={(e) => handleLocationChange(params.row.id as string, e.target.value as string)}
          size="small"
          sx={{ 
            width: '120px',
            fontSize: '0.8rem',
            '& .MuiSelect-select': { 
              padding: '4px 8px',
            },
          }}
        >
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>{loc}</MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button 
          onClick={() => handleDelete(params.row.id as string)}
          variant="contained"
          className="delete-button"
        >
          Delete
        </Button>
      ),
    },
  ];

  if (status === 'loading') {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box className="error-container">
        Error: {error}
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <div className="user-grid">
        <DataGrid
          rows={users}
          columns={columns}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
    </Box>
  );
};

export default UserGrid;