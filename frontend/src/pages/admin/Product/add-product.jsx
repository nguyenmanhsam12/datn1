import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import { useBrands } from '../../../context/BrandContext';
import { useCategories } from '../../../context/CategoryContext';
import { useSizes } from '../../../context/SizeContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { brands } = useBrands();
  const { categories } = useCategories();
  const { sizes } = useSizes();
  const [Variants, setVariants] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState(''); // State cho tên sản phẩm
  const [sku, setSku] = useState('');
  const [image, setImage] = useState({});
  const [gallary, setGallary] = useState([]); // State cho gallery


  const [description, setDescription] = useState(''); // State cho mô tả sản phẩm

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...Variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  // Sửa xử lý hình ảnh
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]); // Lưu đối tượng File đầu tiên thay vì toàn bộ FileList
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallary(files); // Lưu URL cho preview
  };

  const handleAddVariant = () => {
    setVariants([...Variants, { size_id: '', stock: 0, price : '' }]);
  };

  const removeVariant = (index) => {
    setVariants(Variants.filter((_, i) => i !== index));
  };

  // Hàm gửi dữ liệu
  const handleSubmit = async () => {
    const formData = {
      name: name,
      description: description,
      brand_id: brandId,
      category_id: categoryId,
      sku: sku,
      image: image, // Thêm image vào formData
      gallary: gallary, // Chuyển đổi FileList thành mảng
      variants: Variants.map((variant) => ({
        size_id: variant.size_id,
        stock: variant.stock,
        price: variant.price,
      })),
    };
    console.log(formData);
    addProduct(formData);
    navigate('/admin/products')
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Product Add Form</h1>
      </section>
      <section className="content">

        
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="name">Tên Sản Phẩm</label>
            <input
              type="text"
              id="name"
              name='name'
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả sản phẩm</label>
            <textarea
              id="description"
              name='description'
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
              <option disabled selected value=''>Select one</option>
              {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
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
              <option disabled selected value=''>Select one</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
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
          </div>
          <div className="form-group">
            <label htmlFor='gallary'>Gallery</label>
            <input
              type="file"
              id='gallary'
              className="form-control"
              multiple
              onChange={handleGalleryChange}
            />
          </div>


          <button type="button" onClick={handleAddVariant} className="btn btn-outline-primary mb-3 col-md-12"><h5>Add Variant </h5></button>

          {/* Render các biến thể */}
          {Variants.map((variant, index) => (
            <div key={index} className="variant-form mb-3 col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h4 className='card-title'>Variant {index + 1}</h4>
                  <div className="card-tools">
                    <button type="button" className="btn btn-success " data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" onClick={() => removeVariant(index)} className="btn btn-danger ml-3" title="Delete Variant">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor={`variant_size_${index}`}>Kích cỡ</label>
                    <select
                      id={`variant_size_${index}`}
                      className="form-control"
                      value={variant.size_id}
                      onChange={(e) => handleVariantChange(index, 'size_id', e.target.value)}
                    >
                      <option disabled selected value=''>Select size</option>
                      {sizes.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.size}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div className="form-group">
                    <label htmlFor={`variant_stock_${index}`}>Số Lượng Tồn Kho</label>
                    <input
                      type="text"
                      id={`variant_stock_${index}`}
                      className="form-control"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor='price'>Giá </label>
                    <input
                      type="text"
                      id='price'
                      className="form-control"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index,'price',e.target.value)}
                    />
                  </div>


                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={handleSubmit} className="btn btn-primary float-right mt-5">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default AddProduct;
