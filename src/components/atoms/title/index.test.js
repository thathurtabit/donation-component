import { shallow } from 'preact-render-spy';
import Title from './index';

describe('Test Title component', () => {
	test('Title has the correct text', () => {
		const context = shallow(<Title text="This is my test text" />);
		expect(context.text()).toBe('This is my test text');
	});
});
