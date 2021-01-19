import banana from '../assets/svg/banana.svg';
import apple from '../assets/svg/apple.svg';
import mango from '../assets/svg/mango.svg';
import orange from '../assets/svg/orange.svg';
import noicon from '../assets/svg/noicon.svg';

const getIcon = (productName: string): string => {
  switch (productName) {
    case 'Banana':
      return banana;
    case 'Apple':
      return apple;
    case 'Orange':
      return orange;
    case 'Mango':
      return mango;
    default:
      return noicon;
  }
};

export default getIcon;
