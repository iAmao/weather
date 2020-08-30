import React from 'react'
import styled from 'styled-components';

export const StyledButton = styled.button<ButtonProps>`
	background-color: ${({ theme, variant }) => theme.colors[variant]};
	color: ${({ theme, variant }) => variant === 'default'
		? theme.textColors.primary
		: theme.textColors.primary
	};
	margin: 0;
  border: none;
	overflow: visible;
	border-radius: 5px;
	display: inline-block;
	box-sizing: border-box;
	padding: 0 15px;
	vertical-align: middle;
	font-size: 0.8rem;
	line-height: 38px;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	cursor: pointer;

	&:hover {
		opacity: 0.6;
	}
`;


const Button: React.FC<ButtonProps> = (props) => {
	return <StyledButton {...props} />
}

export interface ButtonProps {
	variant: 'primary' | 'secondary' | 'default',
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default Button;
