import React,{useState,useEffect} from 'react'

import axios from'axios'
function CoverType() {
  const [covertypeId, setCovertypeId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [formError, setFormError] = useState({ name: "" });
  const [CoverTypes, setCovertypes] = useState([]);


  const onTextChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onCovertyeSubmit = () => {
    let errors = false;
    let error = { name: "" };

    if (form.name.trim().length === 0) {
      errors = true;
      error.name = "Please enter a name!";
    }

    setFormError(error);

    if (!errors) {
      covertypeId ? updateCovertype() : saveCovertype();
    }
  };
  function updateCovertype()
  {
     debugger
    axios.put(`http://localhost:8001/covertype/${covertypeId}`, { name: form.name })
    .then(() => {
      alert("Category updated successfully!");
      setForm({ name: "" });
      setCovertypeId(null);  // Reset the categoryId after update
      getCovertype();
    })
    .catch((error) => {
      console.error("Failed to update category.", error);
    });
  }
  useEffect(() => {
    getCovertype();
  }, []);
  function getCovertype()
  {
    axios.get("http://localhost:8001/Covertype")
    .then((response) => {
      setCovertypes(response.data.univData);
    })
    .catch((error) => {
      console.error("There was an error fetching the covertype!", error);
    });
  }
  function saveCovertype()
  {
  
    debugger
    axios.post("http://localhost:8001/Covertype", { name: form.name })
    .then(() => {
      alert("covertype saved successfully!");
      setForm({ name: "" });
      getCovertype();
    })
    .catch((error) => {
      console.error("Failed to save covertype.", error);
    });
  }
  function deleteCovertype(id){
    let ans = window.confirm("Want to delete this Covertype?");
    if (!ans) return;

    axios
      .delete(`http://localhost:8001/Covertype/${id}`)
      .then(() => {
        getCovertype();
      })
      .catch((error) => {
        console.error("Failed to delete Covertype.", error);
        alert(error.response?.data?.message || "Failed to delete Covertype.");
      });

  }
  return (
    <div>
      <div className="row p-2 m-2">
        <div className="card text-center mx-auto">
          <div className="card-header">
            {covertypeId ? "Update Category" : "New CoverType"}
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4">CoverType Name</label>
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
              onClick={onCovertyeSubmit}
              className="btn btn-success"
            >
              {covertypeId ? "Update" : "Save"}
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
            {CoverTypes.map((covertype) => (
              <tr key={covertype._id}>
                <td>{covertype.name}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteCovertype(covertype._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCovertypeId(covertype._id);
                      setForm({ name: covertype.name });
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
  )
}

export default CoverType