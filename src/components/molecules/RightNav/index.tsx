import React from 'react';
import { connect } from 'react-redux';
import {
	RightNavContainer,
	RightNavHeader,
	RightNavContent,
	RightNavError,
	RightNavImage,
	RightNavOverlay,
	RightNavWeather
} from './styled-components';
import Button from '../../atoms/Button';
import {
	CityState,
	CurrentCityWeather
} from '../../../store/city/initialState';
import { findMyCityByCoords } from '../../../store/city/actions';
import {
	FindMyCityByCoordsAction
} from '../../../store/city/types';
import {
	CoordinatePosition,
} from '../../../types';

function onSuccess(callback?: (arg: CoordinatePosition) => void): PositionCallback {
	return position => {
		const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    return typeof callback === 'function'
    	? callback({ latitude, longitude })
    	: null;
	};
}

function onError(callback?: (arg: string) => void) {
	return () => {
		return typeof callback === 'function'
			? callback('Could not get location information.')
			: null;
	};
}

const RightNav: React.FC<RightNavProps> = (props) => {
	const [position, setPosition] = React.useState<CoordinatePosition>({
		latitude: 0,
		longitude: 0,
	});
	const [error, setError] = React.useState<string>('');

	React.useEffect(() => {
		if (position.latitude !== 0 && position.longitude !== 0) {
			props.findMyCityByCoords(position);
		}
	// eslint-disable-next-line
	}, [position]);

	const handleGeoSuccess = onSuccess(setPosition);
	const handleGetError = onError(setError);
	const handleGetLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				handleGeoSuccess,
				handleGetError,
				{ timeout: 5000 }
			);
		} else {
			setError('Geo Location is not supported by your browser');
		}
	}

	const { poster, current: weather = {}, location  } = props.weather;
	console.log(props, weather);
	return (
		<RightNavContainer>
			<RightNavHeader />
			<RightNavContent>
				{poster
					? <RightNavImage><img src={poster} alt={location.name} /></RightNavImage>
					: null
				}
				<RightNavOverlay>
					{location.name
						? (<RightNavWeather>
								<h3>{location.name}, {location.country}</h3>
								<div>
									<h1>{weather.temperature}&deg;C</h1>
									<h3>{weather.weather_descriptions[0]}</h3>
								</div>
							</RightNavWeather>)
						: null
					}
					{!!error ? <RightNavError><p>{error}</p></RightNavError> : null}
					{!location.name
						? (
							<Button variant="secondary" onClick={handleGetLocation}>
								ENABLE LOCATION
							</Button>
						)
						: null
					}
				</RightNavOverlay>
			</RightNavContent>
		</RightNavContainer>
	);
};

const mapStateToProps = ({ city }: { city: CityState }) => {
	return {
		weather: city.current || {},
	};
};

export interface RightNavProps {
	weather: CurrentCityWeather;
	findMyCityByCoords: FindMyCityByCoordsAction;
}
export default connect(mapStateToProps, { findMyCityByCoords })(RightNav);
