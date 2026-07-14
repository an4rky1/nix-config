import { bind } from 'astal';
import { Gtk } from 'astal/gtk4';
import WeatherService from '../../../../../../services/weather';
import { getHourlyWeatherIcon } from '../helpers';

const weatherService = WeatherService.getInstance();

export const HourlyIcon = ({ hoursFromNow }: HourlyIconProps): JSX.Element => {
    return (
        <box halign={Gtk.Align.CENTER}>
            <label
                className={'hourly-weather-icon txt-icon'}
                label={bind(weatherService.weatherData).as((weather) => {
                    const weatherIcon = getHourlyWeatherIcon(weather, hoursFromNow);
                    return weatherIcon;
                })}
                halign={Gtk.Align.CENTER}
            />
        </box>
    );
};

interface HourlyIconProps {
    hoursFromNow: number;
}
