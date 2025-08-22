import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import YearSelection from './documents/YearSelection';
import CategorySelection from './documents/CategorySelection';
import DocumentUpload from './documents/DocumentUpload';
import DocumentList from './documents/DocumentList';

const Documents: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route index element={<YearSelection />} />
          <Route path=":year" element={<CategorySelection />} />
          <Route path=":year/:category" element={
            <Box>
              <DocumentUpload />
              <Box sx={{ mt: 4 }}>
                <DocumentList />
              </Box>
            </Box>
          } />
        </Routes>
      </Box>
    </Container>
  );
};

export default Documents;
