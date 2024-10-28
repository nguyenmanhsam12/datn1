import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useVariants } from '../../../context/VariantContext';
import { fecthVariantById } from '../../../services/variantService';
import { useSizes } from '../../../context/SizeContext';

const EditVariant = () => {
  const {sizes} = useSizes();
  const {editVariant} = useVariants();
  const {id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({product_name:'', size_id:'', stock:'' , price:''})

  useEffect(()=>{
    const loadVariantEdit = async()=>{
      try {
        const VariantToEdit = await fecthVariantById(id);
        console.log(VariantToEdit);
        if (VariantToEdit) {
          setFormData({
            product_name:VariantToEdit.data.product_name,
            size_id:VariantToEdit.data.size.id,
            stock:VariantToEdit.data.stock,
            price:VariantToEdit.data.price
          })
        }
        
      } catch (error) {
        
      }
    }
    loadVariantEdit();
  },[id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    await editVariant(id, formData);
    navigate('/admin/variants'); 
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Variant</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Edit Variant</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="VariantName">Tên sản phẩm</label>
            <input
              name='size_id'
              value={formData.product_name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="VariantName"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor='size_id'>Kích cỡ</label>
            <select
              id='size_id'
              name='size_id'
              className="form-control"
              onChange={handleChange}
              value={formData.size_id}
            >
              <option disabled  value=''>Select size</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.size}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stock">Số lượng</label>
            <input
              name='stock'
              value={formData.stock}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="stock"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá</label>
            <input
              name='price'
              onChange={handleChange}
              value={formData.price}
              type="text"
              className="form-control"
              id="price"
            />
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary">Sửa thuộc tính</button>
        </div>
      </form>
    </div>
  );
};

export default EditVariant;
