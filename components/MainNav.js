import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar, Nav, Form, Container, NavDropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const token = readToken(); // Read the token

  useEffect(() => {
    setValue("search", router.query.search || "");
  }, [router.query.search, setValue]);

  async function onSubmit(data) {
    const queryString = `title=true&q=${data.search}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?title=true&q=${data.search}`);
    setIsExpanded(false);
  }

  const logout = () => {
    // Define logout function
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
      >
        <Container>
          <Navbar.Brand className="user-select-none">
            Tomas Rochwerger - 159432210
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={toggleNavbar}
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={closeNavbar}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && ( // Add token check}
                <>
                  <Link href="/search" passHref legacyBehavior>
                    <Nav.Link
                      onClick={closeNavbar}
                      active={router.pathname === "/search"}
                    >
                      Advanced Search
                    </Nav.Link>
                  </Link>
                  &nbsp;
                  <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="me-2"
                      {...register("search")}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </Form>
                  &nbsp;
                  <NavDropdown
                    className="bg-dark text-white"
                    title={token.userName}
                    id="basic-nav-dropdown"
                  >
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item
                        onClick={closeNavbar}
                        active={router.pathname === "/favourites"}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item
                        onClick={closeNavbar}
                        active={router.pathname === "/history"}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
            {!token && ( // Add token check}
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={closeNavbar}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={closeNavbar}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}
