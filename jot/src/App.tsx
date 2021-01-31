import { colors } from "./constants/constants";
import Scheduler from "./components/Scheduler";
import Box from '@material-ui/core/Box';

const App = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor={colors.grey1}
    height="100vh"
  >
    <Scheduler />
  </Box>
);

export default App;
