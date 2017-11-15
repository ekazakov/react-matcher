import { configure } from 'enzyme';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
