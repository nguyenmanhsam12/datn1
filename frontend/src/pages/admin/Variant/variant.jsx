
import { Link } from 'react-router-dom';

const ListVariant = () => {


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Variants Tables</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">List Variant</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Responsive Hover Table</h3>
                    <div className="card-tools">
                        <div className="input-group input-group-sm" style={{ width: 150 }}>
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
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Size</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {brands.map((brand, i)=>(
                        <tr key={brand.id}>
                            <td>{i+1}</td>
                            <td>{brand.name}</td>
                            <td>{brand.slug}</td>
                            <td>
                                <Link to={`/admin/edit-brands/${brand.id}`} className="btn btn-info btn-sm"><i className="fas fa-pencil-alt"></i> Sửa</Link>
                                <button onClick={()=>removeBrand(brand.id)} className="ml-3 btn btn-danger btn-sm"><i className="fas fa-trash"></i> Xóa</button>
                            </td>
                        </tr>
                        ))} */}

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <Link to={`/admin/edit-variants/1`} className="btn btn-info btn-sm"><i className="fas fa-pencil-alt"></i> Sửa</Link>
                                    <button className="ml-3 btn btn-danger btn-sm"><i className="fas fa-trash"></i> Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* /.card-body */}
            </div>
        </div>
    );
}

export default ListVariant;
