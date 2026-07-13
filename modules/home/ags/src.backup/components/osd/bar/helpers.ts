import { bind, Variable } from 'astal';
import { hook } from 'astal/gtk4';
import AstalWp from 'gi://AstalWp?version=0.1';
import LevelBar from 'src/components/shared/LevelBar';
import options from 'src/configuration';
import BrightnessService from 'src/services/system/brightness';

const wireplumber = AstalWp.get_default() as AstalWp.Wp;
const audioService = wireplumber.audio;

const brightnessService = BrightnessService.getInstance();

/**
 * Sets up the OSD bar for a LevelBar instance.
 *
 * This function hooks various services and settings to the LevelBar instance to update its value and class name
 * based on the brightness and audio services. It handles screen brightness, keyboard brightness, microphone volume,
 * microphone mute status, speaker volume, and speaker mute status.
 *
 * @param self The LevelBar instance to set up.
 */
export const setupOsdBar = (self: LevelBar): void => {
    hook(self, brightnessService, 'notify::screen', () => {
        self.remove_css_class('overflow');
        self.value = brightnessService.screen;
    });

    hook(self, brightnessService, 'notify::kbd', () => {
        self.remove_css_class('overflow');
        self.value = brightnessService.kbd;
    });

    const micVolumeBinding = Variable.derive([bind(audioService.defaultMicrophone, 'volume')], () => {
        if (audioService.defaultMicrophone.volume > 1) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        self.value =
            audioService.defaultMicrophone.volume <= 1
                ? audioService.defaultMicrophone.volume
                : audioService.defaultMicrophone.volume - 1;
    });

    const micMuteBinding = Variable.derive([bind(audioService.defaultMicrophone, 'mute')], () => {
        if (
            audioService.defaultMicrophone.volume > 1 &&
            (!options.theme.osd.muted_zero.get() || audioService.defaultMicrophone.mute === false)
        ) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        self.value =
            options.theme.osd.muted_zero.get() && audioService.defaultMicrophone.mute !== false
                ? 0
                : audioService.defaultMicrophone.volume <= 1
                  ? audioService.defaultMicrophone.volume
                  : audioService.defaultMicrophone.volume - 1;
    });

    const speakerVolumeBinding = Variable.derive([bind(audioService.defaultSpeaker, 'volume')], () => {
        if (audioService.defaultSpeaker.volume > 1) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        self.value =
            audioService.defaultSpeaker.volume <= 1
                ? audioService.defaultSpeaker.volume
                : audioService.defaultSpeaker.volume - 1;
    });

    const speakerMuteBinding = Variable.derive([bind(audioService.defaultSpeaker, 'mute')], () => {
        if (
            audioService.defaultSpeaker.volume > 1 &&
            (!options.theme.osd.muted_zero.get() || audioService.defaultSpeaker.mute === false)
        ) {
            self.add_css_class('overflow');
        } else {
            self.remove_css_class('overflow');
        }
        self.value =
            options.theme.osd.muted_zero.get() && audioService.defaultSpeaker.mute !== false
                ? 0
                : audioService.defaultSpeaker.volume <= 1
                  ? audioService.defaultSpeaker.volume
                  : audioService.defaultSpeaker.volume - 1;
    });

    self.connect('destroy', () => {
        micVolumeBinding.drop();
        micMuteBinding.drop();
        speakerVolumeBinding.drop();
        speakerMuteBinding.drop();
    });
};
