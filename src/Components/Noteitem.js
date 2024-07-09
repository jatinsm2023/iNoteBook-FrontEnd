import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../Context/notes/noteContext";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardHeader,
  Input,
  
} from "@material-tailwind/react";


function Noteitem(props) {
  const context = useContext(noteContext);
  const { note } = props;
  const { deleteNote, updateNote } = context;
  const [modal, setModal] = useState(false);
  const modalRef = useRef();

  const showModal = () => {
    setModal(!modal);
  };

  const [NOTE, setNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  const UPDATE = () => {
    updateNote(note._id, NOTE.title, NOTE.description, NOTE.tag);
    setModal(!modal);
  };

  const onChange = (e) => {
    setNote({ ...NOTE, [e.target.name]: e.target.value });
    console.log(NOTE)
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(false);
    }
  };

  useEffect(() => {
    if (modal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  return (
    <>
      {modal && (
        <div className="block fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300">
          <div
            ref={modalRef}
            className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
          >
            <Card className="w-96 m-auto mt-16">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-16 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Update
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input
                  label="Title"
                  size="lg"
                  name="title"
                  onChange={onChange}
                  defaultValue={note.title}
                />
                <Input
                  label="Description"
                  size="lg"
                  name="description"
                  type='text'
                  onChange={onChange}
                  defaultValue={note.description}
                />
                <Input
                  label="Tag"
                  size="lg"
                  name="tag"
                  type='text'
                  onChange={onChange}
                  defaultValue={note.tag}
                />
               
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth onClick={UPDATE} >
                  Update
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <Card className="m-6 w-full border">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {note.title}
          </Typography>
          <Typography>{note.description}</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-end">
          <Button onClick={showModal} className="m-2">
            Edit
          </Button>
          <Button onClick={() => deleteNote(note._id)} className="m-2">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Noteitem;
