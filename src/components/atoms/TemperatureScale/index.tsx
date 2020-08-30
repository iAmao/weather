import React from 'react';
import {
	TemperatureScaleContainer,
	WarmScale,
	WarmProgress,
	ColdScale,
	ColdProgress
} from './styled-components'

const TemperatureScale: React.FC<TemperatureScaleProps> = ({ temperature }) => {
	return (
		<TemperatureScaleContainer>
			<ColdScale>
				{temperature < 20 ? <ColdProgress temperature={temperature} /> : null}
			</ColdScale>
			<WarmScale>
				{temperature >= 20 ? <WarmProgress temperature={temperature} /> : null}
			</WarmScale>
		</TemperatureScaleContainer>
	);
}

export interface TemperatureScaleProps {
	temperature: number;
}
export default TemperatureScale;
