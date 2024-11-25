'use client'

import s from './MediaRowBlock.module.scss'
import cn from 'classnames'
import React, { useRef, useState } from 'react'
import { Image } from 'react-datocms'
import VideoPlayer from '../VideoPlayer'
import AudioPlayer from '../AudioPlayer'

export type LayoutProps = { data: MediaRowBlockRecord }

export default function MediaRowBlock({ data: { media } }: LayoutProps) {

	return (
		<section className={s.mediaRow}>
			{media.map((m, idx) =>
				m.responsiveImage ?
					<figure key={idx} className={cn(media.length > 1 && s.double)}>
						<Image data={m.responsiveImage} className={s.image} />
					</figure>
					: m.video ?
						<VideoPlayer
							key={idx}
							data={m as FileField}
							className={cn(media.length > 1 && s.double)}
						/>
						:
						m.url ?
							<AudioPlayer data={m as FileField} />
							: null
			)}
		</section>
	)
}