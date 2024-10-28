import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { fecthBrandById } from '../../../services/brandService';
import { useSizes } from '../../../context/SizeContext';

const EditVariant = () => {


  const { sizes } = useSizes();

  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ size_id: '', stock: '', price: '' });

  useEffect(() => {
    const loadBrandEdit = async () => {
      try {
        const brandToEdit = await fecthBrandById(id);
        // console.log(brandToEdit);
        if (brandToEdit) {
          setFormData({ name: brandToEdit.data.name });
        }
      } catch (error) {
        console.error('Error fetching brand:', error);
      }
    };
    loadBrandEdit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // // console.log(formData);

    // await editBrand(id, formData);
    // navigate('/admin/brands');
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
              value=''
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
              className="form-control"
              value={sizes.id}
            >
              <option disabled selected value=''>Select size</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.size}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="size_id">Số lượng</label>
            <input
              name='size_id'
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="size_id"
              placeholder="Edit size"
            />
          </div>
          <div className="form-group">
            <label htmlFor="size_id">Giá</label>
            <input
              name='size_id'
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="size_id"
              placeholder="Edit size"
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
