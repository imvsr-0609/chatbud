import React from 'react';
import error from '../../assets/img/404.png';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	place-items: center;
	background: ${({ theme }) => theme.bg_color};
`;

const ErrorImage = styled.img`
	width: 80%;
	max-width: 800px;
	height: 80%;
	max-height: 800px;
	object-fit: contain;
`;

const ErrorPage = () => {
	return (
		<ErrorWrapper>
			<ErrorImage src={error} alt="404" />
		</ErrorWrapper>
	);
};

export default ErrorPage;
