import React,{useState,useEffect,useLayoutEffect} from 'react';


function useContextMenu({ menu, targets = [] }) {

  const targetElements = React.useRef(null);
  const [x,setX] = useState(0)
  const [y,setY] = useState(0)
  const [state, setState] = React.useState(() => {

    if (!targets.length) {
      return {
        document: {
          id: 'document',
          target: { current: document },
          isOpen: false,
        },
      };
    }
    return targets.reduce(
      (obj, { id, target }) => ({
        ...obj,
        [id]: {
          id,
          isOpen: false,
          target,
        },
      }),
      {}
    );
  });


  useEffect(() => {
    // if no target is passed set targetElements to document
    // we assume they want it to show up anywhere right click happens
    if (!targets.length) {
      targetElements.current = [
        { id: 'document', target: { current: document } },
      ];
    } else {
      targetElements.current = targets;
    }
  }, [targets]);

  useLayoutEffect(() => {
    const anyMenuOpen = Object.values(state).some(({ isOpen }) => isOpen);
    const target = Object.values(state).find(({ isOpen }) => isOpen);

    const isClickOutside = (e) => {
      if (target && menu?.current && menu.current.contains(e.target)) {
        setTimeout(
          () =>
            setState(prev => ({
              ...prev,
              [target.id]: {
                ...target,
                isOpen: false,
              },
            })),
          200
        );
        return;
      }
      if (target && anyMenuOpen && !menu?.current?.contains(e.target)) {
        setState(prev => ({
          ...prev,
          [target.id]: {
            ...target,
            isOpen: false,
          },
        }));
        return;
      }
    };

    const handleContextClick = (e) => {
        e.pageX + 50 > window.innerWidth ? setX(`${window.innerWidth -180}px`) : setX(e.pageX)
        e.pageY + 200 > window.innerHeight ? setY(`${window.innerHeight -230}px`) : setY(e.pageY)

      const contextContainerClicked = targetElements?.current?.find(el =>
        el?.target?.current?.contains(e.target)
      );
      if (anyMenuOpen) {
        e.preventDefault();
        const openContext = Object.values(state).find(({ isOpen }) => isOpen);

        if (openContext && contextContainerClicked) {
          setState(prev => ({
            ...prev,
            [openContext.id]: {
              ...openContext,
              isOpen: false,
            },
            [contextContainerClicked.id]: {
              ...contextContainerClicked,
              isOpen: true,
            },
          }));
          return;
        }
      }
      if (!anyMenuOpen && contextContainerClicked) {
        e.preventDefault();
        setState(prev => ({
          ...prev,
          [contextContainerClicked.id]: {
            ...contextContainerClicked,
            isOpen: true,
          },
        }));

        if (!menu.current) return;

        // menu.current.style.width = x
        // setX(`${window.innerWidth -180}px`)
        // setY(`${window.innerHeight -230}px`)
        // e.pageX + 50 > window.innerWidth ? setX(`${window.innerWidth -180}px`) : setX(e.pageX)
        // e.pageY + 200 > window.innerHeight ? setY(`${window.innerHeight -230}px`) : setY(e.pageY)
        // menu.current.style.height = y
        // menu.current.style.top = `${e.clientY}px`;
        // menu.current.style.left = `${e.clientX}px`;
      }
    };


    window.addEventListener('contextmenu', handleContextClick);
    // no sense is having mousedown listener if menu is not open
    if (anyMenuOpen) {
      window.addEventListener('mousedown', isClickOutside);
    }
    return () => {
      window.removeEventListener('contextmenu', handleContextClick);
      window.removeEventListener('mousedown', isClickOutside);
    };
  }, [menu, targets, state]);


  return {...state,x,y};
}

export default useContextMenu;