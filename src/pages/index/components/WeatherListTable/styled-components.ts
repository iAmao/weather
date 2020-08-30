import styled from 'styled-components';

export const TableRow = styled.tr`
	&:first-child {
		border-top: #efefef;
	}

	&:hover {
		background-color: #efefef;
	}
`;

export interface TableDataProps {
	small?: boolean;
}
export const TableData = styled.td<TableDataProps>`
	padding: 1.8rem 1.2rem;
	font-size: ${props => (
		props.small ? '0.7rem': '1rem'
	)};
`;

export const Table = styled.table`
	margin: 0 auto;
	margin-top: 3rem;
`;
