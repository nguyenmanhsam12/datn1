// src/contexts/AppProvider.jsx
import React from 'react';
import { BrandProvider } from './BrandContext';
import { CategoryProvider } from './CategoryContext';
import { SizeProvider } from './SizeContext';

const AppProvider = ({ children }) => (
  <BrandProvider>
    <CategoryProvider>
        <SizeProvider>
          {children}
        </SizeProvider>
    </CategoryProvider>
  </BrandProvider>
);

export default AppProvider;
