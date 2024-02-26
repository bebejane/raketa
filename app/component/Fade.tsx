import s from './Fade.module.scss';

export type Props = {
  hide?: boolean
}

export default function Fade({ hide }: Props) {

  if (hide) return null
  return (
    <div className={s.fade}>
      <div className={s.gradient}></div>
      <div className={s.solid}></div>
    </div>
  )
}