import { shallow } from 'preact-render-spy';
import ProgressBar from './index';

describe('Test ProgressBar component', () => {
	test('ProgressBar has the correct data', () => {
		const context = shallow(<ProgressBar percent={80} />);
		expect(context.find('span').text()).toBe('80% of target raised');
	});
});
