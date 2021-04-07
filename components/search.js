import { InputGroup, FormControl } from "react-bootstrap";
import { useTheme } from "hooks/use-theme";
const Search = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme.background);
    return (
        <InputGroup className='mb-2'>
            <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Search for everything..."
            style={{background: `${theme.background}`, color: `${theme.fontColor}`}}
            />
        </InputGroup>
    );
}
export default Search;
