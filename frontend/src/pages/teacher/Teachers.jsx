import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 10;

function Teachers() {

    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {

        loadTeachers();

    }, []);

    const loadTeachers = async () => {

        try {

            const response = await api.get("/teachers");

            setTeachers(response.data);
            setPage(1);

        }

        catch (err) {
            console.log(err);
        }

    };

    const deleteTeacher = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this teacher?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/teachers/${id}`);

            alert("Teacher Deleted Successfully");

            loadTeachers();

        }

        catch (err) {

            console.log(err);

            alert(
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "Unable to delete teacher"
            );

        }

    };

    const filteredTeachers = teachers.filter((teacher) => {

        const keyword = search.toLowerCase();

        return (

            `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(keyword) ||
            (teacher.email || "").toLowerCase().includes(keyword) ||
            (teacher.phone || "").toLowerCase().includes(keyword) ||
            (teacher.qualification || "").toLowerCase().includes(keyword) ||
            (teacher.status || "").toLowerCase().includes(keyword)

        );

    });

    const pageCount = Math.max(1, Math.ceil(filteredTeachers.length / PAGE_SIZE));
    const visibleTeachers = filteredTeachers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>Teachers</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/teachers/add")}
                >
                    + Add Teacher
                </button>

            </div>

            <input
                className="form-control mb-3"
                placeholder="Search by Name, Email, Phone, Qualification or Status"
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Qualification</th>
                        <th>Experience</th>
                        <th>Class</th>
                        <th>Status</th>
                        <th width="170">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {visibleTeachers.length > 0 ? (

                        visibleTeachers.map((teacher) => (

                            <tr key={teacher.id}>

                                <td>{teacher.id}</td>
                                <td>{teacher.firstName} {teacher.lastName}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phone}</td>
                                <td>{teacher.qualification}</td>
                                <td>{teacher.experience} yrs</td>
                                <td>{teacher.className}-{teacher.section}</td>
                                <td>{teacher.status}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => navigate(`/teachers/edit/${teacher.id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteTeacher(teacher.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="9" className="text-center text-danger">
                                No Teacher Found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />

        </Layout>

    );

}

export default Teachers;
