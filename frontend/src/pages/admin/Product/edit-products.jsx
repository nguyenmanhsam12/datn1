import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import { useBrands } from '../../../context/BrandContext';
import { useCategories } from '../../../context/CategoryContext';
import { fetchProductById } from '../../../services/productService';

const EditProduct = () => {
  const {editProduct} = useProducts();
  const { id } = useParams(); // Get id from the URL
  const navigate = useNavigate();
  const { brands } = useBrands();
  const { categories } = useCategories();
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState({});
  const [gallary, setGallary] = useState([]);
  const [description, setDescription] = useState('');
  

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await fetchProductById(id);
      console.log(product);
      
      if (product) {
        setName(product.data.name);
        setDescription(product.data.description);
        setBrandId(product.data.brand_id);
        setCategoryId(product.data.category_id);
        setSku(product.data.sku);
        setImage(product.data.image);
        setGallary(product.data.gallary); 
      }
    };

    fetchProduct();
  }, [id]);

  const baseUrl = 'http://127.0.0.1:8000';

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallary(files);
  };


  const handleSubmit = async () => {
    const formData = {
      name:name,
      description:description,
      brand_id: brandId,
      category_id: categoryId,
      sku:sku,
      image:image,
      gallary:gallary, 
    };

    console.log(formData);
    await editProduct(id, formData); 
    // navigate('/admin/products');
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Product Edit Form</h1>
      </section>
      <section className="content">
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="name">Tên Sản Phẩm</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả sản phẩm</label>
            <textarea
              id="description"
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor='sku'>SKU</label>
            <input
              type="text"
              id='sku'
              className="form-control"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand_id">Thương Hiệu</label>
            <select
              id="brand_id"
              className="form-control custom-select"
              onChange={(e) => setBrandId(e.target.value)}
              value={brandId}
            >
              <option disabled value=''>Select one</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category_id">Danh Mục</label>
            <select
              id="category_id"
              className="form-control custom-select"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
            >
              <option disabled value=''>Select one</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='image'>Hình Ảnh</label>
            <input
              type="file"
              id='image'
              className="form-control"
              onChange={handleImageChange}
            />
            <img style={{ width: '100px', height: '100px', objectFit: 'contain' }} src={`${baseUrl}${image}`} alt="" />
          </div>
          <div className="form-group">
            <label htmlFor='gallery'>Gallery</label>
            <input
              type="file"
              id='gallery'
              className="form-control"
              multiple
              onChange={handleGalleryChange}
            />
            {gallary.map((gala)=>(
              <img style={{ width: '100px', height: '100px', objectFit: 'contain' }} src={`${baseUrl}${gala}`} alt="" />
            ))}
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-primary float-right mt-5">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default EditProduct;
