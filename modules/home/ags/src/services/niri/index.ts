import GObject, { GLib } from 'astal/gobject';
import { execAsync, exec } from 'astal/process';

const POLL_INTERVAL = 500;

export class Client extends GObject.Object {
    static {
        GObject.registerClass({
            GTypeName: 'NiriClient',
            Properties: {
                'class': GObject.ParamSpec.jsobject('class', '', '', GObject.ParamFlags.READABLE),
                'title': GObject.ParamSpec.jsobject('title', '', '', GObject.ParamFlags.READABLE),
                'fullscreen': GObject.ParamSpec.jsobject('fullscreen', '', '', GObject.ParamFlags.READABLE),
            },
        }, this);
    }

    declare public class: string;
    declare public title: string;
    declare public fullscreen: boolean;

    public workspace: Workspace | null = null;
    public monitor: Monitor | null = null;

    constructor(data: { class: string; title: string }) {
        super();
        this.class = data.class || '';
        this.title = data.title || '';
        this.fullscreen = false;
    }
}

export class Monitor extends GObject.Object {
    static {
        GObject.registerClass({
            GTypeName: 'NiriMonitor',
            Properties: {
                'id': GObject.ParamSpec.jsobject('id', '', '', GObject.ParamFlags.READABLE),
                'name': GObject.ParamSpec.jsobject('name', '', '', GObject.ParamFlags.READABLE),
                'model': GObject.ParamSpec.jsobject('model', '', '', GObject.ParamFlags.READABLE),
                'width': GObject.ParamSpec.jsobject('width', '', '', GObject.ParamFlags.READABLE),
                'height': GObject.ParamSpec.jsobject('height', '', '', GObject.ParamFlags.READABLE),
                'scale': GObject.ParamSpec.jsobject('scale', '', '', GObject.ParamFlags.READABLE),
                'transform': GObject.ParamSpec.jsobject('transform', '', '', GObject.ParamFlags.READABLE),
            },
        }, this);
    }

    declare public id: number;
    declare public name: string;
    declare public model: string;
    declare public width: number;
    declare public height: number;
    declare public scale: number;
    declare public transform: number;

    public activeWorkspace: Workspace | null = null;

    constructor(data: {
        id: number;
        name: string;
        model?: string;
        width: number;
        height: number;
        scale: number;
        transform?: number;
    }) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.model = data.model || data.name;
        this.width = data.width || 1920;
        this.height = data.height || 1080;
        this.scale = data.scale || 1;
        this.transform = data.transform ?? 0;
    }

    get_name(): string {
        return this.name;
    }
}

export class Workspace extends GObject.Object {
    static {
        GObject.registerClass({
            GTypeName: 'NiriWorkspace',
            Properties: {
                'id': GObject.ParamSpec.jsobject('id', '', '', GObject.ParamFlags.READABLE),
                'name': GObject.ParamSpec.jsobject('name', '', '', GObject.ParamFlags.READABLE),
                'hasFullscreen': GObject.ParamSpec.jsobject('hasFullscreen', '', '', GObject.ParamFlags.READABLE),
            },
        }, this);
    }

    declare public id: number;
    declare public name: string;
    declare public hasFullscreen: boolean;

    public monitor: Monitor | null = null;
    private _clients: Client[] = [];

    constructor(idx: number, name?: string) {
        super();
        this.id = idx;
        this.name = name ?? `${idx}`;
        this.hasFullscreen = false;
    }

    get_clients(): Client[] {
        return this._clients;
    }

    set_clients(clients: Client[]): void {
        this._clients = clients;
    }
}

export class NiriService extends GObject.Object {
    static _instance: NiriService | null = null;

    private _workspaces: Workspace[] = [];
    private _monitors: Monitor[] = [];
    private _clients: Client[] = [];
    private _focusedWs: Workspace | null = null;
    private _focusedMon: Monitor | null = null;
    private _focusedCl: Client | null = null;

    get workspaces() { return this._workspaces; }
    get monitors() { return this._monitors; }
    get clients() { return this._clients; }
    get focusedWorkspace() { return this._focusedWs; }
    get focusedMonitor() { return this._focusedMon; }
    get focusedClient() { return this._focusedCl; }

    private _intervalId: number | null = null;
    private _prevMonitorCount = 0;
    private _initialized = false;

    static get_default(): NiriService {
        if (!NiriService._instance) {
            NiriService._instance = new NiriService();
        }
        return NiriService._instance;
    }

    private constructor() {
        super();
        this._poll();
        this._intervalId = GLib.timeout_add(
            GLib.PRIORITY_DEFAULT,
            POLL_INTERVAL,
            () => {
                this._poll();
                return GLib.SOURCE_CONTINUE;
            },
        );
    }

    get_workspaces(): Workspace[] {
        return this._workspaces;
    }

    get_workspace(id: number): Workspace | undefined {
        return this._workspaces.find(ws => ws.id === id);
    }

    get_monitors(): Monitor[] {
        return this._monitors;
    }

    get_monitor(id: number): Monitor | undefined {
        return this._monitors.find(m => m.id === id);
    }

    get_clients(): Client[] {
        return this._clients;
    }

    dispatch(action: string, arg: string): void {
        const niriActions: Record<string, string> = {
            workspace: `focus-workspace ${arg}`,
            movetoworkspace: `move-window-to-workspace ${arg}`,
            togglespecialworkspace: 'focus-workspace special',
        };
        const niriAction = niriActions[action];
        if (niriAction) {
            execAsync(`niri msg action ${niriAction}`).catch(() => {});
        }
    }

    message(command: string): string {
        switch (command) {
            case 'j/workspacerules':
                return '[]';
            case 'cursorpos':
                return '960 540';
            case 'submap':
                return 'default';
            default:
                if (command.startsWith('keyword ')) return '';
                if (command.startsWith('j/devices')) {
                    return JSON.stringify({
                        mice: [],
                        keyboards: [],
                        tablets: [],
                        touch: [],
                        switches: [],
                    });
                }
                return '';
        }
    }

    private _poll(): void {
        try {
            const wsOut = exec('niri msg -j workspaces');
            const winOut = exec('niri msg -j windows');

            const workspacesData: any[] = JSON.parse(wsOut);
            const windowsData: any[] = JSON.parse(winOut);

            const connectorSet = new Set<string>();
            workspacesData.forEach(ws => {
                if (ws.outputs) {
                    ws.outputs.forEach((o: string) => connectorSet.add(o));
                }
            });

            const monitors: Monitor[] = [];
            let monIdx = 0;
            connectorSet.forEach(conn => {
                monitors.push(
                    new Monitor({
                        id: monIdx,
                        name: conn,
                        width: 1920,
                        height: 1080,
                        scale: 1,
                    }),
                );
                monIdx++;
            });
            if (monitors.length === 0) {
                monitors.push(
                    new Monitor({
                        id: 0,
                        name: 'eDP-1',
                        width: 1920,
                        height: 1080,
                        scale: 1,
                    }),
                );
            }

            const workspaces: Workspace[] = workspacesData.map((wsData: any) => {
                const ws = new Workspace(wsData.idx, wsData.name || `${wsData.idx}`);
                if (wsData.outputs && wsData.outputs.length > 0) {
                    const mon = monitors.find(m => m.name === wsData.outputs[0]);
                    ws.monitor = mon || null;
                } else if (monitors.length > 0) {
                    ws.monitor = monitors[0];
                }
                return ws;
            });

            const clients: Client[] = windowsData.map((win: any) => {
                const client = new Client({
                    class: win.app_id || '',
                    title: win.title || '',
                });
                const ws = workspaces.find(w => w.id === win.workspace_idx);
                client.workspace = ws || null;
                client.monitor = ws?.monitor || null;
                client.fullscreen = win.is_fullscreen ?? false;
                return client;
            });

            const focusedWsData = workspacesData.find((ws: any) => ws.is_focused);
            const focusedWsIdx = focusedWsData ? focusedWsData.idx : -1;

            workspaces.forEach(ws => {
                ws.set_clients(clients.filter(c => c.workspace?.id === ws.id));
                ws.hasFullscreen = clients.some(c => c.workspace?.id === ws.id && c.fullscreen);
            });

            monitors.forEach(mon => {
                const activeWs = workspaces.find(ws => ws.monitor?.name === mon.name && ws.id === focusedWsIdx);
                mon.activeWorkspace = activeWs || null;
            });

            const focusedWs = focusedWsData
                ? workspaces.find(w => w.id === focusedWsData.idx) || null
                : null;

            const focusedMon = focusedWs?.monitor || monitors[0] || null;

            const focusedWinData = windowsData.find((w: any) => w.is_focused);
            const focusedCl = focusedWinData
                ? clients.find(c => c.class === focusedWinData.app_id && c.title === focusedWinData.title) ||
                  null
                : null;

            const currentMonitorCount = monitors.length;
            if (this._initialized && currentMonitorCount !== this._prevMonitorCount) {
                if (currentMonitorCount > this._prevMonitorCount) {
                    this.emit('monitor-added');
                } else {
                    this.emit('monitor-removed');
                }
            }
            this._prevMonitorCount = currentMonitorCount;

            this._workspaces = workspaces;
            this._monitors = monitors;
            this._clients = clients;
            this._focusedWs = focusedWs;
            this._focusedMon = focusedMon;
            this._focusedCl = focusedCl;
            this._initialized = true;

            this.notify('workspaces');
            this.notify('monitors');
            this.notify('clients');
            this.notify('focused-workspace');
            this.notify('focused-monitor');
            this.notify('focused-client');

            this.emit('config-reloaded');
            this.emit('client-added');
            this.emit('client-moved');
        } catch (error) {
            if (this._initialized) {
                console.error('Niri poll error:', error);
            }
        }
    }

    static {
        GObject.registerClass({
            GTypeName: 'NiriService',
            Properties: {
                'workspaces': GObject.ParamSpec.jsobject('workspaces', '', '', GObject.ParamFlags.READABLE),
                'monitors': GObject.ParamSpec.jsobject('monitors', '', '', GObject.ParamFlags.READABLE),
                'clients': GObject.ParamSpec.jsobject('clients', '', '', GObject.ParamFlags.READABLE),
                'focused-workspace': GObject.ParamSpec.jsobject('focused-workspace', '', '', GObject.ParamFlags.READABLE),
                'focused-monitor': GObject.ParamSpec.jsobject('focused-monitor', '', '', GObject.ParamFlags.READABLE),
                'focused-client': GObject.ParamSpec.jsobject('focused-client', '', '', GObject.ParamFlags.READABLE),
            },
            Signals: {
                'config-reloaded': {},
                'monitor-added': {},
                'monitor-removed': {},
                'client-added': {},
                'client-moved': {},
                'client-removed': {},
                'submap': {},
            },
        }, this);
    }
}

export function get_default(): NiriService {
    return NiriService.get_default();
}

export default NiriService;
