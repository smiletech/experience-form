
import React, { useState, useEffect } from "react";
import { v4 } from "uuid"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Update() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [gender, setgender] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [pincode, setpincode] = useState("");
    const [skill, setskill] = useState([]);
    const [expr, setexpr] = useState([
        {
            id: v4(),
            CompanyName: "",
            Duration: "",
            responsibilities: "",
        },
        {
            id: v4(),
            CompanyName: "",
            Duration: "",
            responsibilities: "",
        }
    ]);

    const [count, setcount] = useState(0);



    const RadioHandler = (e) => {
        console.log(e.target.value);
        setgender(e.target.value);
    };

    const Checkhandler = (e, index) => {
        if (e.target.checked) {
            console.log(index)
            skill.splice(index, 1, e.target.value)
            setskill(skill);
        } else {
            const index1 = skill.indexOf(e.target.value);
            if (index1 !== -1) { skill.splice(index1, 1, ''); }
            setskill(skill);
        }
        setcount((prec) => prec + 1);
    };


    const RemoveHandler = (index) => {
        if (expr.length > 2) expr.splice(index, 1)

        else alert("at least 2 - Experience");

        setcount((prev) => prev + 1);
    };
    const AddHandler = () => {
        if (expr.length < 5) {
            expr.push({
                id: v4(),
                CompanyName: "",
                Duration: "",
                responsibilities: "",
            })
        }
        else alert(" max 5 - Experience");
        setcount((prev) => prev + 1);
    };
    const reset = () => {
        setfirstname("")
        setlastname("")
        setemail("");
        setaddress("");
        setcountry("");
        setgender("");
        setstate("");
        setpincode("");
        setskill("");
        setexpr([{
            id: v4(),
            CompanyName: "",
            Duration: "",
            responsibilities: "",
        },
        {
            id: v4(),
            CompanyName: "",
            Duration: "",
            responsibilities: "",
        }])

    }

    const abs = () => {
        const localdata = JSON.parse(localStorage.getItem("data")) || [];
        console.log(localdata)
        const data = localdata.filter((ele, index) => (index == id))
        console.log(data[0])
        setfirstname(data[0].firstname)
        setlastname(data[0].lastname)
        setemail(data[0].email);
        setaddress(data[0].address);
        setcountry(data[0].country);
        setgender(data[0].gender);
        setstate(data[0].state);
        setpincode(data[0].pincode);
        setskill(data[0].skill);
        setexpr(data[0].Experience)

    }

    const Submithandler = () => {
        let count1 = 0;
        skill.map((ele) => {
            if (ele !== '') count1++;
        })
        if (count1 >= 3) {

            const Alldata = JSON.parse(localStorage.getItem("data")) || [];
            let details = {
                firstname,
                lastname,
                email,
                address,
                country,
                gender,
                state,
                pincode,
                skill,
                Experience: expr,
            };

            console.log(details)
            // Alldata.push(details);
            Alldata.splice(id, 1, details)
            localStorage.setItem("data", JSON.stringify(Alldata));
            reset();
            alert("data successfully saved")
            details = {};
            navigate(`/list`);
        }

        else {
            alert("minimum 3 skill required")
        }
    };

    useEffect(() => {
        abs();

    }, []);
    console.log(expr)

    return (
        <div className="bg-light">
            <div className="container my-4">
                <main>
                    <div className="py-5 text-center">
                        <h2>Edit Candidate Data</h2>
                    </div>

                    <div className="row g-5">
                        <div className="col-md-7 col-lg-8 ms-auto me-auto">
                            <h4 className="mb-3">Basic Info</h4>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">First name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstname}
                                        onChange={(e) => setfirstname(e.target.value)}
                                    />
                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastname}
                                        onChange={(e) => setlastname(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Gender</label>
                                    <div onChange={(e) => RadioHandler(e)}>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                name="gender"
                                                value="Male"
                                                type="radio"
                                                checked={gender === "Male"}
                                            />
                                            <label className="form-check-label">Male</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                name="gender"
                                                value="Female"
                                                checked={gender === "Female"}
                                                type="radio"
                                            />
                                            <label className="form-check-label">Female</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                name="gender"
                                                value="Other"
                                                checked={gender === "Other"}
                                                type="radio"
                                            />
                                            <label className="form-check-label">Other</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="1234 Main St"
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="col-md-5">
                                    <label className="form-label">Country</label>
                                    <select
                                        className="form-select"
                                        value={country}
                                        onChange={(e) => setcountry(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="India">India</option>
                                        <option value="United States">United States</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">State</label>
                                    <select
                                        className="form-select"
                                        value={state}
                                        onChange={(e) => setstate(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Karnataka">Karnataka</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Pin / Zip</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={pincode}
                                        onChange={(e) => setpincode(e.target.value)}
                                    />
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Professional Info</h4>

                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">
                                        Choose your skills
                                        <span className="small text-muted">(min 3 skills)</span>
                                    </label>

                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Angular"
                                                checked={skill[0] === "Angular"}
                                                onChange={(e) => Checkhandler(e, 0)}
                                            />
                                            <label className="form-check-label">Angular</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="React"
                                                checked={skill[1] === "React"}
                                                onChange={(e) => Checkhandler(e, 1)}
                                            />
                                            <label className="form-check-label">React</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Node.JS"
                                                checked={skill[2] === "Node.JS"}
                                                onChange={(e) => Checkhandler(e, 2)}
                                            />
                                            <label className="form-check-label">Node.JS</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="JavaScript"
                                                checked={skill[3] === "JavaScript"}
                                                onChange={(e) => Checkhandler(e, 3)}
                                            />
                                            <label className="form-check-label">JavaScript</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Flutter"
                                                checked={skill[4] === "Flutter"}

                                                onChange={(e) => Checkhandler(e, 4)}
                                            />
                                            <label className="form-check-label">Flutter</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Java"
                                                checked={skill[5] === "Java"}
                                                onChange={(e) => Checkhandler(e, 5)}
                                            />
                                            <label className="form-check-label">Java</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row gy-3">
                                <div className="col-12">
                                    <label className="form-label">
                                        <strong>
                                            Experience
                                            <span className="small text-muted">
                                                (min 2, max 5 items)
                                            </span>
                                        </strong>
                                    </label>

                                    {expr.map((ele, index) => {
                                        return (
                                            <div key={ele.id} className={`card mx-3 mt-3 ind${index}`}>
                                                <div className="card-body">
                                                    <h6 className="card-title text-muted mb-3">
                                                        {`Experience #${index + 1}`}
                                                        <p
                                                            className="float-end text-danger fw-normal pointer"
                                                            onClick={(e) => { RemoveHandler(index) }}
                                                        >
                                                            Remove
                                                        </p>
                                                    </h6>
                                                    <div className="row g-3">
                                                        <div className="col-6">
                                                            <label className="form-label">Company Name</label>

                                                            <input
                                                                type="text"
                                                                className={`form-control com${index}`}
                                                                defaultValue={ele.CompanyName}
                                                                value={expr.CompanyName}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    const data1 = expr.map((each, i) => {
                                                                        if (ele.id === each.id) {
                                                                            return { ...each, CompanyName: e.target.value }
                                                                        }
                                                                        else { return each }

                                                                    })
                                                                    setexpr(data1)
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="form-label">
                                                                Duration{" "}
                                                                <span className="text-muted">(in months)</span>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                defaultValue={ele.Duration}
                                                                value={expr.Duration}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    const data1 = expr.map((each, i) => {
                                                                        if (ele.id === each.id) {
                                                                            return { ...each, Duration: e.target.value }
                                                                        }
                                                                        else { return each }

                                                                    })
                                                                    setexpr(data1)
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label">
                                                                Describe your responsibilities
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                defaultValue={ele.responsibilities}
                                                                value={expr.responsibilities}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    const data1 = expr.map((each, i) => {
                                                                        if (ele.id === each.id) {
                                                                            return { ...each, responsibilities: e.target.value }
                                                                        }
                                                                        else { return each }

                                                                    })
                                                                    setexpr(data1)
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <p className="d-block mt-3 pointer" onClick={AddHandler}>
                                        Add more experience
                                    </p>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <button
                                className="btn btn-primary"
                                onClick={Submithandler}
                                type="submit"
                            >
                                Save Candidate
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Update;
