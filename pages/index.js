import React, { useState } from 'react';
import { createClient } from 'contentful';
import Head from 'next/head';
import Testimonial from '../components/Testimonial';
import Promo from '../components/Promo';
import { Splide, SplideSlide } from '@splidejs/react-splide';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	});

	const promo = await client.getEntries({
		content_type: 'promo',
	});
	const testimonial = await client.getEntries({ content_type: 'testimonial' });

	return {
		props: {
			testimonials: testimonial.items,
			promo: promo.items,
		},
		revalidate: 1,
	};
}

export default function homePage({ testimonials, promo }) {
	return (
		<>
			{/* <Head>
				<title>Next Salon | Home</title>
			</Head> */}

			<div className='home-page'>
				{promo.map((promo) => (
					<Promo key={promo.sys.id} promo={promo} />
				))}
				<section className='grid testimonials'>
					<div className='wrapper wrapper--sec-header'>
						<div className='section-header'>
							<h2 className='section-header__title section-header__title--script'>
								Client Testimonials
							</h2>
							<p className='section-header__subtitle'>
								What our clients say about us.
							</p>
						</div>
					</div>

					<div className='wrapper wrapper--testimonials'>
						<Splide
							options={{
								type: 'loop',
								gap: '10rem',
								arrows: false,
								autoplay: true,
								width: '75rem',
								pagination: false,
								autoHeight: true,
								perMove: '1',
								perPage: '1',
								breakpoints: {
									370: {
										// perPage: 1,
										width: '28rem',
									},
									500: {
										// perPage: 1,
										width: '32rem',
									},
									850: {
										// perPage: 1,
										width: '50rem',
									},
									// 1200: {
									//   perPage: 1,
									//   width: "70rem",
									// },
								},
							}}>
							{testimonials.map((testimonial) => (
								<Testimonial
									key={testimonial.sys.id}
									testimonial={testimonial}
								/>
							))}
						</Splide>
					</div>
				</section>
			</div>
		</>
	);
}
