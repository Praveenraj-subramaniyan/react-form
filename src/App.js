import React, { useEffect } from "react";
import "./App.css";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

function App() {
  const loginForm = useForm();
  const { handleSubmit, register, formState, watch, reset, control } =
    loginForm;
  const { errors, isSubmitSuccessful } = formState;
  const passwordValue = watch("password");
  const degreeValue = watch("degree");
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  const degreeOptions = [
    { value: "cse", label: "Computer Science" },
    { value: "it", label: "Infotmation Technology" },
  ];
  return (
    <div className="App ">
      <h3 className="bg-primary text-white text-center">Validation Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your name"
            className="inputbox"
            {...register("username", {
              required: {
                value: true,
                message: "UserName is required",
              },
            })}
          />
          <p>{errors.username?.message}</p>

          <label>Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            className="inputbox"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
          />
          <p>{errors.email?.message}</p>

          <label>Mobile</label>
          <br />
          <input
            type="text"
            id="mobile"
            name="mobile"
            className="inputbox"
            {...register("mobile", {
              required: {
                value: true,
                message: "Mobile number is required",
              },
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid mobile address",
              },
            })}
            placeholder="Enter your mobile"
            maxLength={10}
          />
          <p>{errors.mobile?.message}</p>
          <label>Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="inputbox"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              pattern: {
                value:
                  /^(?=.*[!@#$])(?=.*[0-9]{4})(?=.*[A-Z]{2})(?=.*[a-z]{2}).{8,}$/,
                message:
                  "At least 1 special character, 4 numbers , 2 capital and small letter",
              },
            })}
            placeholder="Enter your password"
          />
          <p>{errors.password?.message}</p>

          <label>Password</label>
          <br />
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className="inputbox"
            {...register("confirmpassword", {
              required: {
                value: true,
                message: "Confirm Password is required",
              },
              pattern: {
                value:
                  /^(?=.*[!@#$])(?=.*[0-9]{4})(?=.*[A-Z]{2})(?=.*[a-z]{2}).{8,}$/,
                message:
                  "At least 1 special character, 4 numbers , 2 capital and small letter",
              },
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            placeholder="Confirm password"
          />
          <p>{errors.confirmpassword?.message}</p>
        </div>
        <Controller
          control={control}
          defaultValue={null}
          id="gender"
          name="gender"
          rules={{
            required: {
              value: true,
              message: "Select one",
            },
          }}
          render={({ field }) => (
            <>
              <label>Select Gender</label>
              <Select
                {...field}
                className="inputbox "
                options={genderOptions}
              />
            </>
          )}
        />
        <p>{errors.gender?.message}</p>
        <Controller
          control={control}
          name="degree"
          defaultValue={false}
          render={({ field }) => (
            <>
              <input type="checkbox" className="mt-3" {...field} /> Degree
              holder
            </>
          )}
        />
        <br />
        <Controller
          control={control}
          name="department"
          defaultValue={"cse"}
          render={({ field }) => (
            <>
              {degreeOptions.map((option) => (
                <>
                  <input
                    key={option.value}
                    type="radio"
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    disabled={!degreeValue}
                    className=""
                  />{" "}
                  <label className="me-3 mt-3 departmentlabel">
                    {option.label}
                  </label>
                </>
              ))}
            </>
          )}
        />
        <br />
        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
