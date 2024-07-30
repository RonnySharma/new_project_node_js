import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Category() {
  const [categoryId, setCategoryId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [formError, setFormError] = useState({ name: "" });
  const [categories, setCategories] = useState([]);

  const onTextChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onCategorySubmit = () => {
    let errors = false;
    let error = { name: "" };

    if (form.name.trim().length === 0) {
      errors = true;
      error.name = "Please enter a name!";
    }

    setFormError(error);

    if (!errors) {
      categoryId ? updateCategory() : saveCategory();
    }
  };

  const deleteCategory = (id) => {
    let ans = window.confirm("Want to delete this category?");
    if (!ans) return;

    axios
      .delete(`http://localhost:8001/Category/${id}`)
      .then(() => {
        getCategory();
      })
      .catch((error) => {
        console.error("Failed to delete category.", error);
        alert(error.response?.data?.message || "Failed to delete category.");
      });
  };

  const getCategory = () => {
    axios.get("http://localhost:8001/Category")
      .then((response) => {
        setCategories(response.data.univData);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const saveCategory = () => {
    axios.post("http://localhost:8001/Category", { name: form.name })
      .then(() => {
        alert("Category saved successfully!");
        setForm({ name: "" });
        getCategory();
      })
      .catch((error) => {
        console.error("Failed to save category.", error);
      });
  };

  const updateCategory = () => {
    axios.put(`http://localhost:8001/Category/${categoryId}`, { name: form.name })
      .then(() => {
        alert("Category updated successfully!");
        setForm({ name: "" });
        setCategoryId(null);  // Reset the categoryId after update
        getCategory();
      })
      .catch((error) => {
        console.error("Failed to update category.", error);
      });
  };

  return (
    <div>
      <div className="row p-2 m-2">
        <div className="card text-center mx-auto">
          <div className="card-header">
            {categoryId ? "Update Category" : "New Category"}
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Category Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={onTextChange}
                  value={form.name}
                />
              </div>
              <p className="text-danger">{formError.name}</p>
            </div>
          </div>
          <div className="card-footer text-muted">
            <button
              onClick={onCategorySubmit}
              className="btn btn-success"
            >
              {categoryId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="border m-4 p-4">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCategoryId(category._id);
                      setForm({ name: category.name });
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
