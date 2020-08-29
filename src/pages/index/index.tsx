import React from 'react';
import { connect } from 'react-redux';
import {
	fetchCitiesByPopulation,
} from '../../store/city/actions';
import { FetchCitiesByPopulationAction } from '../../store/city/types';
import { CityState } from '../../store/city/initialState';

class IndexPage extends React.Component<IndexPageProps> {
	componentDidMount() {
		const { city, fetchCitiesByPopulation } = this.props;
		fetchCitiesByPopulation({
			limit: 15,
			expiresAt: city.expiresAt,
		});
	}

	render() {
		return (
			<div>
				<ul>
					{this.props.city.sortedPks.map(city => {
						return (
							<li key={city}>
								{this.props.city.cities[city].name}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export interface IndexPageProps {
	fetchCitiesByPopulation: FetchCitiesByPopulationAction,
	city: CityState,
};

const mapStateToProps = ({ city }: { city: CityState }) => {
	return {
		city,
	};
};

const mapDispatchToProps = {
	fetchCitiesByPopulation,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
