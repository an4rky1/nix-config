import GObject, { GLib } from 'astal/gobject';
import { monitorFile } from 'astal/file';
import AstalHyprland from '../niri';
import options from '../../configuration';
import { SystemUtilities } from '../../core/system/SystemUtilities';
import { AwwwDaemon } from './SwwwDaemon';

const hyprlandService = AstalHyprland.get_default();
const WP = `${GLib.get_home_dir()}/.config/background`;

export class WallpaperService extends GObject.Object {
    static {
        GObject.registerClass({
            GTypeName: 'Wallpaper',
            Properties: {
                'wallpaper': GObject.ParamSpec.jsobject('wallpaper', '', '', GObject.ParamFlags.READABLE),
            },
            Signals: {
                'changed': { param_types: [GObject.TYPE_BOOLEAN] },
            },
        }, this);
    }

    declare public wallpaper: string;

    private static _instance: WallpaperService;
    private _blockMonitor = false;
    private _daemon = new AwwwDaemon();

    constructor() {
        super();

        this.wallpaper = WP;

        monitorFile(WP, () => {
            if (!this._blockMonitor && this._daemon.isRunning) {
                this._wallpaper();
            }
        });

        options.wallpaper.enable.subscribe(async (isWallpaperEnabled) => {
            if (isWallpaperEnabled) {
                const started = await this._daemon.start();
                if (started) {
                    this._wallpaper();
                }
            } else {
                await this._daemon.stop();
            }
        });

        if (options.wallpaper.enable.get()) {
            this._daemon.start().then((started) => {
                if (started) {
                    this._wallpaper();
                }
            });
        }
    }

    public static getInstance(): WallpaperService {
        if (this._instance === undefined) {
            this._instance = new WallpaperService();
        }

        return this._instance;
    }

    public setWallpaper(path: string): void {
        this._setWallpaper(path);
    }

    public isRunning(): boolean {
        return this._daemon.isRunning;
    }

    private _wallpaper(): void {
        if (!this._daemon.isRunning) {
            console.warn('Cannot set wallpaper: awww-daemon is not running');
            return;
        }

        try {
            const cursorPosition = hyprlandService.message('cursorpos');
            const transitionCmd = [
                'awww',
                'img',
                '--invert-y',
                '--transition-type',
                'grow',
                '--transition-duration',
                '1.5',
                '--transition-fps',
                '60',
                '--transition-pos',
                cursorPosition.replace(' ', ''),
                `"${WP}"`,
            ].join(' ');

            SystemUtilities.sh(transitionCmd)
                .then(() => {
                    this.notify('wallpaper');
                    this.emit('changed', true);
                })
                .catch((err) => {
                    console.error('Error setting wallpaper:', err);
                });
        } catch (err) {
            console.error('Error getting cursor position:', err);
        }
    }

    private async _setWallpaper(path: string): Promise<void> {
        this._blockMonitor = true;

        try {
            await SystemUtilities.sh(`cp "${path}" "${WP}"`);
            this._wallpaper();
        } catch (error) {
            console.error('Error setting wallpaper:', error);
        } finally {
            this._blockMonitor = false;
        }
    }
}
