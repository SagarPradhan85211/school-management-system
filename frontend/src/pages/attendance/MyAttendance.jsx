import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import api from "../../services/api";

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

function MyAttendance() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadMyAttendance();

    }, []);

    const loadMyAttendance = async () => {

        try {

            const profile = await api.get("/students/me");

            const response = await api.get(`/attendance/student/${profile.data.id}`);

            setRecords(response.data);

        }

        catch (err) {

            console.log(err);
            setError("Unable to load your attendance records.");

        }

        finally {
            setLoading(false);
        }

    };

    const presentCount = records.filter((r) => r.status === "PRESENT").length;
    const absentCount = records.filter((r) => r.status === "ABSENT").length;
    const leaveCount = records.filter((r) => r.status === "LEAVE").length;

    return (

        <Layout>

            <h2>My Attendance</h2>

            <hr />

            {loading && <p className="text-muted">Loading...</p>}

            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error &&

                <>

                    <div className="row mb-3">

                        <div className="col-md-3 col-sm-6 mb-3">
                            <div className="card shadow-sm text-center">
                                <div className="card-body">
                                    <h6 className="text-muted">Present</h6>
                                    <h3 className="text-success">{presentCount}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-3">
                            <div className="card shadow-sm text-center">
                                <div className="card-body">
                                    <h6 className="text-muted">Absent</h6>
                                    <h3 className="text-danger">{absentCount}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-3">
                            <div className="card shadow-sm text-center">
                                <div className="card-body">
                                    <h6 className="text-muted">Leave</h6>
                                    <h3 className="text-warning">{leaveCount}</h3>
                                </div>
                            </div>
                        </div>

                    </div>

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>
                                <th>Subject</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            {records.length > 0 ? (

                                records.map((r) => (

                                    <tr key={r.id}>
                                        <td>{r.subjectName}</td>
                                        <td>{r.attendanceDate}</td>
                                        <td>{statusBadge(r.status)}</td>
                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="3" className="text-center text-danger">
                                        No Attendance Records Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </>

            }

        </Layout>

    );

}

export default MyAttendance;
