import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSizes } from '../../../context/SizeContext';

const AddSize = () => {
    const {addSize} = useSizes();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({size:''})

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({...prev,[name]:value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addSize(formData);
        // console.log(formData);
        
        navigate('/admin/sizes');
    };
  return (
    <div className="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Size Add Form</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Add Size</li>
                    </ol>
                </div>
                </div>
            </div>
        </section>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Size</label>
                    <input name='size' defaultValue={formData.size} onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" placeholder="new size" />
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

export default AddSize