import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getCityWeather } from '../../../store/weather/actions';
import { GetCityWeatherAction } from '../../../store/weather/types';
import Button from '../../atoms/Button';
import {
	TopNavContainer
} from './styled';

const TopNav: React.FC<TopNavProps> = (props) => {
	const [value, setValue] = React.useState('');
	const history = useHistory();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	};

	const handleSearch = () => {
		props.getCityWeather(value, 0);
		history.push(`/city/${value}`);
	}

	return (
		<TopNavContainer>
			<div />
			<div>
				<input value={value} onChange={handleChange} placeholder="Search..." />
				<Button variant="primary" onClick={handleSearch}>Search</Button>
			</div>
		</TopNavContainer>
	);
}


export interface TopNavProps {
	getCityWeather: GetCityWeatherAction;
}

export default connect(null, { getCityWeather })(TopNav);
