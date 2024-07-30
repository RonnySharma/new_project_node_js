import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coverTypes, setCoverTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCoverType, setSelectedCoverType] = useState("");
  const [form, setForm] = useState({
    name: "",
    images: null,
    coverTypeId: "",
    categoryId: "",
    description: "",
    qty: 10,
    price: ""
  });
  const [formError, setFormError] = useState({
    name: "",
    images: "",
    description: "",
    qty: "",
    price: ""
  });

  useEffect(() => {
    getCategories();
    getCoverTypes();
    getProducts();
  }, [selectedCategory, selectedCoverType]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8001/product", {
        params: {
          categoryId: selectedCategory || "",
          coverTypeId: selectedCoverType || "",
        },
      });
      setProducts(response.data.productData);
    } catch (error) {
      console.error("There was an error fetching the products!", error.response ? error.response.data : error.message);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8001/Category");
      setCategories(response.data.univData);
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  const getCoverTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8001/Covertype");
      setCoverTypes(response.data.univData);
    } catch (error) {
      console.error("There was an error fetching the cover types!", error);
    }
  };

  const onTextChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setForm({ ...form, categoryId: event.target.value });
  };

  const onCoverTypeChange = (event) => {
    setSelectedCoverType(event.target.value);
    setForm({ ...form, coverTypeId: event.target.value });
  };

  const onProductSubmit = () => {
    let errors = false;
    let error = {
      name: "",
      images: "",
      description: "",
      qty: "",
      price: ""
    };
  
    // Validate form fields
    if (form.name.trim().length === 0) {
      errors = true;
      error.name = "Please enter a name!";
    }
    if (!form.images || form.images.length === 0) {
      errors = true;
      error.images = "Please upload at least one image!";
    }
    if (form.description.trim().length === 0) {
      errors = true;
      error.description = "Please enter a description!";
    }
    if (form.qty <= 0) {
      errors = true;
      error.qty = "Please enter a valid quantity!";
    }
    if (form.price.trim().length === 0) {
      errors = true;
      error.price = "Please enter a price!";
    }
  
    if (errors) {
      setFormError(error);
    } else {
      setFormError({
        name: "",
        images: "",
        description: "",
        qty: "",
        price: "",
      });
      if (productId) {
        updateProduct();
      } else {
        saveProduct();
      }
    }
  };
  
  const saveProduct = async () => {
    try {
      const formData = new FormData();
      if (form.images) {
        for (let i = 0; i < form.images.length; i++) {
          formData.append("images", form.images[i]);
        }
      }
      formData.append("name", form.name);
      formData.append("coverTypeId", form.coverTypeId);
      formData.append("categoryId", form.categoryId);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);

      await axios.post("http://localhost:8001/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product saved successfully");
      resetForm();
      getProducts();
    } catch (error) {
      console.error("Failed to submit data.", error);
    }
  };

  const updateProduct = async () => {
    try {
      debugger
      const formData = new FormData();
      formData.append("id", productId);
      if (form.images) {
        for (let i = 0; i < form.images.length; i++) {
          formData.append("images", form.images[i]);
        }
      }
      formData.append("name", form.name);
      formData.append("coverTypeId", form.coverTypeId);
      formData.append("categoryId", form.categoryId);
      formData.append("description", form.description);
      formData.append("qty", form.qty);
      formData.append("price", form.price);

      await axios.put(`http://localhost:8001/product/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully");
      resetForm();
      getProducts();
    } catch (error) {
      console.error("Failed to submit data.", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/product/${id}`);
      alert("Product deleted successfully");
      getProducts();
    } catch (error) {
      console.error("Failed to delete product.", error);
    }
  };
  const editProduct = (product) => {
    setProductId(product._id);
    setForm({
      name: product.name,
      images: [], // Keep images as an empty array or use logic to handle existing images
      coverTypeId: product.coverTypeId._id,
      categoryId: product.categoryId._id,
      description: product.description,
      qty: product.qty,
      price: product.price
    });
    setSelectedCategory(product.categoryId._id);
    setSelectedCoverType(product.coverTypeId._id);
  };
  
  const resetForm = () => {
    setForm({
      name: "",
      images: null,
      coverTypeId: "",
      categoryId: "",
      description: "",
      qty: 10,
      price: ""
    });
    setSelectedCategory("");
    setSelectedCoverType("");
    setProductId(null);
  };

  const renderProducts = () => {
    return products.map((product) => (
      <tr key={product._id}>
        <td>
        <img class="card-img-top" src={"http://localhost:8001/" + product.images}
              height="150"
              width="150" />
        </td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.qty}</td>
        <td>
          <button
            onClick={() => deleteProduct(product._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
        <td>
          <button
            onClick={() => editProduct(product)}
            className="btn btn-primary"
          >
            Edit
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="row m-2 p-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {productId ? "Edit Product" : "New Product"}
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Category Name</label>
              <div className="col-lg-8">
                <select 
                  value={selectedCategory} 
                  onChange={onCategoryChange}
                  className="form-control"
                >
                  <option value="">Select your option</option>
                  {categories.map(data => (
                    <option key={data._id} value={data._id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Cover Type</label>
              <div className="col-lg-8">
                <select 
                  value={selectedCoverType} 
                  onChange={onCoverTypeChange}
                  className="form-control"
                >
                  <option value="">Select your option</option>
                  {coverTypes.map(data => (
                    <option key={data._id} value={data._id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="txtname" className="col-lg-4">
                Product Name
              </label>
              <div className="col-lg-8">
                <input
                  id="txtname"
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  className="form-control"
                  onChange={onTextChange}
                  value={form.name}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="Description" className="col-lg-4">
                Description
              </label>
              <div className="col-lg-8">
                <input
                  id="txtDescription"
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control"
                  onChange={onTextChange}
                  value={form.description}
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="txtqty" className="col-lg-4">
                Qty.
              </label>
              <div className="col-lg-8">
                <input
                  id="txtqty"
                  type="number"
                  name="qty"
                  placeholder="Enter Qty."
                  className="form-control"
                  onChange={onTextChange}
                  value={form.qty}
                />
                <p className="text-danger">{formError.qty}</p>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="txtprice" className="col-lg-4">
                Price
              </label>
              <div className="col-lg-8">
                <input
                  id="txtprice"
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={onTextChange}
                  value={form.price}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Image</label>
              <div className="col-lg-8">
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={(e) => {
                    setForm({ ...form, images: e.target.files });
                  }}
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button
              onClick={onProductSubmit}
              className={productId ? "btn btn-info" : "btn btn-success"}
            >
              {productId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="border m-4 p-4">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
