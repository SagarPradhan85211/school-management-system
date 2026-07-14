import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function StatCard({ label, value, color }) {

    return (

        <div className="col-md-3 col-sm-6 mb-3">

            <div className="card shadow-sm h-100">

                <div className="card-body text-center">

                    <h6 className="text-muted">{label}</h6>

                    <h2 className={`text-${color}`}>
                        {value}
                    </h2>

                </div>

            </div>

        </div>

    );

}

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalStudents: "-",
        activeStudents: "-",
        totalTeachers: "-",
        totalClasses: "-"
    });

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const [students, active, teachers, classes] = await Promise.all([
                api.get("/students/count"),
                api.get("/students/active-count"),
                api.get("/teachers/count"),
                api.get("/classes/count")
            ]);

            setStats({
                totalStudents: students.data,
                activeStudents: active.data,
                totalTeachers: teachers.data,
                totalClasses: classes.data
            });

        }

        catch (err) {
            console.log(err);
        }

    };

    return (

        <div className="row mt-3">

            <StatCard label="Total Students" value={stats.totalStudents} color="primary" />
            <StatCard label="Active Students" value={stats.activeStudents} color="success" />
            <StatCard label="Total Teachers" value={stats.totalTeachers} color="warning" />
            <StatCard label="Total Classes" value={stats.totalClasses} color="info" />

        </div>

    );

}

function TeacherDashboard() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await api.get("/teachers/me");

            setProfile(response.data);

        }

        catch (err) {
            console.log(err);
        }

    };

    if (!profile) {
        return <p className="text-muted mt-3">Loading your profile...</p>;
    }

    return (

        <div className="card shadow-sm mt-3" style={{ maxWidth: "500px" }}>

            <div className="card-body">

                <h5 className="mb-3">
                    {profile.firstName} {profile.lastName}
                </h5>

                <p className="mb-1"><strong>Email:</strong> {profile.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {profile.phone}</p>
                <p className="mb-1"><strong>Qualification:</strong> {profile.qualification}</p>
                <p className="mb-1"><strong>Experience:</strong> {profile.experience} years</p>
                <p className="mb-1"><strong>Class Assigned:</strong> {profile.className}-{profile.section}</p>
                <p className="mb-0"><strong>Status:</strong> {profile.status}</p>

            </div>

        </div>

    );

}

function StudentDashboard() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await api.get("/students/me");

            setProfile(response.data);

        }

        catch (err) {
            console.log(err);
        }

    };

    if (!profile) {
        return <p className="text-muted mt-3">Loading your profile...</p>;
    }

    return (

        <div className="card shadow-sm mt-3" style={{ maxWidth: "500px" }}>

            <div className="card-body">

                <h5 className="mb-3">
                    {profile.firstName} {profile.lastName}
                </h5>

                <p className="mb-1"><strong>Roll Number:</strong> {profile.rollNumber}</p>
                <p className="mb-1"><strong>Email:</strong> {profile.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {profile.phone}</p>
                <p className="mb-1"><strong>Class:</strong> {profile.className}-{profile.section}</p>
                <p className="mb-0"><strong>Status:</strong> {profile.status}</p>

            </div>

        </div>

    );

}

function Dashboard() {

    const { auth } = useAuth();

    return (

        <Layout>

            <h2>Dashboard</h2>

            <p className="text-muted">
                Welcome back, {auth?.username}
            </p>

            <hr />

            {auth?.role === "ADMIN" && <AdminDashboard />}
            {auth?.role === "TEACHER" && <TeacherDashboard />}
            {auth?.role === "STUDENT" && <StudentDashboard />}

        </Layout>

    );

}

export default Dashboard;
