import type { NavigationStackItem } from './SidebarNav';
import { SidebarNavLink } from './SidebarNavLink';
import { useIsDesktop } from './useIsDesktop';
import s from './SidebarNavGroup.module.css';

interface Props {
  item: NavigationStackItem;
  currentPath: string;
  isOpen: boolean;
  setOpenGroup: (name: string | null) => void;
  // El nombre del grupo que DEBERÍA estar abierto (porque contiene la pág. activa)
  activeGroupName: string | null;
}

export const SidebarNavGroup: React.FC<Props> = ({
  item,
  currentPath,
  isOpen,
  setOpenGroup,
  activeGroupName,
}) => {
  const { icon, name, tag, childrens = [] } = item;
  const isDesktop = useIsDesktop();
  const panelId = `group-panel-${name.toLowerCase().replace(/\s+/g, '-')}`;

  const handleMouseEnter = () => {
    if (isDesktop) {
      setOpenGroup(name);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      // Al salir, vuelve a abrir el grupo que esté activo, o cierra todos
      setOpenGroup(activeGroupName);
    }
  };

  const handleClick = () => {
    if (!isDesktop) {
      // Lógica de toggle: si ya está abierto, ciérralo. Si no, ábrelo.
      setOpenGroup(isOpen ? activeGroupName : name);
    }
  };

  // Función para comprobar si un hijo está activo
  const isChildCurrent = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  return (
    <div
      className={`${s.navGroup} ${isOpen ? s.isOpen : ''}`} // Aplicación de la clase .isOpen
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={s.navGroupTrigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleClick} // En desktop, este click no hace nada
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
        <svg
          className={s.navChevron}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <ul className={s.navGroupChildren} id={panelId} hidden={!isOpen}>
        {childrens.map((child) => (
          <li key={child.href}>
            <SidebarNavLink
              item={child}
              isCurrent={isChildCurrent(child.href)}
              isSubItem={true}
            />
          </li>
        ))}
      </ul>
    </div >
  );
};