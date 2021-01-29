import styled from "styled-components";
import { colors } from "./constants/constants";
import Card from "./components/Card";

const Page = styled.div`
  background-color: ${colors.grey1};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <Page>
      <Card />
    </Page>
  )
}

export default App;
