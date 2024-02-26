'use client'

import s from './MediaRowBlock.module.scss'
import cn from 'classnames'
import React, { useRef, useState } from 'react'
import { Image } from 'react-datocms'
import VideoPlayer from '../VideoPlayer'

export type LayoutProps = { data: MediaRowBlockRecord }

export default function MediaRowBlock({ data: { media } }: LayoutProps) {

	return (
		<section className={s.mediaRow}>
			{media.map((m, idx) =>
				m.responsiveImage ?
					<figure key={idx} className={cn(media.length > 1 && s.double)}>
						<Image data={m.responsiveImage} className={s.image} />
					</figure>
					: <VideoPlayer
						key={idx}
						data={m as FileField}
						className={cn(media.length > 1 && s.double)}
					/>
			)}
		</section>
	)
}