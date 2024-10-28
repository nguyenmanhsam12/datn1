import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import { useSizes } from '../../../context/SizeContext';

const ListProduct = () => {
  const { products, removeProduct, addVariant} = useProducts();
  const baseURL = `http://127.0.0.1:8000`;
  const {sizes} = useSizes();
  const [size, setSize] = useState('');
  const [stock, setStock] = useState('');
  
  // Trạng thái để theo dõi sản phẩm nào đang mở form
  const [openProductId, setOpenProductId] = useState(null);
  
  const handleAddAttributeToggle = (productId) => {
    // Nếu sản phẩm đang mở, đóng nó, ngược lại mở sản phẩm đó
    setOpenProductId(openProductId === productId ? null : productId);
  };

  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    const formData = {
      product_id: productId,
      size_id: size,
      stock: stock,
    };
    console.log(formData);

    // Call addVariant with formData
    await addVariant(formData);

    // Optionally reset form fields
    setSize('');
    setStock('');
    setOpenProductId(null);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Products Tables</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">List Products</li>
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
                <th>ID</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Mã</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Thương Hiệu</th>
                <th>Danh Mục</th>
                <th>Tác Giả</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <React.Fragment key={product.id}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.sku}</td>
                    <td style={{ width: '10%', height: 'auto' }}>
                      <img style={{ width: '50%', height: 'auto', objectFit: 'contain' }} src={`${baseURL}${product.image}`} />
                    </td>
                    <td>{product.price}</td>
                    <td>{product.brand_id}</td>
                    <td>{product.category_id}</td>
                    <td>{product.user_id}</td>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-outline-dark">Hành động</button>
                        <button type="button" className="btn btn-outline-dark dropdown-toggle dropdown-hover dropdown-icon" data-toggle="dropdown">
                          <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <Link to={`/admin/edit-products/${product.id}`} className="btn btn-info btn-sm dropdown-item"><i className="fas fa-pencil-alt"></i> Sửa</Link>
                          <button onClick={() => removeProduct(product.id)} className="btn btn-danger btn-sm dropdown-item"><i className="fas fa-trash"></i> Xóa</button>
                          <button onClick={() => handleAddAttributeToggle(product.id)} className="btn btn-info btn-sm dropdown-item"><i className="fas fa-plus"></i> Thêm thuộc tính</button>
                          <Link to={`/admin`} className="btn btn-info btn-sm dropdown-item"><i className="fas fa-eye"></i> Xem thuộc tính</Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {openProductId === product.id && (
                    <tr>
                      <td colSpan="10">
                        {/* Form thêm thuộc tính */}
                        <form onSubmit={(e) => handleSubmit(e, product.id)}>
                          <div className="form-group">
                            <input type="hidden" name="product_id" value={product.id} />
                          </div>
                          <div className="form-group">
                            <label htmlFor={`attribute-value-${product.id}`}>Kích cỡ</label>
                            <select
                              className="form-control"
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                              <option disabled value=''>Select size</option>
                              {sizes.map((size) => (
                                <option key={size.id} value={size.id}>
                                  {size.size}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor={`attribute-value-${product.id}`}>Số lượng</label>
                            <input
                              type="text"
                              id={`attribute-value-${product.id}`}
                              onChange={(e) => setStock(e.target.value)}
                              value={stock}
                              className="form-control"
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">Thêm</button>
                          <button type="button" onClick={() => handleAddAttributeToggle(product.id)} className="btn btn-secondary ml-2">Hủy</button>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {/* /.card-body */}
      </div>
    </div>
  );
}

export default ListProduct;
