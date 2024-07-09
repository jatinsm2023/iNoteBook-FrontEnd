import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const Navigate = useNavigate();
  const [islogin, setLogin] = useState(true);
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  const [showpass, setShowpass] = useState(false)
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const isEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleSignIN = async () => {
    if (!isEmail(cred.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (cred.password.length < 5) {
      toast.error("Password should be atleast 5 characters long");
      return;
    }

    try {
      const response = await fetch("https://inotebook-backend-xujt.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cred.email, password: cred.password }),
      });
      if (response.status === 400) {
        toast.error("Invalid Crentials");
        return;
      }
      if (response.status === 500) {
        toast.error("Internal Server Error");
        return;
      }
      const json = await response.json();
      console.log(json);
      const token = json.authToken;
      if (!token) {
        toast.error("Internal Server Error");
        return;
      }
      localStorage.setItem("auth-token", token);
      toast.success("Login Successful");
      Navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  const handleSignUP = async () => {
    if (cred.name === "") {
      toast.error("Name cannot be empty");
      return;
    }
    if (!isEmail(cred.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (cred.password.length < 5) {
      toast.error("Password should be atleast 5 characters long");
      return;
    }

    try {
      const response = await fetch(
        "https://inotebook-backend-xujt.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: cred.name,
            email: cred.email,
            password: cred.password,
          }),
        }
      );
      if (response.status === 400) {
        toast.error("User already exists");
        return;
      }
      if (response.status === 500) {
        toast.error("Internal Server Error");
        return;
      }
      const json = await response.json();
      console.log(json);
      const token = json.authToken;
      if (!token) {
        toast.error("Internal Server Error");
        return;
      }
      localStorage.setItem("auth-token", token);
      toast.success("Account Created");
      Navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {islogin ? (
        <Card className="md:w-96 m-auto mt-16 w-full">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" name="email" onChange={onChange} />
            <Input
              label="Password"
              size="lg"
              name="password"
              type={showpass? 'text':'password'}
              onChange={onChange}
            />
            <Checkbox label="Show Password" onClick={()=>setShowpass(!showpass)} defaultChecked={showpass}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignIN}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer hover:underline"
                onClick={() => setLogin(false)}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-96 m-auto mt-16">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" name="email" onChange={onChange} />
            <Input
              label="Password"
              type={showpass? 'text':'password'}
              size="lg"
              name="password"
              onChange={onChange}
            />
            <Input label="Name" size="lg" name="name" onChange={onChange} />
            <Checkbox label="Show Password" onClick={()=>setShowpass(!showpass)} defaultChecked={showpass}  />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignUP}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer hover:underline"
                onClick={() => setLogin(true)}
              >
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default Login;
