import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'

import { EditorCore } from '../core'

export class ClientEditorCore implements EditorCore {
  private _editorJS: EditorJS

  constructor({ tools, ...config }: EditorConfig) {
    const extendTools = {
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },

      header: Header,
      list: List,
      // quote: {
      //   class: Quote,
      //   config: {
      //     quotePlaceholder: 'نقل قول خود را اینجا وارد کنید',
      //     captionPlaceholder: 'نام نویسنده یا منبع نقل قول خود را اینجا وارد کنید',
      //   },
      // },
      // embed: Embed,
      // linkTool: LinkTool,
      // table: Table,
      // warning: {
      //   class: Warning,
      //   config: {
      //     titlePlaceholder: 'عنوان',
      //     messagePlaceholder: 'پیام',
      //   },
      // },
      // raw: Raw,
      // marker: Marker,
      ...tools,
    }

    this._editorJS = new EditorJS({
      tools: extendTools,

      i18n: {
        direction: 'rtl',

        messages: {
          blockTunes: {
            search: {
              Search: 'فیلتر',
              Filter: 'فیلتر',
            },
            delete: {
              Delete: 'حذف',
              'Click to delete': 'برای حذف کلیک کنید',
            },
            moveUp: {
              'Move up': 'انتقال به بالا',
            },
            moveDown: {
              'Move down': 'انتقال به پایین',
            },
          },

          ui: {
            blockTunes: {
              toggler: {
                'Click to tune': ' تنظیمات بیشتر',
                'or drag to move': 'یا بکشید',
              },
            },

            inlineToolbar: {
              converter: {
                'Convert to': 'تبدیل به',
              },
            },

            toolbar: {
              toolbox: {
                Add: 'اضافه کردن',
              },
            },

            popover: {
              Filter: 'جستجو',
            },
          },
          toolNames: {
            Text: 'متن',
            Heading: 'عنوان',
            List: 'لیست',
            Link: 'لینک',
            Bold: 'ضخیم',
            Italic: 'کج',
            Marker: 'مارکر',
            Quote: 'نقل قول',
            Line: 'خط',
            Table: 'جدول',
            'Raw HTML': 'کد HTML',
            Warning: 'هشدار',
          },

          tools: {
            warning: {
              Title: 'هشدار',
              Message: 'این یک پیام هشدار است',
            },

            Link: 'لینک',

            table: {
              Heading: 'عنوان',
              'With headings': 'با سربرگ',
              'Without headings': 'بدون سربرگ',
              'Add row above': 'اضافه کردن ردیف بالا',
              'Add row below': 'اضافه کردن ردیف پایین',
              'Delete row': 'حذف ردیف',
              'Add column to left': 'اضافه کردن ستون چپ',
              'Add column to right': 'اضافه کردن ستون راست',
              'Delete column': 'حذف ستون',
            },

            stub: {
              'The block can not be displayed correctly.': 'این بلوک به درستی نمایش داده نمی‌شود.',
            },

            quote: {
              'Align Left': 'چپ چین',
              'Align right': 'راست چین',
              'Align Center': 'وسط چین',
              quotePlaceholder: 'نقل قول خود را اینجا وارد کنید',
            },

            header: {
              'Heading 1': 'عنوان ۱',
              'Heading 2': 'عنوان ۲',
              'Heading 3': 'عنوان ۳',
              'Heading 4': 'عنوان ۴',
              'Heading 5': 'عنوان ۵',
              'Heading 6': 'عنوان ۶',
            },

            list: {
              Ordered: 'لیست مرتب',
              Unordered: 'لیست خطی',
            },
          },
        },
      },
      ...config,
    })
  }

  public get dangerouslyLowLevelInstance() {
    return this._editorJS
  }

  public async clear() {
    await this._editorJS.clear()
  }

  public async save() {
    return this._editorJS.save()
  }

  public async destroy() {
    await this._editorJS.isReady
    this._editorJS.destroy()
  }

  public async render(data: OutputData) {
    await this._editorJS.render(data)
  }
}
