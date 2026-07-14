import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const STATUS_OPTIONS = ["PRESENT", "ABSENT", "LEAVE"];

function statusBadge(status) {

    const map = {
        PRESENT: "success",
        ABSENT: "danger",
        LEAVE: "warning"
    };

    return (
        <span className={`badge bg-${map[status] || "secondary"}`}>
            {status}
        </span>
    );

}

function Attendance() {

    const { auth } = useAuth();
    const isTeacher = auth?.role === "TEACHER";
    const isAdmin = auth?.role === "ADMIN";

    const [activeTab, setActiveTab] = useState(isTeacher ? "mark" : "records");

    // --- mark attendance state ---
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [attendanceDate, setAttendanceDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [classStudents, setClassStudents] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [saving, setSaving] = useState(false);

    // --- records state ---
    const [records, setRecords] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [loadingRecords, setLoadingRecords] = useState(false);

    useEffect(() => {

        loadSubjects();

    }, []);

    const loadSubjects = async () => {

        try {

            const response = await api.get("/subjects");

            setSubjects(response.data);

        }

        catch (err) {
            console.log(err);
        }

    };

    const loadRecords = async (dateFilter) => {

        if (!dateFilter) {
            setRecords([]);
            return;
        }

        setLoadingRecords(true);

        try {

            const response = await api.get(`/attendance?date=${dateFilter}`);

            setRecords(response.data);

        }

        catch (err) {
            console.log(err);
        }

        finally {
            setLoadingRecords(false);
        }

    };

    const handleSubjectChange = async (e) => {

        const subjectId = e.target.value;

        setSelectedSubjectId(subjectId);
        setClassStudents([]);
        setStatuses({});

        if (!subjectId) return;

        const subject = subjects.find((s) => String(s.id) === subjectId);

        if (!subject) return;

        try {

            const response = await api.get("/students");

            const studentsInClass = response.data.filter(
                (st) => st.classId === subject.classId
            );

            setClassStudents(studentsInClass);

            const initialStatuses = {};

            studentsInClass.forEach((st) => {
                initialStatuses[st.id] = "PRESENT";
            });

            setStatuses(initialStatuses);

        }

        catch (err) {
            console.log(err);
        }

    };

    const setStudentStatus = (studentId, status) => {

        setStatuses({ ...statuses, [studentId]: status });

    };

    const submitAttendance = async () => {

        if (!selectedSubjectId) {
            alert("Please select a subject first.");
            return;
        }

        if (classStudents.length === 0) {
            alert("No students found for the selected subject's class.");
            return;
        }

        setSaving(true);

        try {

            const payload = {

                subjectId: Number(selectedSubjectId),
                attendanceDate,
                students: classStudents.map((st) => ({
                    studentId: st.id,
                    status: statuses[st.id] || "PRESENT"
                }))

            };

            await api.post("/attendance", payload);

            alert("Attendance Marked Successfully");

            loadRecords(filterDate);

        }

        catch (err) {

            console.log(err);

            alert(
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "Unable to mark attendance"
            );

        }

        finally {
            setSaving(false);
        }

    };

    const updateRecordStatus = async (id, status) => {

        try {

            await api.put(`/attendance/${id}?status=${status}`);

            loadRecords(filterDate);

        }

        catch (err) {

            console.log(err);
            alert("Unable to update attendance");

        }

    };

    const deleteRecord = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this attendance record?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/attendance/${id}`);

            loadRecords(filterDate);

        }

        catch (err) {

            console.log(err);
            alert("Unable to delete record");

        }

    };

    return (

        <Layout>

            <h2>Attendance</h2>

            <hr />

            <ul className="nav nav-tabs mb-3">

                {isTeacher &&
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "mark" ? "active" : ""}`}
                            onClick={() => setActiveTab("mark")}
                        >
                            Mark Attendance
                        </button>
                    </li>
                }

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "records" ? "active" : ""}`}
                        onClick={() => setActiveTab("records")}
                    >
                        Records
                    </button>
                </li>

            </ul>

            {activeTab === "mark" && isTeacher &&

                <div>

                    <div className="row mb-3">

                        <div className="col-md-6">

                            <label>Subject</label>

                            <select
                                className="form-select"
                                value={selectedSubjectId}
                                onChange={handleSubjectChange}
                            >

                                <option value="">Select Subject</option>

                                {subjects.map((s) => (

                                    <option key={s.id} value={s.id}>
                                        {s.subjectName} ({s.className}-{s.section})
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div className="col-md-6">

                            <label>Date</label>

                            <input
                                type="date"
                                className="form-control"
                                value={attendanceDate}
                                onChange={(e) => setAttendanceDate(e.target.value)}
                            />

                        </div>

                    </div>

                    {classStudents.length > 0 &&

                        <>

                            <table className="table table-bordered">

                                <thead className="table-dark">

                                    <tr>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {classStudents.map((st) => (

                                        <tr key={st.id}>

                                            <td>{st.rollNumber}</td>
                                            <td>{st.firstName} {st.lastName}</td>

                                            <td>

                                                {STATUS_OPTIONS.map((opt) => (

                                                    <div className="form-check form-check-inline" key={opt}>

                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            name={`status-${st.id}`}
                                                            checked={statuses[st.id] === opt}
                                                            onChange={() => setStudentStatus(st.id, opt)}
                                                        />

                                                        <label className="form-check-label">
                                                            {opt}
                                                        </label>

                                                    </div>

                                                ))}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                            <button
                                className="btn btn-primary"
                                disabled={saving}
                                onClick={submitAttendance}
                            >
                                {saving ? "Saving..." : "Submit Attendance"}
                            </button>

                        </>

                    }

                    {selectedSubjectId && classStudents.length === 0 &&
                        <p className="text-muted">
                            No students found for this subject's class.
                        </p>
                    }

                </div>

            }

            {activeTab === "records" &&

                <div>

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <label>Filter by Date</label>

                            <input
                                type="date"
                                className="form-control"
                                value={filterDate}
                                onChange={(e) => {
                                    setFilterDate(e.target.value);
                                    loadRecords(e.target.value);
                                }}
                            />

                        </div>

                        <div className="col-md-2 d-flex align-items-end">

                            <button
                                className="btn btn-outline-secondary"
                            onClick={() => {
                                    setFilterDate("");
                                    setRecords([]);
                                }}
                                disabled={!filterDate}
                            >
                                Clear
                            </button>

                        </div>

                    </div>

                    {!filterDate ? (

                        <p className="text-muted">Select a date to view attendance records.</p>

                    ) : loadingRecords ? (

                        <p className="text-muted">Loading...</p>

                    ) : (

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>
                                    <th>ID</th>
                                    <th>Student</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    {(isTeacher || isAdmin) && <th width="200">Action</th>}
                                </tr>

                            </thead>

                            <tbody>

                                {records.length > 0 ? (

                                    records.map((r) => (

                                        <tr key={r.id}>

                                            <td>{r.id}</td>
                                            <td>{r.studentName}</td>
                                            <td>{r.subjectName}</td>
                                            <td>{r.attendanceDate}</td>
                                            <td>{statusBadge(r.status)}</td>

                                            {(isTeacher || isAdmin) &&
                                                <td>

                                                    {isTeacher &&
                                                        <select
                                                            className="form-select form-select-sm d-inline-block me-2"
                                                            style={{ width: "120px" }}
                                                            value={r.status}
                                                            onChange={(e) => updateRecordStatus(r.id, e.target.value)}
                                                        >
                                                            {STATUS_OPTIONS.map((opt) => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </select>
                                                    }

                                                    {isAdmin &&
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteRecord(r.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    }

                                                </td>
                                            }

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan={(isTeacher || isAdmin) ? 6 : 5} className="text-center text-danger">
                                            No Attendance Records Found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    )}

                </div>

            }

        </Layout>

    );

}

export default Attendance;
