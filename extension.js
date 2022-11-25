/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

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
