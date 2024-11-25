'use client'

import styles from './AudioPlayer.module.scss'
import cn from 'classnames'
import { useRef, useCallback } from 'react'

export type AudioPlayerProps = { data: FileField, className?: string }

export default function AudioPlayer({ data, className }: AudioPlayerProps) {

	const audioRef = useRef<HTMLVideoElement | null>(null);

	const setRefs = useCallback((node) => {
		audioRef.current = node;
	}, []);

	return (

		<audio
			className={cn(styles.audio, className)}
			src={data.url}
			ref={setRefs}
			controls={true}
			autoPlay={false}
		/>
	)
}