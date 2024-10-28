import React, { useEffect, useState } from 'react';
import { useProducts } from '../../../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import { fecthBrandById } from '../../../services/brandService';
import { fetchProductById } from '../../../services/productService';

const EditProduct = () => {
  const {editProduct, products} = useProducts();
  const navigate = useNavigate();
  const {id} = useParams();
  // const [formData, setFormData] = useState({name:'', description:'', sku:'',image:{},gallary:[]})

  useEffect(()=>{
    const loadProductsEdit = async()=>{
      try {
        const ProductToEdit = await fetchProductById(id)
        // console.log(ProductToEdit);
        console.log(1);
        
        
        // if (ProductToEdit) {
        //   setFormData
        // }        
      } catch (error) {
        
      }
    }
    loadProductsEdit();
  },[id])
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Product Edit Form</h1>
      </section>
      <section className="content">
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="name">Tên Sản Phẩm</label>
            <input
              type="text"
              id="name"
              name='name'
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả sản phẩm</label>
            <textarea
              id="description"
              name='description'
              className="form-control"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor='price'>Giá</label>
            <input
              type="text"
              id='price'
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor='sku'>SKU</label>
            <input
              type="text"
              id='sku'
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand_id">Thương Hiệu</label>
            <select
              id="brand_id"
              className="form-control custom-select"
            >
              <option disabled selected value=''>Select one</option>
              {/* Brand options go here */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category_id">Danh Mục</label>
            <select
              id="category_id"
              className="form-control custom-select"
            >
              <option disabled selected value=''>Select one</option>
              {/* Category options go here */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor='image'>Hình Ảnh</label>
            <input
              type="file"
              id='image'
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor='gallary'>Gallery</label>
            <input
              type="file"
              id='gallary'
              className="form-control"
              multiple
            />
          </div>

          <button type="button" className="btn btn-primary float-right mt-5">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default EditProduct;
