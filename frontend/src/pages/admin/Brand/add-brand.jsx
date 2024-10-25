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
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Brands Add Form</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Add Brand</li>
                    </ol>
                </div>
                </div>
            </div>
        </section>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Brand</label>
                    <input name='name' defaultValue={formData.name} onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" placeholder="name brand" />
                </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddBrand