import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";



function Noteitem(props) {
  const context = useContext(noteContext);
  const { note } = props;
  const { deleteNote, updateNote } = context;
  const [modal, setmodal] = useState(false);
  const showModal = () => {
    setmodal(!modal);
  };

  const [NOTE, setNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });
  const UPDATE = () => {
    updateNote(note._id, NOTE.title, NOTE.description, NOTE.tag);
    setmodal(!modal);
  };

  const onChange = (e) => {
    setNote({ ...NOTE, [e.target.name]: e.target.value });
  };

  return (
    <>
      <>
        {modal ? (
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden absolute m-auto z-50 flex justify-center  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Update The NOTE
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                    onClick={showModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Change Title"
                        required=""
                        defaultValue={note.title}
                        onChange={onChange}
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        rows="2"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                        defaultValue={note.description}
                        onChange={onChange}
                      ></textarea>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="tag"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tag
                      </label>
                      <input
                        type="text"
                        name="tag"
                        id="tag"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Tag"
                        required=""
                        defaultValue={note.tag}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <Button
                    className="text-white inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={UPDATE}
                  >
                    Update Note
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Card className="m-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
             {note.title}
            </Typography>
            <Typography>
              {note.description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button  onClick={showModal} className="m-2">Edit</Button>
            <Button onClick={() => deleteNote(note._id)} className="m-2">Delete </Button>
          </CardFooter>

        </Card>
        {/* <div className="max-w-md rounded overflow-hidden border m-3 hover:shadow-xl hover:scale-105 transition-all ">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{note.title}</div>
            <p className="text-gray-700 text-base">{note.description}</p>
            <i
              className="fa-regular fa-trash-can m-2 font-bold text-2xl text-red-500"
              onClick={() => deleteNote(note._id)}
            ></i>{" "}
            <i
              className="fa-regular fa-pen-to-square m-2 font-bold text-2xl text-yellow-500"
              onClick={showModal}
            ></i>
          </div>
        </div> */}
      </>
    </>
  );
}

export default Noteitem;
