import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

function AddStudent() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = id !== undefined;

    const [classes, setClasses] = useState([]);
    const [errors, setErrors] = useState({});

    const [student, setStudent] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        rollNumber: "",
        gender: "",
        dob: "",
        address: "",
        admissionDate: "",
        status: "",
        classId: "",
        username: "",
        password: ""

    });

    useEffect(() => {

        loadClasses();

        if (isEdit) {

            loadStudent();

        }

    }, []);

    const loadClasses = async () => {

        try {

            const response = await api.get("/classes");

            setClasses(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const loadStudent = async () => {

        try {

            const response = await api.get(`/students/${id}`);

            setStudent({

                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                phone: response.data.phone,
                rollNumber: response.data.rollNumber,
                gender: response.data.gender,
                dob: response.data.dob,
                address: response.data.address,
                admissionDate: response.data.admissionDate,
                status: response.data.status,
                classId: response.data.classId,
                username: response.data.username,
                password: ""

            });

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setStudent({

            ...student,

            [name]: name === "classId" ? Number(value) : value

        });

        setErrors({

            ...errors,

            [name]: ""

        });

    };

    const saveStudent = async () => {

        try {

            if (isEdit) {

                await api.put(`/students/${id}`, student);

                alert("Student Updated Successfully");

            }

            else {

                await api.post("/students", student);

                alert("Student Added Successfully");

            }

            navigate("/students");

        }

        catch (err) {

            if (err.response) {

                if (err.response.status === 400) {

                    setErrors(err.response.data);

                }

                else if (err.response.status === 409) {

                    alert(err.response.data.message);

                }

                else {

                    alert(err.response.data.message);

                }

            }

            else {

                alert("Server Error");

            }

        }

    };


    return (

        <Layout>

            <h2>

                {isEdit ? "Edit Student" : "Add Student"}

            </h2>

            <hr />

            <form>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label>First Name</label>

                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                            name="firstName"
                            value={student.firstName}
                            onChange={handleChange}
                        />

                        {errors.firstName &&
                            <div className="invalid-feedback">
                                {errors.firstName}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Last Name</label>

                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                            name="lastName"
                            value={student.lastName}
                            onChange={handleChange}
                        />

                        {errors.lastName &&
                            <div className="invalid-feedback">
                                {errors.lastName}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Email</label>

                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                        />

                        {errors.email &&
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Phone</label>

                        <input
                            type="text"
                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            name="phone"
                            value={student.phone}
                            onChange={handleChange}
                        />

                        {errors.phone &&
                            <div className="invalid-feedback">
                                {errors.phone}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Roll Number</label>

                        <input
                            type="text"
                            className={`form-control ${errors.rollNumber ? "is-invalid" : ""}`}
                            name="rollNumber"
                            value={student.rollNumber}
                            onChange={handleChange}
                        />

                        {errors.rollNumber &&
                            <div className="invalid-feedback">
                                {errors.rollNumber}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Gender</label>

                        <select
                            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                            name="gender"
                            value={student.gender}
                            onChange={handleChange}
                        >

                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>

                        </select>

                        {errors.gender &&
                            <div className="invalid-feedback">
                                {errors.gender}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Date Of Birth</label>

                        <input
                            type="date"
                            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                            name="dob"
                            value={student.dob}
                            onChange={handleChange}
                        />

                        {errors.dob &&
                            <div className="invalid-feedback">
                                {errors.dob}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Admission Date</label>

                        <input
                            type="date"
                            className={`form-control ${errors.admissionDate ? "is-invalid" : ""}`}
                            name="admissionDate"
                            value={student.admissionDate}
                            onChange={handleChange}
                        />

                        {errors.admissionDate &&
                            <div className="invalid-feedback">
                                {errors.admissionDate}
                            </div>
                        }

                    </div>
                    <div className="col-md-12 mb-3">

                        <label>Address</label>

                        <textarea
                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                            rows="3"
                            name="address"
                            value={student.address}
                            onChange={handleChange}
                        />

                        {
                            errors.address &&
                            <div className="invalid-feedback">
                                {errors.address}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Status</label>

                        <select
                            className={`form-select ${errors.status ? "is-invalid" : ""}`}
                            name="status"
                            value={student.status}
                            onChange={handleChange}
                        >

                            <option value="">Select Status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>

                        </select>

                        {
                            errors.status &&
                            <div className="invalid-feedback">
                                {errors.status}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Class</label>

                        <select
                            className={`form-select ${errors.classId ? "is-invalid" : ""}`}
                            name="classId"
                            value={student.classId}
                            onChange={handleChange}
                        >

                            <option value="">Select Class</option>

                            {

                                classes.map((schoolClass) => (

                                    <option
                                        key={schoolClass.id}
                                        value={schoolClass.id}
                                    >

                                        {schoolClass.className}-{schoolClass.section}

                                    </option>

                                ))

                            }

                        </select>

                        {
                            errors.classId &&
                            <div className="invalid-feedback">
                                {errors.classId}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Username</label>

                        <input
                            type="text"
                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                            name="username"
                            value={student.username}
                            onChange={handleChange}
                        />

                        {
                            errors.username &&
                            <div className="invalid-feedback">
                                {errors.username}
                            </div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Password</label>

                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            name="password"
                            value={student.password}
                            onChange={handleChange}
                            placeholder={
                                isEdit
                                    ? "Leave blank to keep current password"
                                    : "Enter Password"
                            }
                        />

                        {
                            isEdit &&
                            <small className="text-muted">
                                Leave blank to keep current password.
                            </small>
                        }

                        {
                            errors.password &&
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        }

                    </div>

                </div>

                <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={saveStudent}
                >

                    {isEdit ? "Update Student" : "Save Student"}

                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/students")}
                >

                    Cancel

                </button>

            </form>

        </Layout>

    );

}

export default AddStudent;