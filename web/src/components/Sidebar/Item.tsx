import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  item: string
  icon: IconProp
  open: boolean
  link: string
}

export function Item(props: IProps) {
  return (
    <li className="rounded-sm mt-2">
      <a
        href={props.link}
        className="flex items-center p-2 space-x-3 rounded-md hover:bg-slate-600 duration-200"
      >
        <FontAwesomeIcon icon={props.icon} fontSize={24} />
        <span className={`${!props.open ? 'text-gray-100' : 'hidden'}`}>{props.item}</span>
      </a>
    </li>
  )
}
