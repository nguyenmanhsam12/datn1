import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../../context/CategoryContext';

const AddCategory = () => {
    const {addCategory, categories} = useCategories()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name:'', parent_id: '' })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({...prev,[name]:value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCategory(formData);
        console.log(formData);
        
        navigate('/admin/categories');
    };
  return (
    <div className="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Category Add Form</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Add Category</li>
                    </ol>
                </div>
                </div>
            </div>
        </section>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Category</label>
                    <input name='name' defaultValue={formData.name} onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" placeholder="name category" />
                </div>
                <div className="form-group">
                    <select 
                        id="parentCategory"
                        name="parent_id"
                        value={formData.parent_id}
                        onChange={handleChange} 
                        class="form-control custom-select">
                            <option selected="" disabled="">Select one</option>
                            {categories.map((category)=>(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                    </select>
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

export default AddCategory