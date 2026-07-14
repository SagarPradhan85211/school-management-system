import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import api from "../../services/api";

function AddTeacher() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = id !== undefined;

    const [classes, setClasses] = useState([]);
    const [errors, setErrors] = useState({});

    const [teacher, setTeacher] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        qualification: "",
        experience: "",
        salary: "",
        joiningDate: "",
        status: "",
        classId: "",
        username: "",
        password: ""

    });

    useEffect(() => {

        loadClasses();

        if (isEdit) {
            loadTeacher();
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

    const loadTeacher = async () => {

        try {

            const response = await api.get(`/teachers/${id}`);

            setTeacher({

                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                phone: response.data.phone,
                gender: response.data.gender,
                dob: response.data.dob,
                qualification: response.data.qualification,
                experience: response.data.experience,
                salary: response.data.salary,
                joiningDate: response.data.joiningDate,
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

        setTeacher({

            ...teacher,

            [name]: name === "classId"
                ? Number(value)
                : (name === "experience"
                    ? value
                    : (name === "salary" ? value : value))

        });

        setErrors({

            ...errors,

            [name]: ""

        });

    };

    const saveTeacher = async () => {

        try {

            const payload = {

                ...teacher,
                experience: teacher.experience === "" ? null : Number(teacher.experience),
                salary: teacher.salary === "" ? null : Number(teacher.salary),
                // On update the backend does not change login credentials via
                // this endpoint, but the DTO still requires non-blank values.
                username: isEdit ? (teacher.username || "unchanged") : teacher.username,
                password: isEdit ? "unchanged" : teacher.password

            };

            if (isEdit) {

                await api.put(`/teachers/${id}`, payload);

                alert("Teacher Updated Successfully");

            }

            else {

                await api.post("/teachers", payload);

                alert("Teacher Added Successfully");

            }

            navigate("/teachers");

        }

        catch (err) {

            if (err.response) {

                if (err.response.status === 400) {
                    setErrors(err.response.data);
                }
                else if (err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                }
                else {
                    alert("Something went wrong");
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
                {isEdit ? "Edit Teacher" : "Add Teacher"}
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
                            value={teacher.firstName}
                            onChange={handleChange}
                        />

                        {errors.firstName &&
                            <div className="invalid-feedback">{errors.firstName}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Last Name</label>

                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                            name="lastName"
                            value={teacher.lastName}
                            onChange={handleChange}
                        />

                        {errors.lastName &&
                            <div className="invalid-feedback">{errors.lastName}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Email</label>

                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            name="email"
                            value={teacher.email}
                            onChange={handleChange}
                        />

                        {errors.email &&
                            <div className="invalid-feedback">{errors.email}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Phone</label>

                        <input
                            type="text"
                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            name="phone"
                            value={teacher.phone}
                            onChange={handleChange}
                        />

                        {errors.phone &&
                            <div className="invalid-feedback">{errors.phone}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Gender</label>

                        <select
                            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                            name="gender"
                            value={teacher.gender}
                            onChange={handleChange}
                        >

                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>

                        </select>

                        {errors.gender &&
                            <div className="invalid-feedback">{errors.gender}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Date Of Birth</label>

                        <input
                            type="date"
                            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                            name="dob"
                            value={teacher.dob}
                            onChange={handleChange}
                        />

                        {errors.dob &&
                            <div className="invalid-feedback">{errors.dob}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Qualification</label>

                        <input
                            type="text"
                            className={`form-control ${errors.qualification ? "is-invalid" : ""}`}
                            name="qualification"
                            value={teacher.qualification}
                            onChange={handleChange}
                        />

                        {errors.qualification &&
                            <div className="invalid-feedback">{errors.qualification}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Experience (years)</label>

                        <input
                            type="number"
                            min="0"
                            className={`form-control ${errors.experience ? "is-invalid" : ""}`}
                            name="experience"
                            value={teacher.experience}
                            onChange={handleChange}
                        />

                        {errors.experience &&
                            <div className="invalid-feedback">{errors.experience}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Salary</label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            className={`form-control ${errors.salary ? "is-invalid" : ""}`}
                            name="salary"
                            value={teacher.salary}
                            onChange={handleChange}
                        />

                        {errors.salary &&
                            <div className="invalid-feedback">{errors.salary}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Joining Date</label>

                        <input
                            type="date"
                            className={`form-control ${errors.joiningDate ? "is-invalid" : ""}`}
                            name="joiningDate"
                            value={teacher.joiningDate}
                            onChange={handleChange}
                        />

                        {errors.joiningDate &&
                            <div className="invalid-feedback">{errors.joiningDate}</div>
                        }

                    </div>

                    <div className="col-md-6 mb-3">

                        <label>Status</label>

                        <select
                            className={`form-select ${errors.status ? "is-invalid" : ""}`}
                            name="status"
                            value={teacher.status}
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

                    <div className="col-md-6 mb-3">

                        <label>Class</label>

                        <select
                            className={`form-select ${errors.classId ? "is-invalid" : ""}`}
                            name="classId"
                            value={teacher.classId}
                            onChange={handleChange}
                        >

                            <option value="">Select Class</option>

                            {classes.map((schoolClass) => (

                                <option key={schoolClass.id} value={schoolClass.id}>
                                    {schoolClass.className}-{schoolClass.section}
                                </option>

                            ))}

                        </select>

                        {errors.classId &&
                            <div className="invalid-feedback">{errors.classId}</div>
                        }

                    </div>

                    {!isEdit &&
                        <div className="col-md-6 mb-3">

                            <label>Username</label>

                            <input
                                type="text"
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                name="username"
                                value={teacher.username}
                                onChange={handleChange}
                            />

                            {errors.username &&
                                <div className="invalid-feedback">{errors.username}</div>
                            }

                        </div>
                    }

                    {!isEdit &&
                        <div className="col-md-6 mb-3">

                            <label>Password</label>

                            <input
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                name="password"
                                value={teacher.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                            />

                            {errors.password &&
                                <div className="invalid-feedback">{errors.password}</div>
                            }

                        </div>
                    }

                    {isEdit &&
                        <div className="col-md-12 mb-3">

                            <small className="text-muted">
                                Login credentials (username: <strong>{teacher.username}</strong>)
                                are not changed from this form.
                            </small>

                        </div>
                    }

                </div>

                <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={saveTeacher}
                >
                    {isEdit ? "Update Teacher" : "Save Teacher"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/teachers")}
                >
                    Cancel
                </button>

            </form>

        </Layout>

    );

}

export default AddTeacher;
