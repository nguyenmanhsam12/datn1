import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../../context/CategoryContext';
import { fecthCategoryById } from '../../../services/categoryService';

const EditCategory = () => {
    const {editCategory, categories} = useCategories()
    const navigate = useNavigate();
    const {id} = useParams();
    const [formData, setFormData] = useState({name:'', parent_id: '' })

    useEffect(()=>{
        const loadCatEdit = async () =>{
            try {
                const CatToEdit = await fecthCategoryById(id)
                console.log(CatToEdit);
                
                if (CatToEdit) {
                   setFormData({
                    name:CatToEdit.data.category.name,
                    parent_id:CatToEdit.data.category.parent_id
                   }) 
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadCatEdit();
    },[id])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prev) => ({...prev,[name]:value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editCategory(id,formData);
        // console.log(formData);
        
        navigate('/admin/categories');
    };
  return (
    <div className="content-wrapper">
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Category Edit Form</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Edit Category</li>
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
                        className="form-control custom-select">
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

export default EditCategory