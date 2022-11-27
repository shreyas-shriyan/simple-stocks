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

  const selectedCountry = settings.get_int("country");

  countries.map((item, index) => {
    comboBox.append(`${index}`, item);
  });

  comboBox.set_active(selectedCountry);

  comboBox.connect("changed", () => {
    const selectedValue = comboBox.get_active();
    settings.set_int("country", selectedValue);
  });

  // Add the switch to the row
  row.add_suffix(comboBox);
  row.activatable_widget = comboBox;

  // search row

  const searchGroup = new Adw.PreferencesGroup();
  page.add(searchGroup);

  // search bar
  const searchEntry = new Gtk.SearchEntry();

  searchGroup.add(searchEntry);

  // Add our page to the window
  window.add(page);
}
