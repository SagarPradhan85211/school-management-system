import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Students() {

    const navigate = useNavigate();
    const { auth } = useAuth();
    const isAdmin = auth?.role === "ADMIN";

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const studentsPerPage = 10;

    useEffect(() => {

        loadStudents();

    }, [search]);
    const loadStudents = async () => {

        try {

            const url = search.trim()
                ? `/students/search?keyword=${search}`
                : "/students";

            const response = await api.get(url);

            setStudents(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/students/${id}`);

            alert("Student Deleted Successfully");

            loadStudents();

        } catch (error) {

            console.log(error);

            alert("Unable to delete student");

        }

    };

    const filteredStudents = students.filter((student) => {

        const keyword = search.toLowerCase();

        return (

            `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(keyword)

            ||

            student.rollNumber
                .toLowerCase()
                .includes(keyword)

            ||

            student.email
                .toLowerCase()
                .includes(keyword)

            ||

            student.phone
                .toLowerCase()
                .includes(keyword)

            ||

            `${student.className}-${student.section}`
                .toLowerCase()
                .includes(keyword)

            ||

            student.status
                .toLowerCase()
                .includes(keyword)

        );

    });

    const indexOfLastStudent = currentPage * studentsPerPage;

    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

    const currentStudents = filteredStudents.slice(
        indexOfFirstStudent,
        indexOfLastStudent
    );

    const totalPages = Math.ceil(
        filteredStudents.length / studentsPerPage
    );

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>Students</h2>

                {isAdmin &&
                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/students/add")}
                    >
                        + Add Student
                    </button>
                }

            </div>

            <input
                className="form-control mb-3"
                placeholder="Search by Name, Roll No, Email or Phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Roll No</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Class</th>

                        <th>Status</th>

                        {isAdmin && <th width="170">Action</th>}

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredStudents.length > 0 ? (

                            currentStudents.map((student) => (

                                <tr key={student.id}>

                                    <td>{student.id}</td>

                                    <td>{student.firstName} {student.lastName}</td>

                                    <td>{student.rollNumber}</td>

                                    <td>{student.email}</td>

                                    <td>{student.phone}</td>

                                    <td>{student.className}-{student.section}</td>

                                    <td>{student.status}</td>

                                    {isAdmin &&
                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => navigate(`/students/edit/${student.id}`)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteStudent(student.id)}
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

                                    No Student Found

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>
            <div className="d-flex justify-content-center mt-3">

                <button
                    className="btn btn-outline-primary me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                {

                    [...Array(totalPages)].map((_, index) => (

                        <button
                            key={index}
                            className={`btn me-2 ${currentPage === index + 1
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                                }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>

                    ))

                }

                <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>

            </div>

        </Layout>

    );

}

export default Students;