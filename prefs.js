"use strict";

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {}

function fillPreferencesWindow(window) {
  // Use the same GSettings schema as in `extension.js`
  const settings = ExtensionUtils.getSettings(
    "org.gnome.shell.extensions.simplestocks"
  );

  // Create a preferences page and group
  const page = new Adw.PreferencesPage();
  const group = new Adw.PreferencesGroup();
  page.add(group);

  // Create a new preferences row
  const row = new Adw.ActionRow({ title: "Country" });
  group.add(row);

  const comboBox = new Gtk.ComboBoxText();

  const countries = ["Us", "India"];

  countries.map((item, index) => {
    comboBox.append(`${index}`, item);
  });

//  const selectedCountry = settings.get_value(country)

    comboBox.connect('changed',()=>{
        log(comboBox.get_active_text())
    })

  // // Create the switch and bind its value to the `show-indicator` key
  // const toggle = new Gtk.Switch({
  //   active: settings.get_boolean("example"),
  //   valign: Gtk.Align.CENTER,
  // });
  // settings.bind("example", toggle, "active", Gio.SettingsBindFlags.DEFAULT);

  // Add the switch to the row
  row.add_suffix(comboBox);
  row.activatable_widget = comboBox;

  // Add our page to the window
  window.add(page);
}
