"use strict";

const GETTEXT_DOMAIN = "my-indicator-extension";

const Clutter = imports.gi.Clutter;
const { GObject, St } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const GLib = imports.gi.GLib;

const _ = ExtensionUtils.gettext;

class Extension {
  constructor(uuid) {
    this._indicator = null;

    ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
  }

  enable() {
    this._indicator = new PanelMenu.Button(0.0);
    let label = new St.Label({
      text: "stockPrice",
      y_align: Clutter.ActorAlign.CENTER,
    });
    this._indicator.add_actor(label);
    this._indicator.connect("button-press-event", () => {
      GLib.spawn_command_line_async(
        "gnome-extensions prefs simplestocks@shreyas"
      );
    });
    Main.panel.addToStatusArea(
      `${Me.metadata.name} Indicator`,
      this._indicator
    );
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
  }
}

function init(meta) {
  return new Extension(meta.uuid);
}
