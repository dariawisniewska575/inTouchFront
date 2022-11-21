import { Pages } from 'src/common/enums/Pages';

export default interface CustomLinkProps {
    page: Pages;
    href?: string;
    children?: string;
}
