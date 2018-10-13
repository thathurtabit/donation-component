import { shallow } from 'preact-render-spy';
import Subtitle from './index';

describe('Test Subtitle component', () => {
	test('Subtitle has the correct text', () => {
		const context = shallow(<Subtitle text="This is my test text" />);
		expect(context.text()).toBe('This is my test text');
	});
});
