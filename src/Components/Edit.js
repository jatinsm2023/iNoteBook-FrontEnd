import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,

} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Edit () {
    const navigate = useNavigate();
    const [usercred, setUsercred] = useState({name: "", email:"", password: ""})
    const onChange = (e) => {
        setUsercred({...usercred, [e.target.name]: e.target.value})
    }
    const getUSER = async () =>{
        const response = await fetch("https://inotebook-backend-xujt.onrender.com/api/auth/getUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
            },
        });
        const json = await response.json();
        setUsercred({name: json.name, email: json.email, password: ""})
    }

    useEffect(()=>{
        getUSER();
    },[])

    const UpdateUser = async () => {
        try {
            const response = await fetch("https://inotebook-backend-xujt.onrender.com/api/auth/updateUser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ name: usercred.name, email: usercred.email }),
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
            toast.success("User Updated");
        
            setTimeout(() => {
                navigate("/");
            }, 2000);
           
        } catch (error) {
            console.log(error);
            toast.error("Internal Server Error");
        }
    }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
        <Card className="md:w-96 m-auto mt-16 w-full">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
             Update Details
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" name="name" defaultValue={usercred.name} onChange={onChange}  />
            <Input label="Email" size="lg" name="email" defaultValue={usercred.email} onChange={onChange}  />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={UpdateUser} >
              Update
            </Button>
          </CardFooter>
        </Card>
      
    </>
  );
}

export default Edit;
