import React from 'react';
import { PageLayoutContainer } from './styled';

const PageLayout = ({
	children: Main,
	sideNav: SideNav,
	topNav: TopNav,
}: PageLayoutProps) => {
	return (
		<PageLayoutContainer>
			{SideNav ? SideNav : null}
			<div>
				{TopNav ? TopNav : null}
				{Main ? Main : null}
			</div>
		</PageLayoutContainer>
	);
}

export interface PageLayoutProps {
	children: React.ReactNode,
	sideNav: React.ElementType,
	topNav: React.ElementType,
};

export default PageLayout;
