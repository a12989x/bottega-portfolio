import {
    faTrash,
    faSignOutAlt,
    faEdit,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
    return library.add(faTrash, faSignOutAlt, faEdit, faPlusCircle);
};

export default Icons;
