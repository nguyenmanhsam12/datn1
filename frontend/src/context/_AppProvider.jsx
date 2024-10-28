// src/contexts/AppProvider.jsx
import React from 'react';
import { BrandProvider } from './BrandContext';
import { CategoryProvider } from './CategoryContext';
import { SizeProvider } from './SizeContext';
import { ProductProvider } from './ProductContext';
import { VariantProvider } from './VariantContext';

const AppProvider = ({ children }) => (
  <BrandProvider>
    <CategoryProvider>
        <SizeProvider>
            <ProductProvider>
              <VariantProvider>
              {children}
              </VariantProvider>
            </ProductProvider>
        </SizeProvider>
    </CategoryProvider>
  </BrandProvider>
);

export default AppProvider;
