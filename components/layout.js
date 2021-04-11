import { Container } from "react-bootstrap";
import MyNavbar from "components/navbar";
import { useTheme } from "hooks/use-theme";
const Layout = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className={theme.type}>
      <Container>
        <MyNavbar />
        <div className="blog-detail-page">
          <div className={`page-wrapper`}>{children}</div>
        </div>
        <footer className="page-footer">
          <div>
           
          </div>
        </footer>
      </Container>
      <style jsx global>
        {`
          html,
          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            transition: color 0.2s ease-out background 0.2s ease-out 0s;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
