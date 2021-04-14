import { Navbar, Nav } from "react-bootstrap";
import { useTheme } from "hooks/use-theme";
import Link from "next/link";
import Toggle from "react-toggle";
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
            <Link href="/dashboard">
                <a
                className="fj-navbar-item fj-navbar-link"
                style={{ marginTop: 5 }}
                >
                Мэдлэгээ хуваалцах
                </a>
            </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MyNavbar;
