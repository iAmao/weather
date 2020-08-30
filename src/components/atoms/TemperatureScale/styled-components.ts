import styled from 'styled-components';

export const TemperatureScaleContainer = styled.div`
	display: flex;
`;

export const ColdScale = styled.div`
	width: 30px;
	height: 3px;
	position: relative;
	background-color: #cccccc;
	border-radius: 3px;
	overflow: hidden;
`;

export const WarmScale = styled.div`
	width: 30px;
	height: 3px;
	position: relative;
	background-color: #cccccc;
	border-radius: 3px;
	overflow: hidden;
`;

export interface TempProgressProps {
	temperature: number;
}
export const WarmProgress = styled.div<TempProgressProps>`
	width: ${props => ((30 * props.temperature)/70)}px;
	height: 3px;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.colors.orange};
`;

export const ColdProgress = styled.div<TempProgressProps>`
	width: ${props => ((30 * props.temperature)/80)}px;
	height: 3px;
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.colors.primary};
`;


