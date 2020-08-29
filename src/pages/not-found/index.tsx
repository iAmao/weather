import React from 'react';
import {
	NotFoundMessage,
	NotFoundContainer,
} from './styled-components';
class NotFoundPage extends React.Component<NotFoundPageProps> {
	render() {
		return (
			<NotFoundContainer>
				<NotFoundMessage>
					404!
					<small>Page Not Found!</small>
				</NotFoundMessage>
			</NotFoundContainer>
		);
	}
}

export interface NotFoundPageProps {};

export default NotFoundPage;
