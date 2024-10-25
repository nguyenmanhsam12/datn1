import React, { useState, useEffect } from 'react';
import { useBrands } from '../../../context/BrandContext';
import { useNavigate, useParams } from 'react-router-dom';
import { fecthBrandById } from '../../../services/brandService';

const EditBrand = () => {
  const { editBrand } = useBrands();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    
    await editBrand(id, formData);
    navigate('/admin/brands'); 
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Brand</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Edit Brand</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="brandName">Brand</label>
            <input
              name='name'
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="brandName"
              placeholder="Edit brand name"
            />
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditBrand;
