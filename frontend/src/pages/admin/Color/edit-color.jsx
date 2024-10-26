import React, { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate, useParams } from 'react-router-dom';
import { useColors } from '../../../context/ColorContext';
import { fecthColorById } from '../../../services/colorService';

const EditColor = () => {
    const { editColor } = useColors();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({ color: '' });

    useEffect(() => {
        const loadColorEdit = async () => {
            try {
                const ColorToEdit = await fecthColorById(id);
                console.log(ColorToEdit);
                if (ColorToEdit) {
                    setFormData({ color: ColorToEdit.data.color });
                }
            } catch (error) {
                console.error('Error fetching color:', error);
            }
        };
        loadColorEdit();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editColor(id, formData);
        console.log(formData);
        
        navigate('/admin/colors');
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Color Edit Form</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Edit Color</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Color</label>
                        <input
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="new color"
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

export default EditColor;
