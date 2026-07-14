import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 10;

const emptyForm = {

    subjectName: "",
    subjectCode: "",
    credits: "",
    status: "",
    teacherId: "",
    classId: ""

};

function Subjects() {

    const { auth } = useAuth();
    const isAdmin = auth?.role === "ADMIN";

    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        loadSubjects();

        if (isAdmin) {
            loadClasses();
            loadTeachers();
        }

    }, []);

    const loadSubjects = async () => {

        try {

            const response = await api.get("/subjects");

            setSubjects(response.data);
            setPage(1);

        }

        catch (err) {
            console.log(err);
        }

    };

    const loadTeachers = async () => {

        try {

            const response = await api.get("/teachers");

            setTeachers(response.data);

        }

        catch (err) {
            console.log(err);
        }

    };

    const loadClasses = async () => {

        try {

            const response = await api.get("/classes");

            setClasses(response.data);

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

    const openEditModal = (subject) => {

        setEditId(subject.id);

        setForm({

            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            credits: subject.credits,
            status: subject.status,
            teacherId: subject.teacherId,
            classId: subject.classId

        });

        setErrors({});
        setShowModal(true);

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

        setErrors({ ...errors, [name]: "" });

    };

    const saveSubject = async () => {

        try {

            const payload = {

                ...form,
                credits: form.credits === "" ? null : Number(form.credits),
                teacherId: form.teacherId === "" ? null : Number(form.teacherId),
                classId: form.classId === "" ? null : Number(form.classId)

            };

            if (editId) {

                await api.put(`/subjects/${editId}`, payload);

                alert("Subject Updated Successfully");

            }

            else {

                await api.post("/subjects", payload);

                alert("Subject Added Successfully");

            }

            setShowModal(false);

            loadSubjects();

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

    const deleteSubject = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this subject?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/subjects/${id}`);

            alert("Subject Deleted Successfully");

            loadSubjects();

        }

        catch (err) {

            console.log(err);

            alert(
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "Unable to delete subject"
            );

        }

    };

    const filteredSubjects = subjects.filter((s) => {

        const keyword = search.toLowerCase();

        return (

            (s.subjectName || "").toLowerCase().includes(keyword) ||
            (s.subjectCode || "").toLowerCase().includes(keyword) ||
            (s.teacherName || "").toLowerCase().includes(keyword) ||
            `${s.className}-${s.section}`.toLowerCase().includes(keyword) ||
            (s.status || "").toLowerCase().includes(keyword)

        );

    });

    const pageCount = Math.max(1, Math.ceil(filteredSubjects.length / PAGE_SIZE));
    const visibleSubjects = filteredSubjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>Subjects</h2>

                {isAdmin &&
                    <button className="btn btn-success" onClick={openAddModal}>
                        + Add Subject
                    </button>
                }

            </div>

            <input
                className="form-control mb-3"
                placeholder="Search by Subject, Code, Teacher, Class or Status"
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
                        <th>Subject</th>
                        <th>Code</th>
                        <th>Credits</th>
                        <th>Teacher</th>
                        <th>Class</th>
                        <th>Status</th>
                        {isAdmin && <th width="170">Action</th>}
                    </tr>

                </thead>

                <tbody>

                    {visibleSubjects.length > 0 ? (

                        visibleSubjects.map((s) => (

                            <tr key={s.id}>

                                <td>{s.id}</td>
                                <td>{s.subjectName}</td>
                                <td>{s.subjectCode}</td>
                                <td>{s.credits}</td>
                                <td>{s.teacherName}</td>
                                <td>{s.className}-{s.section}</td>
                                <td>{s.status}</td>

                                {isAdmin &&
                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => openEditModal(s)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteSubject(s.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                }

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan={isAdmin ? 8 : 7} className="text-center text-danger">
                                No Subject Found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />

            <Modal
                show={showModal}
                title={editId ? "Edit Subject" : "Add Subject"}
                onClose={() => setShowModal(false)}
            >

                <div className="mb-3">

                    <label>Subject Name</label>

                    <input
                        type="text"
                        className={`form-control ${errors.subjectName ? "is-invalid" : ""}`}
                        name="subjectName"
                        value={form.subjectName}
                        onChange={handleChange}
                    />

                    {errors.subjectName &&
                        <div className="invalid-feedback">{errors.subjectName}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Subject Code</label>

                    <input
                        type="text"
                        className={`form-control ${errors.subjectCode ? "is-invalid" : ""}`}
                        name="subjectCode"
                        value={form.subjectCode}
                        onChange={handleChange}
                    />

                    {errors.subjectCode &&
                        <div className="invalid-feedback">{errors.subjectCode}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Credits</label>

                    <input
                        type="number"
                        min="1"
                        className={`form-control ${errors.credits ? "is-invalid" : ""}`}
                        name="credits"
                        value={form.credits}
                        onChange={handleChange}
                    />

                    {errors.credits &&
                        <div className="invalid-feedback">{errors.credits}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Teacher</label>

                    <select
                        className={`form-select ${errors.teacherId ? "is-invalid" : ""}`}
                        name="teacherId"
                        value={form.teacherId}
                        onChange={handleChange}
                    >

                        <option value="">Select Teacher</option>

                        {teachers.map((t) => (

                            <option key={t.id} value={t.id}>
                                {t.firstName} {t.lastName}
                            </option>

                        ))}

                    </select>

                    {errors.teacherId &&
                        <div className="invalid-feedback">{errors.teacherId}</div>
                    }

                </div>

                <div className="mb-3">

                    <label>Class</label>

                    <select
                        className={`form-select ${errors.classId ? "is-invalid" : ""}`}
                        name="classId"
                        value={form.classId}
                        onChange={handleChange}
                    >

                        <option value="">Select Class</option>

                        {classes.map((c) => (

                            <option key={c.id} value={c.id}>
                                {c.className}-{c.section}
                            </option>

                        ))}

                    </select>

                    {errors.classId &&
                        <div className="invalid-feedback">{errors.classId}</div>
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

                <button className="btn btn-success me-2" onClick={saveSubject}>
                    {editId ? "Update" : "Save"}
                </button>

                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </button>

            </Modal>

        </Layout>

    );

}

export default Subjects;
