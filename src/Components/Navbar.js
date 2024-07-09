import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
// profile menu component

function ProfileMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const SignOUT = () => {
    localStorage.removeItem("auth-token");
    navigate("/Login");
  };
  const profileMenuItems = [
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      route: "/Edit",
      onClick: closeMenu,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      route: "/Login",
      onClick: SignOUT,
    },
  ];
  return (
    (localStorage.getItem("auth-token") || window.location === "/Login") && (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, route, onClick }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <Link to={route}>
                <MenuItem
                  key={label}
                  onClick={onClick}
                  className={`flex items-center gap-2 rounded border border-white hover:border-white ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>
    )
  );
}

// nav list component

function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="m-2  z-50 mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 bg-black text-white">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <span className="text-2xl">
          <img src="/notes.png" alt="" width={"20px"} />
        </span>
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-bold  text-white "
        >
          iNoteBook
        </Typography>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll"></MobileNav>
    </Navbar>
  );
}

export default ComplexNavbar;
