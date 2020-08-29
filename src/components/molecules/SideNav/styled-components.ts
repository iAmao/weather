import styled from 'styled-components';

export const SideNavContainer = styled.div`
	width: 75px;
	height: 100vh;
	display: flex;
	align-items: center;
	border-right: 1px solid #efefef;
`;

export const NavList = styled.ul`
	display: block;
	width: 100%;
	margin: 0;
	padding: 0;
	justify-content: center;
`;

export const NavItem = styled.li`
	width: 100%;
	height: 60px;
	display: block;

	& > a {
		align-items: center;
		justify-content: center;
		display: flex;
		height: 100%;
		width: 100%;
		transition: background-color 500ms ease-in-out;

		&:hover {
			background-color: #efefef;
		}

		&.SideNav-NavLink--active {
			border-right: 2px solid red;
		}
	}
`;
