import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, HREFS } from "../../constants";
import useHttp from "../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import LoadingSpin from "../UI/LoadingSpin";

type Props = { isLogin: boolean };

export default function AuthForm({ isLogin }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { sendRequest, error, isLoading } = useHttp();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest(
      {
        url: `${BASE_URL}/${isLogin ? "login" : "register"}`,
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          role: "user",
          ...(isLogin ? {} : { fullName, email, phone, address }),
        }),
      },
      (data) => {
        console.log(data);
        if (isLogin) {
          dispatch(authActions.login({ token: data.token }));
          navigate("/");
        } else {
          setSuccess("Register Successfully!");
          setTimeout(() => {
            navigate("/login");
            setSuccess("");
          }, 1500);
        }
      }
    );
  };

  return (
    <form
      className="grid grid-cols-1 gap-4 w-80 mx-auto border border-600 rounded p-6 mt-20 shadow-lg shadow-lg shadow-slate-500/50"
      onSubmit={handleSubmit}
    >
      <FormControl fullWidth>
        <TextField
          id="username"
          //   label="Username"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="bg-slate-50 overflow-hidden pt-20"
          required
        ></TextField>
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id="password"
          //   label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="bg-slate-50 overflow-hidden"
          required
        ></TextField>
      </FormControl>
      {!isLogin && (
        <>
          <FormControl fullWidth>
            <TextField
              id="fullName"
              //   label="Full Name"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              className="bg-slate-50 overflow-hidden"
              required
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="email"
              //   label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="bg-slate-50 overflow-hidden"
              required
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="phone"
              //   label="Phone"
              placeholder="Phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              className="bg-slate-50 overflow-hidden"
              required
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="address"
              //   label="Address"
              placeholder="Address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              className="bg-slate-50 overflow-hidden"
            ></TextField>
          </FormControl>
        </>
      )}
      {error && <p className="text-red-900">{error}</p>}
      {success && <p className="text-green-900">{success}</p>}
      {isLoading && <LoadingSpin paddingBlock="0rem" />}
      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLogin ? "login" : "register"}
      </Button>
      {!isLoading && (
        <span>
          or{" "}
          <Link to={isLogin ? HREFS.register : HREFS.login}>
            {isLogin ? "register" : "login"}
          </Link>
        </span>
      )}
    </form>
  );
}
