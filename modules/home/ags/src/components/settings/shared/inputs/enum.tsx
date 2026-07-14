import { onPrimaryClick } from '../../../../lib/shared/eventHandlers';

export const EnumInputter = <T extends string | number | boolean | object>({
    opt,
    values,
}: EnumInputterProps<T>): JSX.Element => {
    const step = (dir: 1 | -1): void => {
        const indexOfCurrentValue = values.findIndex((index) => index === opt.get());

        opt.set(
            dir > 0
                ? indexOfCurrentValue + dir > values.length - 1
                    ? values[0]
                    : values[indexOfCurrentValue + dir]
                : indexOfCurrentValue + dir < 0
                  ? values[values.length - 1]
                  : values[indexOfCurrentValue + dir],
        );
    };
    return (
        <box className={'enum-setter'}>
            <label label={bind(opt).as((option) => `${option}`)} />
            <button
                setup={(self) => {
                    onPrimaryClick(self, (_, event) => {
                        if (isPrimaryClick(event)) {
                            step(-1);
                        }
                    });
                }}
            >
                <Icon icon={icons.ui.arrow.left} />
            </button>
            <button
                setup={(self) => {
                    onPrimaryClick(self, (_, event) => {
                        if (isPrimaryClick(event)) {
                            step(+1);
                        }
                    });
                }}
            >
                <Icon icon={icons.ui.arrow.right} />
            </button>
        </box>
    );
};

interface EnumInputterProps<T> {
    opt: Opt<T>;
    values: T[];
}
