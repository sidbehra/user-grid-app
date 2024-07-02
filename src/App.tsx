import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserGrid from './components/UserGrid';
import LocationToolbar from './components/LocationToolbar';
import { Container, Typography } from '@mui/material';
import './styles.css';

function App() {
  return (
    <Provider store={store}>
      <Container className="container" maxWidth="lg">
        <Typography variant="h2" component="h1" className="title">
          User Management
        </Typography>
        <LocationToolbar />
        <UserGrid />
      </Container>
    </Provider>
  );
}

export default App;