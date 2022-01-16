import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
let p;

const getLocalStorage = () => {
  let personName = localStorage.getItem("list");
  if (personName) {
    return (personName = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const Signup = () => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  // const PostData = async (e) => {
  //   e.preventDefault();
  //   const { firstName, lastName, email, password, confirmPassword } = user;
  //   const res = await fetch("/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       confirmPassword,
  //     }),
  //   });
  //   const data = await res.json();

  //   if (data.status === 422 || !data) {
  //     window.alert("Invalid Registration");
  //     console.log("Invalid Registration");
  //   } else {
  //     window.alert("Registration Successful");
  //     console.log("Registration Successful");
  //   }
  // };

  // const names = [
  //   "Oliver Hansen",
  //   "Van Henry",
  //   "April Tucker",
  //   "Ralph Hubbard",
  //   "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
  // ];

  const names = [
    { id: 1, value: "Dhaka" },
    { id: 2, value: "Chittagong" },
    { id: 3, value: "Rajshahi" },
    { id: 4, value: "Khulna" },
    { id: 5, value: "Barisal" },
    { id: 6, value: "Sylhet" },
  ];

  const cars1 = [
    { id: 1, value: "Volvo" },
    { id: 2, value: "Audi" },
    { id: 3, value: "BMW" },
    { id: 4, value: "Toyota" },
  ];

  const [personName, setPersonName] = useState(getLocalStorage() && ["Dhaka"]);
  const [selectValue, setSelectValue] = useState(getLocalStorage());

  useEffect(() => {
    if (personName != null)
      localStorage.setItem("list", JSON.stringify(personName));
    // else localStorage.setItem("list", JSON.stringify("Oliver Hansen"));
  }, [personName]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChange2 = (e) => {
    setSelectValue(e.target.value);
  };
  // p = selectValue;
  // console.log(cars1[p - 1].value);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          cbox: [],
        }}
        validationSchema={validate}
        onSubmit={
          async (values) => {
            console.log(values);
          }

          // PostData
        }
      >
        {
          <div>
            <h1 className="my-4 font-weight-bold .display-4 text-center">
              Sign Up
            </h1>
            <Form method="POST">
              <TextField label="First Name" name="firstName" type="text" />
              <TextField label="Last Name" name="lastName" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Select
                className="my-3"
                name="cbox"
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name1) => (
                  <MenuItem key={name1.id} value={name1.value}>
                    <Checkbox
                      checked={
                        personName.indexOf(name1.value) > -1
                        // || names[0].value
                      }
                    />
                    <ListItemText primary={name1.value} />
                  </MenuItem>
                ))}
                {console.log(personName)}
              </Select>
              <div className="text-center">
                <button className="btn btn-dark mt-3 " type="submit">
                  Register
                </button>
                <button className="btn btn-danger mt-3 " type="reset">
                  Reset
                </button>
              </div>
            </Form>
          </div>
        }
      </Formik>
      {/* <label for="cars">Choose a car:</label> */}

      {/* <select
        className="my-3"
        name="cars"
        id="cars"
        value={selectValue}
        onChange={handleChange2}
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select> */}

      {/* <select
        className="my-3"
        name="cars"
        id="cars"
        value={selectValue}
        onChange={handleChange2}
      >
        <option value={1}>Volvo</option>
        <option value={2}>Audi</option>
        <option value={3}>BMW</option>
        <option value={4}>Toyota</option>
      </select> */}
    </>
  );
};

export default Signup;
