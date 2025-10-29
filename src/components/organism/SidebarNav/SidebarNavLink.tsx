import type { NavigationLink } from './SidebarNav';
import s from './SidebarNavLink.module.css';

interface Props {
  item: NavigationLink;
  isCurrent: boolean;
  isSubItem?: boolean;
}

export const SidebarNavLink: React.FC<Props> = ({
  item,
  isCurrent,
  isSubItem = false,
}) => {
  const { href, icon, name, tag } = item;

  const classNames = [
    s.sidebarNavLink,
    isCurrent ? s.isCurrent : '',
    isSubItem ? s.isSubItem : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      className={classNames}
      aria-current={isCurrent ? 'page' : undefined}
    >
      <img
        src={icon}
        alt=""
        className={s.navIcon}
        width="20"
        height="20"
        aria-hidden="true"
      />
      <span className={s.navName}>{name}</span>
      {tag && <span className={s.navTag}>{tag}</span>}
    </a>
  );
};