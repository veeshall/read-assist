# Docs Overlay Sidebar - Chrome Extension

A Chrome extension that adds a floating sidebar overlay to any webpage, allowing you to highlight text, add notes, and track your reading progress without modifying the original content.

## Features

- **📚 Floating Sidebar**: Click the 📚 button on any page to open a sidebar overlay
- **🖍️ Text Highlighting**: Highlight any text on the page with a single click
- **📝 Note Taking**: Add notes to your highlights or general notes for the page
- **✅ Progress Tracking**: Mark pages as read with checkboxes
- **💾 Local Storage**: All your highlights and notes are saved locally in your browser
- **🌐 Works Everywhere**: Works on any website - documentation, articles, blogs, etc.

## Installation

### Load as Unpacked Extension

1. **Download/Clone** this repository
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer mode** (toggle in top right)
4. **Click "Load unpacked"** and select the `chrome-extension` folder
5. **Visit any website** and click the 📚 button in the top-right corner

## How to Use

1. **Open any webpage** (documentation, articles, etc.)
2. **Click the 📚 button** in the top-right corner to open the sidebar
3. **Highlight text**: Select text on the page, then click "Highlight Selection" in the sidebar
4. **Add notes**: Type in the textarea and click "Save Note"
5. **Track progress**: Check "Mark page as read" to track your reading progress

## Files Structure

```
chrome-extension/
├── manifest.json      # Extension manifest (v3)
├── content.js         # Injects sidebar and handles page interactions
├── sidebar.html       # Sidebar UI
├── sidebar.css        # Sidebar styles
├── sidebar.js         # Sidebar logic (highlights, notes, storage)
└── background.js      # Background script (minimal)
```

## Privacy

- **No data sent to servers** - Everything is stored locally in your browser
- **No tracking** - The extension doesn't collect or transmit any data
- **Works offline** - All functionality works without internet connection

## Use Cases

- **Documentation Reading**: Track your progress through technical docs
- **Research**: Highlight and note important information while browsing
- **Study Sessions**: Mark sections as read and add study notes
- **Content Review**: Annotate articles and blog posts

## Development

To modify the extension:

1. Edit files in the `chrome-extension/` directory
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test changes on any webpage

## License

MIT License - Feel free to modify and distribute.

---

**Note**: This extension is designed to work alongside the original content without modifying it. Your highlights and notes are purely for your personal use and don't affect the underlying webpage. 