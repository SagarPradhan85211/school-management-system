import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import api from "../../services/api";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 10;

const emptyForm = {

    className: "",
    section: "",
    academicYear: "",
    capacity: "",
    status: ""

};

function Classes() {

    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        loadClasses();

    }, []);

    const loadClasses = async () => {

        try {

            const response = await api.get("/classes");

            setClasses(response.data);
            setPage(1);

        }

        catch (err) {
            console.log(err);
        }

    };

    const openAddModal = () => {

        setEditId(null);
        setForm(emptyForm);
        setErrors({});
        setShowModal(true);

    };

    const openEditModal = (schoolClass) => {

        setEditId(schoolClass.id);

        setForm({

            className: schoolClass.className,
            section: schoolClass.section,
            academicYear: schoolClass.academicYear,
            capacity: schoolClass.capacity,
            status: schoolClass.status

        });

        setErrors({});
        setShowModal(true);

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

        setErrors({ ...errors, [name]: "" });

    };

    const saveClass = async () => {

        try {

            const payload = {

                ...form,
                className: form.className === "" ? null : Number(form.className),
                capacity: form.capacity === "" ? null : Number(form.capacity)

            };

            if (editId) {

                await api.put(`/classes/${editId}`, payload);

                alert("Class Updated Successfully");

            }

            else {

                await api.post("/classes", payload);

                alert("Class Added Successfully");

            }

            setShowModal(false);

            loadClasses();

        }

        catch (err) {

            if (err.response && err.response.status === 400) {
                setErrors(err.response.data);
            }
            else if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            }
            else {
                alert("Something went wrong");
            }

        }

    };

    const deleteClass = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this class?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/classes/${id}`);

            alert("Class Deleted Successfully");

            loadClasses();

        }

        catch (err) {

            console.log(err);

            alert(
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "Unable to delete class"
            );

        }

    };

    const filteredClasses = classes.filter((c) => {

        const keyword = search.toLowerCase();

        return (

            `${c.className}-${c.section}`.toLowerCase().includes(keyword) ||
            (c.academicYear || "").toLowerCase().includes(keyword) ||
            (c.status || "").toLowerCase().includes(keyword)

        );

    });

    const pageCount = Math.max(1, Math.ceil(filteredClasses.length / PAGE_SIZE));
    const visibleClasses = filteredClasses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>Classes</h2>

                <button className="btn btn-success" onClick={openAddModal}>
                    + Add Class
                </button>

            </div>

            <input
                className="form-control mb-3"
                placeholder="Search by Class, Academic Year or Status"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Class</th>
                        <th>Academic Year</th>
                        <th>Capacity</th>
                        <th>Status</th>
                        <th width="170">Action</th>
                    </tr>

                </thead>

                <tbody>

                    {visibleClasses.length > 0 ? (

                        visibleClasses.map((c) => (

                            <tr key={c.id}>

                                <td>{c.id}</td>
                                <td>{c.className}-{c.section}</td>
                                <td>{c.academicYear}</td>
                                <td>{c.capacity}</td>
                                <td>{c.status}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => openEditModal(c)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteClass(c.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="6" className="text-center text-danger">
                                No Class Found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />

            <Modal
                show={showModal}
                title={editId ? "Edit Class" : "Add Class"}
                onClose={() => setShowModal(false)}
            >

                <div className="mb-3">

                    <label>Class Number</label>

                    <input
                        type="number"
                        min="1"
                        className={`form-control ${errors.className ? "is-invalid" : ""}`}
                        name="className"
                        value={form.className}
                        onChange={handleChange}
                    />

                    {errors.className &&
                        <div className="invalid-feedback">{errors.className}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Section</label>

                    <input
                        type="text"
                        className={`form-control ${errors.section ? "is-invalid" : ""}`}
                        name="section"
                        value={form.section}
                        onChange={handleChange}
                    />

                    {errors.section &&
                        <div className="invalid-feedback">{errors.section}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Academic Year</label>

                    <input
                        type="text"
                        placeholder="e.g. 2025-2026"
                        className={`form-control ${errors.academicYear ? "is-invalid" : ""}`}
                        name="academicYear"
                        value={form.academicYear}
                        onChange={handleChange}
                    />

                    {errors.academicYear &&
                        <div className="invalid-feedback">{errors.academicYear}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Capacity</label>

                    <input
                        type="number"
                        min="1"
                        className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
                        name="capacity"
                        value={form.capacity}
                        onChange={handleChange}
                    />

                    {errors.capacity &&
                        <div className="invalid-feedback">{errors.capacity}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Status</label>

                    <select
                        className={`form-select ${errors.status ? "is-invalid" : ""}`}
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >

                        <option value="">Select Status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>

                    </select>

                    {errors.status &&
                        <div className="invalid-feedback">{errors.status}</div>
                    }

                </div>

                <button className="btn btn-success me-2" onClick={saveClass}>
                    {editId ? "Update" : "Save"}
                </button>

                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </button>

            </Modal>

        </Layout>

    );

}

export default Classes;
