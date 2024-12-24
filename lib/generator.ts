import JSZip from "jszip";
import FileSaver from "file-saver";
import { type PluginData } from "./types";

export async function generatePlugin(data: PluginData): Promise<void> {
  const zip = new JSZip();

  // Add main plugin file
  zip.file(
    `${data.info.slug}.php`,
    generatePluginFile(data.info.name, data.info.slug, data.info.description)
  );

  // Add includes directory
  const includes = zip.folder("includes");
  if (includes) {
    includes.file("class-plugin.php", generatePluginClass(data));
    
    if (data.customPostTypes.length > 0) {
      includes.file("custom-post-types.php", generateCustomPostTypes(data));
    }
    
    if (data.customTaxonomies.length > 0) {
      includes.file("custom-taxonomies.php", generateCustomTaxonomies(data));
    }
    
    if (data.restEndpoints.length > 0) {
      includes.file("rest-api.php", generateRestEndpoints(data));
    }
  }

  // Add admin directory
  const admin = zip.folder("admin");
  if (admin) {
    if (data.adminPages.length > 0) {
      admin.file("admin-pages.php", generateAdminPages(data));
    }
    
    if (data.settingsPage.fields.length > 0) {
      admin.file("settings-page.php", generateSettingsPage(data));
    }
  }

  // Add public directory
  const public_dir = zip.folder("public");
  if (public_dir) {
    if (data.shortcodes.length > 0) {
      public_dir.file("shortcodes.php", generateShortcodes(data));
    }
    
    if (data.widgets.length > 0) {
      public_dir.file("widgets.php", generateWidgets(data));
    }
  }

  // Generate the zip file
  const content = await zip.generateAsync({ type: "blob" });
  FileSaver.saveAs(content, `${data.info.slug}.zip`);
}

// Import all the generator functions from separate files
import {
  generatePluginFile,
  generatePluginClass,
  generateCustomPostTypes,
  generateCustomTaxonomies,
  generateRestEndpoints,
  generateAdminPages,
  generateSettingsPage,
  generateShortcodes,
  generateWidgets,
} from "./generators";