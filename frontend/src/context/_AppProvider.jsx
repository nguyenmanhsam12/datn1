// src/contexts/AppProvider.jsx
import React from 'react';
import { BrandProvider } from './BrandContext';
import { CategoryProvider } from './CategoryContext';
import { SizeProvider } from './SizeContext';
import { ColorProvider } from './ColorContext';
import { ProductProvider } from './ProductContext';

const AppProvider = ({ children }) => (
  <BrandProvider>
    <CategoryProvider>
        <SizeProvider>
          <ColorProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </ColorProvider>
        </SizeProvider>
    </CategoryProvider>
  </BrandProvider>
);

export default AppProvider;
