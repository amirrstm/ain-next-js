import EditorJS, { type EditorConfig, type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'

import type { EditorCore } from '../core'

export class ClientEditorCore implements EditorCore {
  private _editorJS: EditorJS

  constructor({ tools, locale, ...config }: EditorConfig & { locale?: string }) {
    const extendTools = {
      header: Header,
      link: LinkTool,
      linkTool: LinkTool,
      list: List,
      paragraph: {
        class: Paragraph,
        inlineToolbar: true
      },
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
      ...tools
    }

    this._editorJS = new EditorJS({
      i18n:
        locale !== 'fa'
          ? undefined
          : {
              direction: 'rtl',

              messages: {
                blockTunes: {
                  delete: {
                    'Click to delete': 'برای حذف کلیک کنید',
                    Delete: 'حذف'
                  },
                  moveDown: {
                    'Move down': 'انتقال به پایین'
                  },
                  moveUp: {
                    'Move up': 'انتقال به بالا'
                  },
                  search: {
                    Filter: 'فیلتر',
                    Search: 'فیلتر'
                  }
                },
                toolNames: {
                  Bold: 'ضخیم',
                  Heading: 'عنوان',
                  Italic: 'کج',
                  Line: 'خط',
                  Link: 'لینک',
                  List: 'لیست',
                  Marker: 'مارکر',
                  Quote: 'نقل قول',
                  'Raw HTML': 'کد HTML',
                  Table: 'جدول',
                  Text: 'متن',
                  Warning: 'هشدار'
                },

                tools: {
                  header: {
                    'Heading 1': 'عنوان ۱',
                    'Heading 2': 'عنوان ۲',
                    'Heading 3': 'عنوان ۳',
                    'Heading 4': 'عنوان ۴',
                    'Heading 5': 'عنوان ۵',
                    'Heading 6': 'عنوان ۶'
                  },

                  Link: 'لینک',

                  list: {
                    Ordered: 'لیست مرتب',
                    Unordered: 'لیست خطی'
                  },

                  quote: {
                    'Align Center': 'وسط چین',
                    'Align Left': 'چپ چین',
                    'Align right': 'راست چین',
                    quotePlaceholder: 'نقل قول خود را اینجا وارد کنید'
                  },

                  stub: {
                    'The block can not be displayed correctly.': 'این بلوک به درستی نمایش داده نمی‌شود.'
                  },

                  table: {
                    'Add column to left': 'اضافه کردن ستون چپ',
                    'Add column to right': 'اضافه کردن ستون راست',
                    'Add row above': 'اضافه کردن ردیف بالا',
                    'Add row below': 'اضافه کردن ردیف پایین',
                    'Delete column': 'حذف ستون',
                    'Delete row': 'حذف ردیف',
                    Heading: 'عنوان',
                    'With headings': 'با سربرگ',
                    'Without headings': 'بدون سربرگ'
                  },
                  warning: {
                    Message: 'این یک پیام هشدار است',
                    Title: 'هشدار'
                  }
                },

                ui: {
                  blockTunes: {
                    toggler: {
                      'Click to tune': ' تنظیمات بیشتر',
                      'or drag to move': 'یا بکشید'
                    }
                  },

                  inlineToolbar: {
                    converter: {
                      'Convert to': 'تبدیل به'
                    }
                  },

                  popover: {
                    Filter: 'جستجو'
                  },

                  toolbar: {
                    toolbox: {
                      Add: 'اضافه کردن'
                    }
                  }
                }
              }
            },
      tools: extendTools,
      ...config
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
