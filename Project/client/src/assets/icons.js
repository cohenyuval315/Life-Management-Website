import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faFolder,faFolderOpen,faFile, faChevronRight,faAdd, faMagnifyingGlass, faAtom, faBars, faTimes, faChartColumn, faPen, faCalendar, faBookOpen, faChessBoard, faHome, faList, faPersonRunning, faDice,faGear,faGears, faSave, faCircle, faClose } from '@fortawesome/free-solid-svg-icons';

const GetIcon = (icon) => {
  return (
    <>
      <FontAwesomeIcon icon={icon} />
    </>
  );
};

const Icons = {
  ChevronDown: GetIcon(faChevronDown),
  ChevronRight: GetIcon(faChevronRight),
  MagnifyingGlass: GetIcon(faMagnifyingGlass),
  Atom: GetIcon(faAtom),
  Bars: GetIcon(faBars),
  Xmark: GetIcon(faTimes),
  BarChart: GetIcon(faChartColumn),
  Pen: GetIcon(faPen),
  Calendar: GetIcon(faCalendar),
  BookOpen: GetIcon(faBookOpen),
  Dashboard: GetIcon(faChessBoard),
  Home: GetIcon(faHome),
  List: GetIcon(faList),
  PersonRunning: GetIcon(faPersonRunning),
  Gear: GetIcon(faGear),
  Gears: GetIcon(faGears),
  Dice: GetIcon(faDice),
  Add: GetIcon(faAdd),
  Save: GetIcon(faSave),
  faCircle:GetIcon(faCircle),
  Close:GetIcon(faClose),
  Folder:GetIcon(faFolder),
  FolderOpen:GetIcon(faFolderOpen),
  Description:GetIcon(faFile),
};

export default Icons;
