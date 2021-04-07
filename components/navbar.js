import { Navbar, Nav } from "react-bootstrap";
import { useTheme } from "hooks/use-theme";
import Link from "next/link";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
const MyNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Navbar
      variant={theme.type}
      className="fj-navbar fj-nav-base"
      bg="transparent"
      expand="lg"
    >
      <Navbar.Brand className="fj-navbar-brand">
        <Link href="/">
          <a>SKILL SHARING</a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Link href="/">
                <a
                className="fj-navbar-item fj-navbar-link"
                style={{ marginTop: 5 }}
                >
                Articles
                </a>
            </Link>
            <Link href="/about">
                <a
                className="fj-navbar-item fj-navbar-link"
                style={{ marginTop: 5 }}
                >
                About Us
                </a>
            </Link>
            <label style={{ paddingTop: 4 }}>
                <Toggle
                onChange={toggleTheme}
                icons={{
                    checked: (
                    <FontAwesomeIcon
                        icon={theme.type === "dark" ? faMoon : faSun}
                    />
                    ),
                    unchecked: (
                    <FontAwesomeIcon
                        icon={theme.type === "light" ? faMoon : faSun}
                    />
                    ),
                }}
                />
            </label>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MyNavbar;