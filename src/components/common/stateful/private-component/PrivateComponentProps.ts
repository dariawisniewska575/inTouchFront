import { PropsWithChildren } from 'src/common/models/common/PropsWithChildren';

export interface PrivateComponentProps extends PropsWithChildren {
    styledParent?: boolean;
}
