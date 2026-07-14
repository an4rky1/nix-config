import { EventBox } from 'astal/gtk4/widget';
import Variable from 'astal/variable';

type GlobalEventBoxes = {
    [key: string]: EventBox;
};

export const globalEventBoxes: Variable<GlobalEventBoxes> = Variable({});
