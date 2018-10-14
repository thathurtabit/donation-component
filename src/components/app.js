import Donation from '../components/molecules/donation';
import { API } from '../common/constants';
const App = () => (
	<div id="app">
		<Donation API={API} />
	</div>
);

export default App;
