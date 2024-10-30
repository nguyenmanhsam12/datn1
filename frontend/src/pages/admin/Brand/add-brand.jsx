import React, { useState } from 'react'
import { useBrands } from '../../../context/BrandContext'
import { useNavigate } from 'react-router-dom';

const AddBrand = () => {
    const {addBrand} = useBrands();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name:''})

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({...prev,[name]:value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addBrand(formData);
        
        navigate('/admin/brands');
    };
  return (
    <div className="content-wrapper">
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Brands Add Form</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Add Brand</li>
                    </ol>
                </div>
                </div>
            </div>
        </section>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Brand</label>
                    <input name='name' defaultValue={formData.name} onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" placeholder="nhập thương hiệu" />
                </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
                <button type="submit" className="btn btn-primary">Thêm mới</button>
            </div>
        </form>
    </div>
  )
}

export default AddBrand