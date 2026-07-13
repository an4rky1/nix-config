import { bind, Variable } from 'astal';
import { Widget, hook } from 'astal/gtk4';
import AstalWp from 'gi://AstalWp?version=0.1';
import options from 'src/configuration';
import BrightnessService from 'src/services/system/brightness';

const wireplumber = AstalWp.get_default() as AstalWp.Wp;
const audioService = wireplumber.audio;
const brightnessService = BrightnessService.getInstance();

/**
 * Sets up the OSD label for a given widget.
 *
 * This function hooks various services and settings to the widget to update its label based on the brightness and audio services.
 * It handles screen brightness, keyboard brightness, microphone volume, microphone mute status, speaker volume, and speaker mute status.
 *
 * @param self The Widget.Label instance to set up.
 */
export const setupOsdLabel = (self: Widget.Label): void => {
    hook(self, brightnessService, 'notify::screen', () => {
        self.remove_css_class('overflow');
        self.label = `${Math.round(brightnessService.screen * 100)}`;
    });

    hook(self, brightnessService, 'notify::kbd', () => {
        self.remove_css_class('overflow');
        self.label = `${Math.round(brightnessService.kbd * 100)}`;
    });

    const micVolumeBinding = Variable.derive([bind(audioService.defaultMicrophone, 'volume')], () => {
        if (audioService.defaultMicrophone.volume > 1) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        self.label = `${Math.round(audioService.defaultMicrophone.volume * 100)}`;
    });

    const micMuteBinding = Variable.derive([bind(audioService.defaultMicrophone, 'mute')], () => {
        if (
            audioService.defaultMicrophone.volume > 1 &&
            (!options.theme.osd.muted_zero.value || audioService.defaultMicrophone.mute === false)
        ) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        const inputVolume =
            options.theme.osd.muted_zero.value && audioService.defaultMicrophone.mute !== false
                ? 0
                : Math.round(audioService.defaultMicrophone.volume * 100);
        self.label = `${inputVolume}`;
    });

    const speakerVolumeBinding = Variable.derive([bind(audioService.defaultSpeaker, 'volume')], () => {
        if (audioService.defaultSpeaker.volume > 1) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        self.label = `${Math.round(audioService.defaultSpeaker.volume * 100)}`;
    });

    const speakerMuteBinding = Variable.derive([bind(audioService.defaultSpeaker, 'mute')], () => {
        if (
            audioService.defaultSpeaker.volume > 1 &&
            (!options.theme.osd.muted_zero.value || audioService.defaultSpeaker.mute === false)
        ) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        const speakerVolume =
            options.theme.osd.muted_zero.value && audioService.defaultSpeaker.mute !== false
                ? 0
                : Math.round(audioService.defaultSpeaker.volume * 100);
        self.label = `${speakerVolume}`;
    });

    self.connect('destroy', () => {
        micVolumeBinding.drop();
        micMuteBinding.drop();
        speakerVolumeBinding.drop();
        speakerMuteBinding.drop();
    });
};
