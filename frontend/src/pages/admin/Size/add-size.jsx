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
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Size Add Form</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Add Size</li>
                    </ol>
                </div>
                </div>
            </div>
        </section>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Size</label>
                    <input name='size' defaultValue={formData.size} onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" placeholder="nhập size" />
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

export default AddSize