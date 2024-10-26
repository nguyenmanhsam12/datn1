import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useColors } from '../../../context/ColorContext';

const ListColor = () => {
    const {colors, removeColor} = useColors();
    // console.log(colors);
    

    return (
        <div className="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Colors Tables</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">List Color</li>
                        </ol>
                    </div>
                    </div>
                </div>
            </section>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Responsive Hover Table</h3>
                    <div className="card-tools">
                    <div className="input-group input-group-sm" style={{width: 150}}>
                        <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                        <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                            <i className="fas fa-search" />
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                {/* /.card-header */}
                <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Color</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colors.map((color, i)=>(
                        <tr key={color.id}>
                            <td>{i+1}</td>
                            <td>{color.color}</td>
                            <td>
                                <Link to={`/admin/edit-colors/${color.id}`} className="btn btn-info btn-sm"><i class="fas fa-pencil-alt"></i> Sửa</Link>
                                <button onClick={()=>removeColor(color.id)} className="ml-3 btn btn-danger btn-sm"><i class="fas fa-trash"></i> Xóa</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                {/* /.card-body */}
            </div>
        </div>
    );
}

export default ListColor;
