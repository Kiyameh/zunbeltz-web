import { useState, useMemo, useEffect } from 'react';
import { SidebarNavLink } from './SidebarNavLink';
import { SidebarNavGroup } from './SidebarNavGroup';
import s from './SidebarNav.module.css';

export interface NavigationLink {
  icon: string;
  name: string;
  href: string;
  tag?: string;
}
export interface NavigationStackItem extends NavigationLink {
  childrens?: NavigationLink[];
}
export type NavigationStack = NavigationStackItem[];

interface Props {
  navigation: NavigationStack;
  currentPath: string;
}

const isCurrent = (href: string, currentPath: string): boolean => {
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(href + '/');
};

export const SidebarNav = ({ navigation, currentPath }: Props) => {

  // 1. Encontrar el grupo activo basado en la URL
  const activeGroupName = useMemo(() => {
    const activeGroup = navigation.find((item) =>
      item.childrens?.some((child) => isCurrent(child.href, currentPath))
    );
    return activeGroup ? activeGroup.name : null;
  }, [navigation, currentPath]);

  // 2. Estado para el grupo abierto (hover/click)
  const [openGroup, setOpenGroup] = useState<string | null>(activeGroupName);

  // 3. Sincronizar el estado si la ruta cambia
  useEffect(() => {
    setOpenGroup(activeGroupName);
  }, [activeGroupName]);

  return (
    <nav className={s.sidebarNavContainer} aria-label="Navegación principal">
      <ul className={s.sidebarNavList}>
        {navigation.map((item) => (
          <li key={item.name} className={s.sidebarNavItem}>
            {item.childrens && item.childrens.length > 0 ? (
              <SidebarNavGroup
                item={item}
                currentPath={currentPath}
                isOpen={openGroup === item.name} // Pasa el estado
                setOpenGroup={setOpenGroup} // Pasa el "setter"
                activeGroupName={activeGroupName} // Pasa el grupo activo real
              />
            ) : (
              <SidebarNavLink
                item={item}
                isCurrent={isCurrent(item.href, currentPath)}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};