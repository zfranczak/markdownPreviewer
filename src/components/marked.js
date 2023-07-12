/**
 * marked v5.1.1 - a markdown parser
 * Copyright (c) 2011-2023, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(
        ((e =
          'undefined' != typeof globalThis ? globalThis : e || self).marked =
          {})
      );
})(this, function (r) {
  'use strict';
  function i(e, t) {
    for (var u = 0; u < t.length; u++) {
      var n = t[u];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(
          e,
          (function (e) {
            e = (function (e, t) {
              if ('object' != typeof e || null === e) return e;
              var u = e[Symbol.toPrimitive];
              if (void 0 === u) return ('string' === t ? String : Number)(e);
              u = u.call(e, t || 'default');
              if ('object' != typeof u) return u;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              );
            })(e, 'string');
            return 'symbol' == typeof e ? e : String(e);
          })(n.key),
          n
        );
    }
  }
  function g() {
    return (g = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var u,
              n = arguments[t];
            for (u in n)
              Object.prototype.hasOwnProperty.call(n, u) && (e[u] = n[u]);
          }
          return e;
        }).apply(this, arguments);
  }
  function s(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var u = 0, n = new Array(t); u < t; u++) n[u] = e[u];
    return n;
  }
  function c(e, t) {
    var u,
      n =
        ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
    if (n) return (n = n.call(e)).next.bind(n);
    if (
      Array.isArray(e) ||
      (n = (function (e, t) {
        var u;
        if (e)
          return 'string' == typeof e
            ? s(e, t)
            : 'Map' ===
                (u =
                  'Object' ===
                    (u = Object.prototype.toString.call(e).slice(8, -1)) &&
                  e.constructor
                    ? e.constructor.name
                    : u) || 'Set' === u
            ? Array.from(e)
            : 'Arguments' === u ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)
            ? s(e, t)
            : void 0;
      })(e)) ||
      (t && e && 'number' == typeof e.length)
    )
      return (
        n && (e = n),
        (u = 0),
        function () {
          return u >= e.length ? { done: !0 } : { done: !1, value: e[u++] };
        }
      );
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }
  var t = 0;
  function e(e) {
    return '__private_' + t++ + '_' + e;
  }
  function F(e, t) {
    if (Object.prototype.hasOwnProperty.call(e, t)) return e;
    throw new TypeError('attempted to use private field on non-instance');
  }
  function u() {
    return {
      async: !1,
      baseUrl: null,
      breaks: !1,
      extensions: null,
      gfm: !0,
      headerIds: !0,
      headerPrefix: '',
      highlight: null,
      hooks: null,
      langPrefix: 'language-',
      mangle: !0,
      pedantic: !1,
      renderer: null,
      sanitize: !1,
      sanitizer: null,
      silent: !1,
      smartypants: !1,
      tokenizer: null,
      walkTokens: null,
      xhtml: !1,
    };
  }
  function n(e) {
    r.defaults = e;
  }
  r.defaults = u();
  function a(e) {
    return j[e];
  }
  var o = /[&<>"']/,
    P = new RegExp(o.source, 'g'),
    l = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    O = new RegExp(l.source, 'g'),
    j = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function D(e, t) {
    if (t) {
      if (o.test(e)) return e.replace(P, a);
    } else if (l.test(e)) return e.replace(O, a);
    return e;
  }
  var Z = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
  function x(e) {
    return e.replace(Z, function (e, t) {
      return 'colon' === (t = t.toLowerCase())
        ? ':'
        : '#' === t.charAt(0)
        ? 'x' === t.charAt(1)
          ? String.fromCharCode(parseInt(t.substring(2), 16))
          : String.fromCharCode(+t.substring(1))
        : '';
    });
  }
  var q = /(^|[^\[])\^/g;
  function p(u, e) {
    (u = 'string' == typeof u ? u : u.source), (e = e || '');
    var n = {
      replace: function (e, t) {
        return (
          (t = (t = t.source || t).replace(q, '$1')), (u = u.replace(e, t)), n
        );
      },
      getRegex: function () {
        return new RegExp(u, e);
      },
    };
    return n;
  }
  var L = /[^\w:]/g,
    U = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  function h(e, t, u) {
    if (e) {
      try {
        n = decodeURIComponent(x(u)).replace(L, '').toLowerCase();
      } catch (e) {
        return null;
      }
      if (
        0 === n.indexOf('javascript:') ||
        0 === n.indexOf('vbscript:') ||
        0 === n.indexOf('data:')
      )
        return null;
    }
    var n;
    t &&
      !U.test(u) &&
      ((e = u),
      f[' ' + (n = t)] ||
        (Q.test(n) ? (f[' ' + n] = n + '/') : (f[' ' + n] = A(n, '/', !0))),
      (t = -1 === (n = f[' ' + n]).indexOf(':')),
      (u =
        '//' === e.substring(0, 2)
          ? t
            ? e
            : n.replace(M, '$1') + e
          : '/' === e.charAt(0)
          ? t
            ? e
            : n.replace(H, '$1') + e
          : n + e));
    try {
      u = encodeURI(u).replace(/%25/g, '%');
    } catch (e) {
      return null;
    }
    return u;
  }
  var f = {},
    Q = /^[^:]+:\/*[^/]*$/,
    M = /^([^:]+:)[\s\S]*$/,
    H = /^([^:]+:\/*[^/]*)[\s\S]*$/;
  var d = { exec: function () {} };
  function k(e, t) {
    var u = e
        .replace(/\|/g, function (e, t, u) {
          for (var n = !1, r = t; 0 <= --r && '\\' === u[r]; ) n = !n;
          return n ? '|' : ' |';
        })
        .split(/ \|/),
      n = 0;
    if (
      (u[0].trim() || u.shift(),
      0 < u.length && !u[u.length - 1].trim() && u.pop(),
      u.length > t)
    )
      u.splice(t);
    else for (; u.length < t; ) u.push('');
    for (; n < u.length; n++) u[n] = u[n].trim().replace(/\\\|/g, '|');
    return u;
  }
  function A(e, t, u) {
    var n = e.length;
    if (0 === n) return '';
    for (var r = 0; r < n; ) {
      var i = e.charAt(n - r - 1);
      if ((i !== t || u) && (i === t || !u)) break;
      r++;
    }
    return e.slice(0, n - r);
  }
  function C(e, t, u, n) {
    var r = t.href,
      t = t.title ? D(t.title) : null,
      i = e[1].replace(/\\([\[\]])/g, '$1');
    return '!' !== e[0].charAt(0)
      ? ((n.state.inLink = !0),
        (e = {
          type: 'link',
          raw: u,
          href: r,
          title: t,
          text: i,
          tokens: n.inlineTokens(i),
        }),
        (n.state.inLink = !1),
        e)
      : { type: 'image', raw: u, href: r, title: t, text: D(i) };
  }
  var E = (function () {
      function e(e) {
        this.options = e || r.defaults;
      }
      var t = e.prototype;
      return (
        (t.space = function (e) {
          e = this.rules.block.newline.exec(e);
          if (e && 0 < e[0].length) return { type: 'space', raw: e[0] };
        }),
        (t.code = function (e) {
          var t,
            e = this.rules.block.code.exec(e);
          if (e)
            return (
              (t = e[0].replace(/^ {1,4}/gm, '')),
              {
                type: 'code',
                raw: e[0],
                codeBlockStyle: 'indented',
                text: this.options.pedantic ? t : A(t, '\n'),
              }
            );
        }),
        (t.fences = function (e) {
          var t,
            u,
            n,
            r,
            e = this.rules.block.fences.exec(e);
          if (e)
            return (
              (t = e[0]),
              (u = t),
              (n = e[3] || ''),
              (u =
                null === (u = t.match(/^(\s+)(?:```)/))
                  ? n
                  : ((r = u[1]),
                    n
                      .split('\n')
                      .map(function (e) {
                        var t = e.match(/^\s+/);
                        return null !== t && t[0].length >= r.length
                          ? e.slice(r.length)
                          : e;
                      })
                      .join('\n'))),
              {
                type: 'code',
                raw: t,
                lang:
                  e[2] && e[2].trim().replace(this.rules.inline._escapes, '$1'),
                text: u,
              }
            );
        }),
        (t.heading = function (e) {
          var t,
            u,
            e = this.rules.block.heading.exec(e);
          if (e)
            return (
              (t = e[2].trim()),
              /#$/.test(t) &&
                ((u = A(t, '#')),
                (!this.options.pedantic && u && !/ $/.test(u)) ||
                  (t = u.trim())),
              {
                type: 'heading',
                raw: e[0],
                depth: e[1].length,
                text: t,
                tokens: this.lexer.inline(t),
              }
            );
        }),
        (t.hr = function (e) {
          e = this.rules.block.hr.exec(e);
          if (e) return { type: 'hr', raw: e[0] };
        }),
        (t.blockquote = function (e) {
          var t,
            u,
            n,
            e = this.rules.block.blockquote.exec(e);
          if (e)
            return (
              (t = e[0].replace(/^ *>[ \t]?/gm, '')),
              (u = this.lexer.state.top),
              (this.lexer.state.top = !0),
              (n = this.lexer.blockTokens(t)),
              (this.lexer.state.top = u),
              { type: 'blockquote', raw: e[0], tokens: n, text: t }
            );
        }),
        (t.list = function (e) {
          var t = this.rules.block.list.exec(e);
          if (t) {
            var u,
              n,
              r,
              i,
              s,
              a,
              o,
              l,
              D,
              c,
              p,
              h = 1 < (g = t[1].trim()).length,
              f = {
                type: 'list',
                raw: '',
                ordered: h,
                start: h ? +g.slice(0, -1) : '',
                loose: !1,
                items: [],
              },
              g = h ? '\\d{1,9}\\' + g.slice(-1) : '\\' + g;
            this.options.pedantic && (g = h ? g : '[*+-]');
            for (
              var F = new RegExp(
                '^( {0,3}' + g + ')((?:[\t ][^\\n]*)?(?:\\n|$))'
              );
              e && ((p = !1), (t = F.exec(e))) && !this.rules.block.hr.test(e);

            ) {
              if (
                ((u = t[0]),
                (e = e.substring(u.length)),
                (o = t[2].split('\n', 1)[0].replace(/^\t+/, function (e) {
                  return ' '.repeat(3 * e.length);
                })),
                (l = e.split('\n', 1)[0]),
                this.options.pedantic
                  ? ((i = 2), (c = o.trimLeft()))
                  : ((i = t[2].search(/[^ ]/)),
                    (c = o.slice((i = 4 < i ? 1 : i))),
                    (i += t[1].length)),
                (s = !1),
                !o &&
                  /^ *$/.test(l) &&
                  ((u += l + '\n'), (e = e.substring(l.length + 1)), (p = !0)),
                !p)
              )
                for (
                  var d = new RegExp(
                      '^ {0,' +
                        Math.min(3, i - 1) +
                        '}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))'
                    ),
                    k = new RegExp(
                      '^ {0,' +
                        Math.min(3, i - 1) +
                        '}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)'
                    ),
                    A = new RegExp(
                      '^ {0,' + Math.min(3, i - 1) + '}(?:```|~~~)'
                    ),
                    C = new RegExp('^ {0,' + Math.min(3, i - 1) + '}#');
                  e &&
                  ((l = D = e.split('\n', 1)[0]),
                  this.options.pedantic &&
                    (l = l.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ')),
                  !A.test(l)) &&
                  !C.test(l) &&
                  !d.test(l) &&
                  !k.test(e);

                ) {
                  if (l.search(/[^ ]/) >= i || !l.trim())
                    c += '\n' + l.slice(i);
                  else {
                    if (s) break;
                    if (4 <= o.search(/[^ ]/)) break;
                    if (A.test(o)) break;
                    if (C.test(o)) break;
                    if (k.test(o)) break;
                    c += '\n' + l;
                  }
                  s || l.trim() || (s = !0),
                    (u += D + '\n'),
                    (e = e.substring(D.length + 1)),
                    (o = l.slice(i));
                }
              f.loose || (a ? (f.loose = !0) : /\n *\n *$/.test(u) && (a = !0)),
                this.options.gfm &&
                  (n = /^\[[ xX]\] /.exec(c)) &&
                  ((r = '[ ] ' !== n[0]), (c = c.replace(/^\[[ xX]\] +/, ''))),
                f.items.push({
                  type: 'list_item',
                  raw: u,
                  task: !!n,
                  checked: r,
                  loose: !1,
                  text: c,
                }),
                (f.raw += u);
            }
            (f.items[f.items.length - 1].raw = u.trimRight()),
              (f.items[f.items.length - 1].text = c.trimRight()),
              (f.raw = f.raw.trimRight());
            for (var E, x = f.items.length, m = 0; m < x; m++)
              (this.lexer.state.top = !1),
                (f.items[m].tokens = this.lexer.blockTokens(
                  f.items[m].text,
                  []
                )),
                f.loose ||
                  ((E =
                    0 <
                      (E = f.items[m].tokens.filter(function (e) {
                        return 'space' === e.type;
                      })).length &&
                    E.some(function (e) {
                      return /\n.*\n/.test(e.raw);
                    })),
                  (f.loose = E));
            if (f.loose) for (m = 0; m < x; m++) f.items[m].loose = !0;
            return f;
          }
        }),
        (t.html = function (e) {
          var t,
            e = this.rules.block.html.exec(e);
          if (e)
            return (
              (t = {
                type: 'html',
                block: !0,
                raw: e[0],
                pre:
                  !this.options.sanitizer &&
                  ('pre' === e[1] || 'script' === e[1] || 'style' === e[1]),
                text: e[0],
              }),
              this.options.sanitize &&
                ((e = this.options.sanitizer
                  ? this.options.sanitizer(e[0])
                  : D(e[0])),
                (t.type = 'paragraph'),
                (t.text = e),
                (t.tokens = this.lexer.inline(e))),
              t
            );
        }),
        (t.def = function (e) {
          var t,
            u,
            n,
            e = this.rules.block.def.exec(e);
          if (e)
            return (
              (t = e[1].toLowerCase().replace(/\s+/g, ' ')),
              (u = e[2]
                ? e[2]
                    .replace(/^<(.*)>$/, '$1')
                    .replace(this.rules.inline._escapes, '$1')
                : ''),
              (n =
                e[3] &&
                e[3]
                  .substring(1, e[3].length - 1)
                  .replace(this.rules.inline._escapes, '$1')),
              { type: 'def', tag: t, raw: e[0], href: u, title: n }
            );
        }),
        (t.table = function (e) {
          e = this.rules.block.table.exec(e);
          if (e) {
            var t = {
              type: 'table',
              header: k(e[1]).map(function (e) {
                return { text: e };
              }),
              align: e[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              rows:
                e[3] && e[3].trim()
                  ? e[3].replace(/\n[ \t]*$/, '').split('\n')
                  : [],
            };
            if (t.header.length === t.align.length) {
              t.raw = e[0];
              for (var u, n, r, i = t.align.length, s = 0; s < i; s++)
                /^ *-+: *$/.test(t.align[s])
                  ? (t.align[s] = 'right')
                  : /^ *:-+: *$/.test(t.align[s])
                  ? (t.align[s] = 'center')
                  : /^ *:-+ *$/.test(t.align[s])
                  ? (t.align[s] = 'left')
                  : (t.align[s] = null);
              for (i = t.rows.length, s = 0; s < i; s++)
                t.rows[s] = k(t.rows[s], t.header.length).map(function (e) {
                  return { text: e };
                });
              for (i = t.header.length, u = 0; u < i; u++)
                t.header[u].tokens = this.lexer.inline(t.header[u].text);
              for (i = t.rows.length, u = 0; u < i; u++)
                for (r = t.rows[u], n = 0; n < r.length; n++)
                  r[n].tokens = this.lexer.inline(r[n].text);
              return t;
            }
          }
        }),
        (t.lheading = function (e) {
          e = this.rules.block.lheading.exec(e);
          if (e)
            return {
              type: 'heading',
              raw: e[0],
              depth: '=' === e[2].charAt(0) ? 1 : 2,
              text: e[1],
              tokens: this.lexer.inline(e[1]),
            };
        }),
        (t.paragraph = function (e) {
          var t,
            e = this.rules.block.paragraph.exec(e);
          if (e)
            return (
              (t =
                '\n' === e[1].charAt(e[1].length - 1)
                  ? e[1].slice(0, -1)
                  : e[1]),
              {
                type: 'paragraph',
                raw: e[0],
                text: t,
                tokens: this.lexer.inline(t),
              }
            );
        }),
        (t.text = function (e) {
          e = this.rules.block.text.exec(e);
          if (e)
            return {
              type: 'text',
              raw: e[0],
              text: e[0],
              tokens: this.lexer.inline(e[0]),
            };
        }),
        (t.escape = function (e) {
          e = this.rules.inline.escape.exec(e);
          if (e) return { type: 'escape', raw: e[0], text: D(e[1]) };
        }),
        (t.tag = function (e) {
          e = this.rules.inline.tag.exec(e);
          if (e)
            return (
              !this.lexer.state.inLink && /^<a /i.test(e[0])
                ? (this.lexer.state.inLink = !0)
                : this.lexer.state.inLink &&
                  /^<\/a>/i.test(e[0]) &&
                  (this.lexer.state.inLink = !1),
              !this.lexer.state.inRawBlock &&
              /^<(pre|code|kbd|script)(\s|>)/i.test(e[0])
                ? (this.lexer.state.inRawBlock = !0)
                : this.lexer.state.inRawBlock &&
                  /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) &&
                  (this.lexer.state.inRawBlock = !1),
              {
                type: this.options.sanitize ? 'text' : 'html',
                raw: e[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: !1,
                text: this.options.sanitize
                  ? this.options.sanitizer
                    ? this.options.sanitizer(e[0])
                    : D(e[0])
                  : e[0],
              }
            );
        }),
        (t.link = function (e) {
          e = this.rules.inline.link.exec(e);
          if (e) {
            var t = e[2].trim();
            if (!this.options.pedantic && /^</.test(t)) {
              if (!/>$/.test(t)) return;
              var u = A(t.slice(0, -1), '\\');
              if ((t.length - u.length) % 2 == 0) return;
            } else {
              u = (function (e, t) {
                if (-1 !== e.indexOf(t[1]))
                  for (var u = e.length, n = 0, r = 0; r < u; r++)
                    if ('\\' === e[r]) r++;
                    else if (e[r] === t[0]) n++;
                    else if (e[r] === t[1] && --n < 0) return r;
                return -1;
              })(e[2], '()');
              -1 < u &&
                ((r = (0 === e[0].indexOf('!') ? 5 : 4) + e[1].length + u),
                (e[2] = e[2].substring(0, u)),
                (e[0] = e[0].substring(0, r).trim()),
                (e[3] = ''));
            }
            var n,
              u = e[2],
              r = '';
            return (
              this.options.pedantic
                ? (n = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(u)) &&
                  ((u = n[1]), (r = n[3]))
                : (r = e[3] ? e[3].slice(1, -1) : ''),
              (u = u.trim()),
              C(
                e,
                {
                  href:
                    (u = /^</.test(u)
                      ? this.options.pedantic && !/>$/.test(t)
                        ? u.slice(1)
                        : u.slice(1, -1)
                      : u) && u.replace(this.rules.inline._escapes, '$1'),
                  title: r && r.replace(this.rules.inline._escapes, '$1'),
                },
                e[0],
                this.lexer
              )
            );
          }
        }),
        (t.reflink = function (e, t) {
          var u;
          if (
            (u =
              (u = this.rules.inline.reflink.exec(e)) ||
              this.rules.inline.nolink.exec(e))
          )
            return (e =
              t[(e = (u[2] || u[1]).replace(/\s+/g, ' ')).toLowerCase()])
              ? C(u, e, u[0], this.lexer)
              : { type: 'text', raw: (t = u[0].charAt(0)), text: t };
        }),
        (t.emStrong = function (e, t, u) {
          void 0 === u && (u = '');
          var n = this.rules.inline.emStrong.lDelim.exec(e);
          if (
            n &&
            (!n[3] ||
              !u.match(
                /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/
              )) &&
            (!(n[1] || n[2] || '') ||
              !u ||
              this.rules.inline.punctuation.exec(u))
          ) {
            var r = n[0].length - 1,
              i = r,
              s = 0,
              a =
                '*' === n[0][0]
                  ? this.rules.inline.emStrong.rDelimAst
                  : this.rules.inline.emStrong.rDelimUnd;
            for (
              a.lastIndex = 0, t = t.slice(-1 * e.length + r);
              null != (n = a.exec(t));

            ) {
              var o,
                l = n[1] || n[2] || n[3] || n[4] || n[5] || n[6];
              if (l)
                if (((l = l.length), n[3] || n[4])) i += l;
                else if ((n[5] || n[6]) && r % 3 && !((r + l) % 3)) s += l;
                else if (!(0 < (i -= l)))
                  return (
                    (l = Math.min(l, l + i + s)),
                    (o = e.slice(0, r + n.index + l + 1)),
                    Math.min(r, l) % 2
                      ? ((l = o.slice(1, -1)),
                        {
                          type: 'em',
                          raw: o,
                          text: l,
                          tokens: this.lexer.inlineTokens(l),
                        })
                      : ((l = o.slice(2, -2)),
                        {
                          type: 'strong',
                          raw: o,
                          text: l,
                          tokens: this.lexer.inlineTokens(l),
                        })
                  );
            }
          }
        }),
        (t.codespan = function (e) {
          var t,
            u,
            n,
            e = this.rules.inline.code.exec(e);
          if (e)
            return (
              (n = e[2].replace(/\n/g, ' ')),
              (t = /[^ ]/.test(n)),
              (u = /^ /.test(n) && / $/.test(n)),
              (n = D((n = t && u ? n.substring(1, n.length - 1) : n), !0)),
              { type: 'codespan', raw: e[0], text: n }
            );
        }),
        (t.br = function (e) {
          e = this.rules.inline.br.exec(e);
          if (e) return { type: 'br', raw: e[0] };
        }),
        (t.del = function (e) {
          e = this.rules.inline.del.exec(e);
          if (e)
            return {
              type: 'del',
              raw: e[0],
              text: e[2],
              tokens: this.lexer.inlineTokens(e[2]),
            };
        }),
        (t.autolink = function (e, t) {
          var u,
            e = this.rules.inline.autolink.exec(e);
          if (e)
            return (
              (t =
                '@' === e[2]
                  ? 'mailto:' + (u = D(this.options.mangle ? t(e[1]) : e[1]))
                  : (u = D(e[1]))),
              {
                type: 'link',
                raw: e[0],
                text: u,
                href: t,
                tokens: [{ type: 'text', raw: u, text: u }],
              }
            );
        }),
        (t.url = function (e, t) {
          var u, n, r, i;
          if ((u = this.rules.inline.url.exec(e))) {
            if ('@' === u[2])
              r = 'mailto:' + (n = D(this.options.mangle ? t(u[0]) : u[0]));
            else {
              for (
                ;
                (i = u[0]),
                  (u[0] = this.rules.inline._backpedal.exec(u[0])[0]),
                  i !== u[0];

              );
              (n = D(u[0])), (r = 'www.' === u[1] ? 'http://' + u[0] : u[0]);
            }
            return {
              type: 'link',
              raw: u[0],
              text: n,
              href: r,
              tokens: [{ type: 'text', raw: n, text: n }],
            };
          }
        }),
        (t.inlineText = function (e, t) {
          e = this.rules.inline.text.exec(e);
          if (e)
            return (
              (t = this.lexer.state.inRawBlock
                ? this.options.sanitize
                  ? this.options.sanitizer
                    ? this.options.sanitizer(e[0])
                    : D(e[0])
                  : e[0]
                : D(this.options.smartypants ? t(e[0]) : e[0])),
              { type: 'text', raw: e[0], text: t }
            );
        }),
        e
      );
    })(),
    m = {
      newline: /^(?: *(?:\n|$))+/,
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      fences:
        /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
      hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
      html: '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
      def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
      table: d,
      lheading: /^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      _paragraph:
        /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
      text: /^[^\n]+/,
      _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
      _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
    },
    b =
      ((m.def = p(m.def)
        .replace('label', m._label)
        .replace('title', m._title)
        .getRegex()),
      (m.bullet = /(?:[*+-]|\d{1,9}[.)])/),
      (m.listItemStart = p(/^( *)(bull) */)
        .replace('bull', m.bullet)
        .getRegex()),
      (m.list = p(m.list)
        .replace(/bull/g, m.bullet)
        .replace(
          'hr',
          '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))'
        )
        .replace('def', '\\n+(?=' + m.def.source + ')')
        .getRegex()),
      (m._tag =
        'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
      (m._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
      (m.html = p(m.html, 'i')
        .replace('comment', m._comment)
        .replace('tag', m._tag)
        .replace(
          'attribute',
          / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
        )
        .getRegex()),
      (m.lheading = p(m.lheading).replace(/bull/g, m.bullet).getRegex()),
      (m.paragraph = p(m._paragraph)
        .replace('hr', m.hr)
        .replace('heading', ' {0,3}#{1,6} ')
        .replace('|lheading', '')
        .replace('|table', '')
        .replace('blockquote', ' {0,3}>')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
        .replace(
          'html',
          '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
        )
        .replace('tag', m._tag)
        .getRegex()),
      (m.blockquote = p(m.blockquote)
        .replace('paragraph', m.paragraph)
        .getRegex()),
      (m.normal = g({}, m)),
      (m.gfm = g({}, m.normal, {
        table:
          '^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
      })),
      (m.gfm.table = p(m.gfm.table)
        .replace('hr', m.hr)
        .replace('heading', ' {0,3}#{1,6} ')
        .replace('blockquote', ' {0,3}>')
        .replace('code', ' {4}[^\\n]')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
        .replace(
          'html',
          '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
        )
        .replace('tag', m._tag)
        .getRegex()),
      (m.gfm.paragraph = p(m._paragraph)
        .replace('hr', m.hr)
        .replace('heading', ' {0,3}#{1,6} ')
        .replace('|lheading', '')
        .replace('table', m.gfm.table)
        .replace('blockquote', ' {0,3}>')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
        .replace(
          'html',
          '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
        )
        .replace('tag', m._tag)
        .getRegex()),
      (m.pedantic = g({}, m.normal, {
        html: p(
          '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
        )
          .replace('comment', m._comment)
          .replace(
            /tag/g,
            '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
          )
          .getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: d,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: p(m.normal._paragraph)
          .replace('hr', m.hr)
          .replace('heading', ' *#{1,6} *[^\n]')
          .replace('lheading', m.lheading)
          .replace('blockquote', ' {0,3}>')
          .replace('|fences', '')
          .replace('|list', '')
          .replace('|html', '')
          .getRegex(),
      })),
      {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: d,
        tag: '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: 'reflink|nolink(?!\\()',
        emStrong: {
          lDelim:
            /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
          rDelimAst:
            /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
          rDelimUnd:
            /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/,
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: d,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^((?![*_])[\spunctuation])/,
      });
  function N(e) {
    return e
      .replace(/---/g, '—')
      .replace(/--/g, '–')
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
      .replace(/'/g, '’')
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
      .replace(/"/g, '”')
      .replace(/\.{3}/g, '…');
  }
  function w(e) {
    for (var t, u = '', n = e.length, r = 0; r < n; r++)
      (t = e.charCodeAt(r)),
        (u +=
          '&#' + (t = 0.5 < Math.random() ? 'x' + t.toString(16) : t) + ';');
    return u;
  }
  (b._punctuation = '\\p{P}$+<=>`^|~'),
    (b.punctuation = p(b.punctuation, 'u')
      .replace(/punctuation/g, b._punctuation)
      .getRegex()),
    (b.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g),
    (b.anyPunctuation = /\\[punct]/g),
    (b._escapes = /\\([punct])/g),
    (b._comment = p(m._comment).replace('(?:--\x3e|$)', '--\x3e').getRegex()),
    (b.emStrong.lDelim = p(b.emStrong.lDelim, 'u')
      .replace(/punct/g, b._punctuation)
      .getRegex()),
    (b.emStrong.rDelimAst = p(b.emStrong.rDelimAst, 'gu')
      .replace(/punct/g, b._punctuation)
      .getRegex()),
    (b.emStrong.rDelimUnd = p(b.emStrong.rDelimUnd, 'gu')
      .replace(/punct/g, b._punctuation)
      .getRegex()),
    (b.anyPunctuation = p(b.anyPunctuation, 'gu')
      .replace(/punct/g, b._punctuation)
      .getRegex()),
    (b._escapes = p(b._escapes, 'gu')
      .replace(/punct/g, b._punctuation)
      .getRegex()),
    (b._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
    (b._email =
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
    (b.autolink = p(b.autolink)
      .replace('scheme', b._scheme)
      .replace('email', b._email)
      .getRegex()),
    (b._attribute =
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
    (b.tag = p(b.tag)
      .replace('comment', b._comment)
      .replace('attribute', b._attribute)
      .getRegex()),
    (b._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
    (b._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
    (b._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
    (b.link = p(b.link)
      .replace('label', b._label)
      .replace('href', b._href)
      .replace('title', b._title)
      .getRegex()),
    (b.reflink = p(b.reflink)
      .replace('label', b._label)
      .replace('ref', m._label)
      .getRegex()),
    (b.nolink = p(b.nolink).replace('ref', m._label).getRegex()),
    (b.reflinkSearch = p(b.reflinkSearch, 'g')
      .replace('reflink', b.reflink)
      .replace('nolink', b.nolink)
      .getRegex()),
    (b.normal = g({}, b)),
    (b.pedantic = g({}, b.normal, {
      strong: {
        start: /^__|\*\*/,
        middle:
          /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g,
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g,
      },
      link: p(/^!?\[(label)\]\((.*?)\)/)
        .replace('label', b._label)
        .getRegex(),
      reflink: p(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace('label', b._label)
        .getRegex(),
    })),
    (b.gfm = g({}, b.normal, {
      escape: p(b.escape).replace('])', '~|])').getRegex(),
      _extended_email:
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal:
        /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
    })),
    (b.gfm.url = p(b.gfm.url, 'i')
      .replace('email', b.gfm._extended_email)
      .getRegex()),
    (b.breaks = g({}, b.gfm, {
      br: p(b.br).replace('{2,}', '*').getRegex(),
      text: p(b.gfm.text)
        .replace('\\b_', '\\b_| {2,}\\n')
        .replace(/\{2,\}/g, '*')
        .getRegex(),
    }));
  var B = (function () {
      function u(e) {
        (this.tokens = []),
          (this.tokens.links = Object.create(null)),
          (this.options = e || r.defaults),
          (this.options.tokenizer = this.options.tokenizer || new E()),
          (this.tokenizer = this.options.tokenizer),
          (this.tokenizer.options = this.options),
          ((this.tokenizer.lexer = this).inlineQueue = []),
          (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
        e = { block: m.normal, inline: b.normal };
        this.options.pedantic
          ? ((e.block = m.pedantic), (e.inline = b.pedantic))
          : this.options.gfm &&
            ((e.block = m.gfm),
            this.options.breaks ? (e.inline = b.breaks) : (e.inline = b.gfm)),
          (this.tokenizer.rules = e);
      }
      (u.lex = function (e, t) {
        return new u(t).lex(e);
      }),
        (u.lexInline = function (e, t) {
          return new u(t).inlineTokens(e);
        });
      var e,
        t,
        n = u.prototype;
      return (
        (n.lex = function (e) {
          var t;
          for (
            e = e.replace(/\r\n|\r/g, '\n'), this.blockTokens(e, this.tokens);
            (t = this.inlineQueue.shift());

          )
            this.inlineTokens(t.src, t.tokens);
          return this.tokens;
        }),
        (n.blockTokens = function (r, i) {
          var s,
            a,
            o,
            l,
            D = this;
          for (
            void 0 === i && (i = []),
              r = this.options.pedantic
                ? r.replace(/\t/g, '    ').replace(/^ +$/gm, '')
                : r.replace(/^( *)(\t+)/gm, function (e, t, u) {
                    return t + '    '.repeat(u.length);
                  });
            r;

          ) {
            var e = (function () {
              if (
                D.options.extensions &&
                D.options.extensions.block &&
                D.options.extensions.block.some(function (e) {
                  return (
                    !!(s = e.call({ lexer: D }, r, i)) &&
                    ((r = r.substring(s.raw.length)), i.push(s), !0)
                  );
                })
              )
                return 'continue';
              if ((s = D.tokenizer.space(r)))
                return (
                  (r = r.substring(s.raw.length)),
                  1 === s.raw.length && 0 < i.length
                    ? (i[i.length - 1].raw += '\n')
                    : i.push(s),
                  'continue'
                );
              if ((s = D.tokenizer.code(r)))
                return (
                  (r = r.substring(s.raw.length)),
                  !(a = i[i.length - 1]) ||
                  ('paragraph' !== a.type && 'text' !== a.type)
                    ? i.push(s)
                    : ((a.raw += '\n' + s.raw),
                      (a.text += '\n' + s.text),
                      (D.inlineQueue[D.inlineQueue.length - 1].src = a.text)),
                  'continue'
                );
              if ((s = D.tokenizer.fences(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = D.tokenizer.heading(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = D.tokenizer.hr(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = D.tokenizer.blockquote(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = D.tokenizer.list(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = D.tokenizer.html(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = D.tokenizer.def(r)))
                return (
                  (r = r.substring(s.raw.length)),
                  !(a = i[i.length - 1]) ||
                  ('paragraph' !== a.type && 'text' !== a.type)
                    ? D.tokens.links[s.tag] ||
                      (D.tokens.links[s.tag] = { href: s.href, title: s.title })
                    : ((a.raw += '\n' + s.raw),
                      (a.text += '\n' + s.raw),
                      (D.inlineQueue[D.inlineQueue.length - 1].src = a.text)),
                  'continue'
                );
              if ((s = D.tokenizer.table(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = D.tokenizer.lheading(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              var t, u, n;
              if (
                ((o = r),
                D.options.extensions &&
                  D.options.extensions.startBlock &&
                  ((t = 1 / 0),
                  (u = r.slice(1)),
                  D.options.extensions.startBlock.forEach(function (e) {
                    'number' == typeof (n = e.call({ lexer: this }, u)) &&
                      0 <= n &&
                      (t = Math.min(t, n));
                  }),
                  t < 1 / 0) &&
                  0 <= t &&
                  (o = r.substring(0, t + 1)),
                D.state.top && (s = D.tokenizer.paragraph(o)))
              )
                return (
                  (a = i[i.length - 1]),
                  l && 'paragraph' === a.type
                    ? ((a.raw += '\n' + s.raw),
                      (a.text += '\n' + s.text),
                      D.inlineQueue.pop(),
                      (D.inlineQueue[D.inlineQueue.length - 1].src = a.text))
                    : i.push(s),
                  (l = o.length !== r.length),
                  (r = r.substring(s.raw.length)),
                  'continue'
                );
              if ((s = D.tokenizer.text(r)))
                return (
                  (r = r.substring(s.raw.length)),
                  (a = i[i.length - 1]) && 'text' === a.type
                    ? ((a.raw += '\n' + s.raw),
                      (a.text += '\n' + s.text),
                      D.inlineQueue.pop(),
                      (D.inlineQueue[D.inlineQueue.length - 1].src = a.text))
                    : i.push(s),
                  'continue'
                );
              if (r) {
                var e = 'Infinite loop on byte: ' + r.charCodeAt(0);
                if (D.options.silent) return console.error(e), 'break';
                throw new Error(e);
              }
            })();
            if ('continue' !== e && 'break' === e) break;
          }
          return (this.state.top = !0), i;
        }),
        (n.inline = function (e, t) {
          return (
            this.inlineQueue.push({
              src: e,
              tokens: (t = void 0 === t ? [] : t),
            }),
            t
          );
        }),
        (n.inlineTokens = function (r, i) {
          var s,
            a,
            o,
            e,
            l,
            D,
            c = this,
            p = (void 0 === i && (i = []), r);
          if (this.tokens.links) {
            var t = Object.keys(this.tokens.links);
            if (0 < t.length)
              for (
                ;
                null != (e = this.tokenizer.rules.inline.reflinkSearch.exec(p));

              )
                t.includes(e[0].slice(e[0].lastIndexOf('[') + 1, -1)) &&
                  (p =
                    p.slice(0, e.index) +
                    '[' +
                    'a'.repeat(e[0].length - 2) +
                    ']' +
                    p.slice(
                      this.tokenizer.rules.inline.reflinkSearch.lastIndex
                    ));
          }
          for (; null != (e = this.tokenizer.rules.inline.blockSkip.exec(p)); )
            p =
              p.slice(0, e.index) +
              '[' +
              'a'.repeat(e[0].length - 2) +
              ']' +
              p.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
          for (
            ;
            null != (e = this.tokenizer.rules.inline.anyPunctuation.exec(p));

          )
            p =
              p.slice(0, e.index) +
              '++' +
              p.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
          for (; r; ) {
            var u = (function () {
              if (
                (l || (D = ''),
                (l = !1),
                c.options.extensions &&
                  c.options.extensions.inline &&
                  c.options.extensions.inline.some(function (e) {
                    return (
                      !!(s = e.call({ lexer: c }, r, i)) &&
                      ((r = r.substring(s.raw.length)), i.push(s), !0)
                    );
                  }))
              )
                return 'continue';
              if ((s = c.tokenizer.escape(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = c.tokenizer.tag(r)))
                return (
                  (r = r.substring(s.raw.length)),
                  (a = i[i.length - 1]) &&
                  'text' === s.type &&
                  'text' === a.type
                    ? ((a.raw += s.raw), (a.text += s.text))
                    : i.push(s),
                  'continue'
                );
              if ((s = c.tokenizer.link(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = c.tokenizer.reflink(r, c.tokens.links)))
                return (
                  (r = r.substring(s.raw.length)),
                  (a = i[i.length - 1]) &&
                  'text' === s.type &&
                  'text' === a.type
                    ? ((a.raw += s.raw), (a.text += s.text))
                    : i.push(s),
                  'continue'
                );
              if ((s = c.tokenizer.emStrong(r, p, D)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = c.tokenizer.codespan(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = c.tokenizer.br(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = c.tokenizer.del(r)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if ((s = c.tokenizer.autolink(r, w)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              if (!c.state.inLink && (s = c.tokenizer.url(r, w)))
                return (r = r.substring(s.raw.length)), i.push(s), 'continue';
              var t, u, n;
              if (
                ((o = r),
                c.options.extensions &&
                  c.options.extensions.startInline &&
                  ((t = 1 / 0),
                  (u = r.slice(1)),
                  c.options.extensions.startInline.forEach(function (e) {
                    'number' == typeof (n = e.call({ lexer: this }, u)) &&
                      0 <= n &&
                      (t = Math.min(t, n));
                  }),
                  t < 1 / 0) &&
                  0 <= t &&
                  (o = r.substring(0, t + 1)),
                (s = c.tokenizer.inlineText(o, N)))
              )
                return (
                  (r = r.substring(s.raw.length)),
                  '_' !== s.raw.slice(-1) && (D = s.raw.slice(-1)),
                  (l = !0),
                  (a = i[i.length - 1]) && 'text' === a.type
                    ? ((a.raw += s.raw), (a.text += s.text))
                    : i.push(s),
                  'continue'
                );
              if (r) {
                var e = 'Infinite loop on byte: ' + r.charCodeAt(0);
                if (c.options.silent) return console.error(e), 'break';
                throw new Error(e);
              }
            })();
            if ('continue' !== u && 'break' === u) break;
          }
          return i;
        }),
        (n = u),
        (t = [
          {
            key: 'rules',
            get: function () {
              return { block: m, inline: b };
            },
          },
        ]),
        (e = null) && i(n.prototype, e),
        t && i(n, t),
        Object.defineProperty(n, 'prototype', { writable: !1 }),
        u
      );
    })(),
    y = (function () {
      function e(e) {
        this.options = e || r.defaults;
      }
      var t = e.prototype;
      return (
        (t.code = function (e, t, u) {
          var n,
            t = (t || '').match(/\S*/)[0];
          return (
            this.options.highlight &&
              null != (n = this.options.highlight(e, t)) &&
              n !== e &&
              ((u = !0), (e = n)),
            (e = e.replace(/\n$/, '') + '\n'),
            t
              ? '<pre><code class="' +
                this.options.langPrefix +
                D(t) +
                '">' +
                (u ? e : D(e, !0)) +
                '</code></pre>\n'
              : '<pre><code>' + (u ? e : D(e, !0)) + '</code></pre>\n'
          );
        }),
        (t.blockquote = function (e) {
          return '<blockquote>\n' + e + '</blockquote>\n';
        }),
        (t.html = function (e, t) {
          return e;
        }),
        (t.heading = function (e, t, u, n) {
          return this.options.headerIds
            ? '<h' +
                t +
                ' id="' +
                (this.options.headerPrefix + n.slug(u)) +
                '">' +
                e +
                '</h' +
                t +
                '>\n'
            : '<h' + t + '>' + e + '</h' + t + '>\n';
        }),
        (t.hr = function () {
          return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
        }),
        (t.list = function (e, t, u) {
          var n = t ? 'ol' : 'ul';
          return (
            '<' +
            n +
            (t && 1 !== u ? ' start="' + u + '"' : '') +
            '>\n' +
            e +
            '</' +
            n +
            '>\n'
          );
        }),
        (t.listitem = function (e) {
          return '<li>' + e + '</li>\n';
        }),
        (t.checkbox = function (e) {
          return (
            '<input ' +
            (e ? 'checked="" ' : '') +
            'disabled="" type="checkbox"' +
            (this.options.xhtml ? ' /' : '') +
            '> '
          );
        }),
        (t.paragraph = function (e) {
          return '<p>' + e + '</p>\n';
        }),
        (t.table = function (e, t) {
          return (
            '<table>\n<thead>\n' +
            e +
            '</thead>\n' +
            (t = t && '<tbody>' + t + '</tbody>') +
            '</table>\n'
          );
        }),
        (t.tablerow = function (e) {
          return '<tr>\n' + e + '</tr>\n';
        }),
        (t.tablecell = function (e, t) {
          var u = t.header ? 'th' : 'td';
          return (
            (t.align ? '<' + u + ' align="' + t.align + '">' : '<' + u + '>') +
            e +
            '</' +
            u +
            '>\n'
          );
        }),
        (t.strong = function (e) {
          return '<strong>' + e + '</strong>';
        }),
        (t.em = function (e) {
          return '<em>' + e + '</em>';
        }),
        (t.codespan = function (e) {
          return '<code>' + e + '</code>';
        }),
        (t.br = function () {
          return this.options.xhtml ? '<br/>' : '<br>';
        }),
        (t.del = function (e) {
          return '<del>' + e + '</del>';
        }),
        (t.link = function (e, t, u) {
          return null ===
            (e = h(this.options.sanitize, this.options.baseUrl, e))
            ? u
            : ((e = '<a href="' + e + '"'),
              t && (e += ' title="' + t + '"'),
              e + '>' + u + '</a>');
        }),
        (t.image = function (e, t, u) {
          return null ===
            (e = h(this.options.sanitize, this.options.baseUrl, e))
            ? u
            : ((e = '<img src="' + e + '" alt="' + u + '"'),
              t && (e += ' title="' + t + '"'),
              e + (this.options.xhtml ? '/>' : '>'));
        }),
        (t.text = function (e) {
          return e;
        }),
        e
      );
    })(),
    v = (function () {
      function e() {}
      var t = e.prototype;
      return (
        (t.strong = function (e) {
          return e;
        }),
        (t.em = function (e) {
          return e;
        }),
        (t.codespan = function (e) {
          return e;
        }),
        (t.del = function (e) {
          return e;
        }),
        (t.html = function (e) {
          return e;
        }),
        (t.text = function (e) {
          return e;
        }),
        (t.link = function (e, t, u) {
          return '' + u;
        }),
        (t.image = function (e, t, u) {
          return '' + u;
        }),
        (t.br = function () {
          return '';
        }),
        e
      );
    })(),
    _ = (function () {
      function e() {
        this.seen = {};
      }
      var t = e.prototype;
      return (
        (t.serialize = function (e) {
          return e
            .toLowerCase()
            .trim()
            .replace(/<[!\/a-z].*?>/gi, '')
            .replace(
              /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
              ''
            )
            .replace(/\s/g, '-');
        }),
        (t.getNextSafeSlug = function (e, t) {
          var u = e,
            n = 0;
          if (this.seen.hasOwnProperty(u))
            for (
              n = this.seen[e];
              (u = e + '-' + ++n), this.seen.hasOwnProperty(u);

            );
          return t || ((this.seen[e] = n), (this.seen[u] = 0)), u;
        }),
        (t.slug = function (e, t) {
          void 0 === t && (t = {});
          e = this.serialize(e);
          return this.getNextSafeSlug(e, t.dryrun);
        }),
        e
      );
    })(),
    z = (function () {
      function u(e) {
        (this.options = e || r.defaults),
          (this.options.renderer = this.options.renderer || new y()),
          (this.renderer = this.options.renderer),
          (this.renderer.options = this.options),
          (this.textRenderer = new v()),
          (this.slugger = new _());
      }
      (u.parse = function (e, t) {
        return new u(t).parse(e);
      }),
        (u.parseInline = function (e, t) {
          return new u(t).parseInline(e);
        });
      var e = u.prototype;
      return (
        (e.parse = function (e, t) {
          void 0 === t && (t = !0);
          for (
            var u,
              n,
              r,
              i,
              s,
              a,
              o,
              l,
              D,
              c,
              p,
              h,
              f,
              g,
              F,
              d,
              k = '',
              A = e.length,
              C = 0;
            C < A;
            C++
          )
            if (
              ((l = e[C]),
              this.options.extensions &&
                this.options.extensions.renderers &&
                this.options.extensions.renderers[l.type] &&
                (!1 !==
                  (d = this.options.extensions.renderers[l.type].call(
                    { parser: this },
                    l
                  )) ||
                  ![
                    'space',
                    'hr',
                    'heading',
                    'code',
                    'table',
                    'blockquote',
                    'list',
                    'html',
                    'paragraph',
                    'text',
                  ].includes(l.type)))
            )
              k += d || '';
            else
              switch (l.type) {
                case 'space':
                  continue;
                case 'hr':
                  k += this.renderer.hr();
                  continue;
                case 'heading':
                  k += this.renderer.heading(
                    this.parseInline(l.tokens),
                    l.depth,
                    x(this.parseInline(l.tokens, this.textRenderer)),
                    this.slugger
                  );
                  continue;
                case 'code':
                  k += this.renderer.code(l.text, l.lang, l.escaped);
                  continue;
                case 'table':
                  for (a = D = '', r = l.header.length, u = 0; u < r; u++)
                    a += this.renderer.tablecell(
                      this.parseInline(l.header[u].tokens),
                      { header: !0, align: l.align[u] }
                    );
                  for (
                    D += this.renderer.tablerow(a),
                      o = '',
                      r = l.rows.length,
                      u = 0;
                    u < r;
                    u++
                  ) {
                    for (a = '', i = (s = l.rows[u]).length, n = 0; n < i; n++)
                      a += this.renderer.tablecell(
                        this.parseInline(s[n].tokens),
                        { header: !1, align: l.align[n] }
                      );
                    o += this.renderer.tablerow(a);
                  }
                  k += this.renderer.table(D, o);
                  continue;
                case 'blockquote':
                  (o = this.parse(l.tokens)),
                    (k += this.renderer.blockquote(o));
                  continue;
                case 'list':
                  for (
                    D = l.ordered,
                      E = l.start,
                      c = l.loose,
                      r = l.items.length,
                      o = '',
                      u = 0;
                    u < r;
                    u++
                  )
                    (f = (h = l.items[u]).checked),
                      (g = h.task),
                      (p = ''),
                      h.task &&
                        ((F = this.renderer.checkbox(f)),
                        c
                          ? 0 < h.tokens.length &&
                            'paragraph' === h.tokens[0].type
                            ? ((h.tokens[0].text = F + ' ' + h.tokens[0].text),
                              h.tokens[0].tokens &&
                                0 < h.tokens[0].tokens.length &&
                                'text' === h.tokens[0].tokens[0].type &&
                                (h.tokens[0].tokens[0].text =
                                  F + ' ' + h.tokens[0].tokens[0].text))
                            : h.tokens.unshift({ type: 'text', text: F })
                          : (p += F)),
                      (p += this.parse(h.tokens, c)),
                      (o += this.renderer.listitem(p, g, f));
                  k += this.renderer.list(o, D, E);
                  continue;
                case 'html':
                  k += this.renderer.html(l.text, l.block);
                  continue;
                case 'paragraph':
                  k += this.renderer.paragraph(this.parseInline(l.tokens));
                  continue;
                case 'text':
                  for (
                    o = l.tokens ? this.parseInline(l.tokens) : l.text;
                    C + 1 < A && 'text' === e[C + 1].type;

                  )
                    o +=
                      '\n' +
                      ((l = e[++C]).tokens
                        ? this.parseInline(l.tokens)
                        : l.text);
                  k += t ? this.renderer.paragraph(o) : o;
                  continue;
                default:
                  var E = 'Token with "' + l.type + '" type was not found.';
                  if (this.options.silent) return void console.error(E);
                  throw new Error(E);
              }
          return k;
        }),
        (e.parseInline = function (e, t) {
          t = t || this.renderer;
          for (var u, n, r = '', i = e.length, s = 0; s < i; s++)
            if (
              ((u = e[s]),
              this.options.extensions &&
                this.options.extensions.renderers &&
                this.options.extensions.renderers[u.type] &&
                (!1 !==
                  (n = this.options.extensions.renderers[u.type].call(
                    { parser: this },
                    u
                  )) ||
                  ![
                    'escape',
                    'html',
                    'link',
                    'image',
                    'strong',
                    'em',
                    'codespan',
                    'br',
                    'del',
                    'text',
                  ].includes(u.type)))
            )
              r += n || '';
            else
              switch (u.type) {
                case 'escape':
                  r += t.text(u.text);
                  break;
                case 'html':
                  r += t.html(u.text);
                  break;
                case 'link':
                  r += t.link(u.href, u.title, this.parseInline(u.tokens, t));
                  break;
                case 'image':
                  r += t.image(u.href, u.title, u.text);
                  break;
                case 'strong':
                  r += t.strong(this.parseInline(u.tokens, t));
                  break;
                case 'em':
                  r += t.em(this.parseInline(u.tokens, t));
                  break;
                case 'codespan':
                  r += t.codespan(u.text);
                  break;
                case 'br':
                  r += t.br();
                  break;
                case 'del':
                  r += t.del(this.parseInline(u.tokens, t));
                  break;
                case 'text':
                  r += t.text(u.text);
                  break;
                default:
                  var a = 'Token with "' + u.type + '" type was not found.';
                  if (this.options.silent) return void console.error(a);
                  throw new Error(a);
              }
          return r;
        }),
        u
      );
    })(),
    $ = (function () {
      function e(e) {
        this.options = e || r.defaults;
      }
      var t = e.prototype;
      return (
        (t.preprocess = function (e) {
          return e;
        }),
        (t.postprocess = function (e) {
          return e;
        }),
        e
      );
    })(),
    S =
      (($.passThroughHooks = new Set(['preprocess', 'postprocess'])),
      e('parseMarkdown')),
    T = e('onError'),
    d = (function () {
      function e() {
        Object.defineProperty(this, T, { value: G }),
          Object.defineProperty(this, S, { value: X }),
          (this.defaults = u()),
          (this.options = this.setOptions),
          (this.parse = F(this, S)[S](B.lex, z.parse)),
          (this.parseInline = F(this, S)[S](B.lexInline, z.parseInline)),
          (this.Parser = z),
          (this.parser = z.parse),
          (this.Renderer = y),
          (this.TextRenderer = v),
          (this.Lexer = B),
          (this.lexer = B.lex),
          (this.Tokenizer = E),
          (this.Slugger = _),
          (this.Hooks = $),
          this.use.apply(this, arguments);
      }
      var t = e.prototype;
      return (
        (t.walkTokens = function (e, a) {
          for (var o, l = this, D = [], t = c(e); !(o = t()).done; )
            !(function () {
              var t = o.value;
              switch (((D = D.concat(a.call(l, t))), t.type)) {
                case 'table':
                  for (var e = c(t.header); !(u = e()).done; ) {
                    var u = u.value;
                    D = D.concat(l.walkTokens(u.tokens, a));
                  }
                  for (var n, r = c(t.rows); !(n = r()).done; )
                    for (var i = c(n.value); !(s = i()).done; ) {
                      var s = s.value;
                      D = D.concat(l.walkTokens(s.tokens, a));
                    }
                  break;
                case 'list':
                  D = D.concat(l.walkTokens(t.items, a));
                  break;
                default:
                  l.defaults.extensions &&
                  l.defaults.extensions.childTokens &&
                  l.defaults.extensions.childTokens[t.type]
                    ? l.defaults.extensions.childTokens[t.type].forEach(
                        function (e) {
                          D = D.concat(l.walkTokens(t[e], a));
                        }
                      )
                    : t.tokens && (D = D.concat(l.walkTokens(t.tokens, a)));
              }
            })();
          return D;
        }),
        (t.use = function () {
          for (
            var D = this,
              c = this.defaults.extensions || {
                renderers: {},
                childTokens: {},
              },
              e = arguments.length,
              t = new Array(e),
              u = 0;
            u < e;
            u++
          )
            t[u] = arguments[u];
          return (
            t.forEach(function (s) {
              var u,
                e = g({}, s);
              if (
                ((e.async = D.defaults.async || e.async || !1),
                s.extensions &&
                  (s.extensions.forEach(function (r) {
                    if (!r.name) throw new Error('extension name required');
                    var i;
                    if (
                      (r.renderer &&
                        ((i = c.renderers[r.name]),
                        (c.renderers[r.name] = i
                          ? function () {
                              for (
                                var e = arguments.length,
                                  t = new Array(e),
                                  u = 0;
                                u < e;
                                u++
                              )
                                t[u] = arguments[u];
                              var n = r.renderer.apply(this, t);
                              return (n = !1 === n ? i.apply(this, t) : n);
                            }
                          : r.renderer)),
                      r.tokenizer)
                    ) {
                      if (
                        !r.level ||
                        ('block' !== r.level && 'inline' !== r.level)
                      )
                        throw new Error(
                          "extension level must be 'block' or 'inline'"
                        );
                      c[r.level]
                        ? c[r.level].unshift(r.tokenizer)
                        : (c[r.level] = [r.tokenizer]),
                        r.start &&
                          ('block' === r.level
                            ? c.startBlock
                              ? c.startBlock.push(r.start)
                              : (c.startBlock = [r.start])
                            : 'inline' === r.level &&
                              (c.startInline
                                ? c.startInline.push(r.start)
                                : (c.startInline = [r.start])));
                    }
                    r.childTokens && (c.childTokens[r.name] = r.childTokens);
                  }),
                  (e.extensions = c)),
                s.renderer)
              ) {
                var t,
                  a = D.defaults.renderer || new y(D.defaults);
                for (t in s.renderer)
                  !(function (r) {
                    var i = a[r];
                    a[r] = function () {
                      for (
                        var e = arguments.length, t = new Array(e), u = 0;
                        u < e;
                        u++
                      )
                        t[u] = arguments[u];
                      var n = s.renderer[r].apply(a, t);
                      return (n = !1 === n ? i.apply(a, t) : n);
                    };
                  })(t);
                e.renderer = a;
              }
              if (s.tokenizer) {
                var n,
                  o = D.defaults.tokenizer || new E(D.defaults);
                for (n in s.tokenizer)
                  !(function (r) {
                    var i = o[r];
                    o[r] = function () {
                      for (
                        var e = arguments.length, t = new Array(e), u = 0;
                        u < e;
                        u++
                      )
                        t[u] = arguments[u];
                      var n = s.tokenizer[r].apply(o, t);
                      return (n = !1 === n ? i.apply(o, t) : n);
                    };
                  })(n);
                e.tokenizer = o;
              }
              if (s.hooks) {
                var r,
                  l = D.defaults.hooks || new $();
                for (r in s.hooks)
                  !(function (r) {
                    var i = l[r];
                    $.passThroughHooks.has(r)
                      ? (l[r] = function (e) {
                          return D.defaults.async
                            ? Promise.resolve(s.hooks[r].call(l, e)).then(
                                function (e) {
                                  return i.call(l, e);
                                }
                              )
                            : ((e = s.hooks[r].call(l, e)), i.call(l, e));
                        })
                      : (l[r] = function () {
                          for (
                            var e = arguments.length, t = new Array(e), u = 0;
                            u < e;
                            u++
                          )
                            t[u] = arguments[u];
                          var n = s.hooks[r].apply(l, t);
                          return (n = !1 === n ? i.apply(l, t) : n);
                        });
                  })(r);
                e.hooks = l;
              }
              s.walkTokens &&
                ((u = D.defaults.walkTokens),
                (e.walkTokens = function (e) {
                  var t = [];
                  return (
                    t.push(s.walkTokens.call(this, e)),
                    (t = u ? t.concat(u.call(this, e)) : t)
                  );
                })),
                (D.defaults = g({}, D.defaults, e));
            }),
            this
          );
        }),
        (t.setOptions = function (e) {
          return (this.defaults = g({}, this.defaults, e)), this;
        }),
        e
      );
    })();
  function X(p, h) {
    var f = this;
    return function (e, u, n) {
      'function' == typeof u && ((n = u), (u = null));
      var t,
        r = g({}, u),
        i = ((u = g({}, f.defaults, r)), F(f, T)[T](u.silent, u.async, n));
      if (null == e)
        return i(new Error('marked(): input parameter is undefined or null'));
      if ('string' != typeof e)
        return i(
          new Error(
            'marked(): input parameter is of type ' +
              Object.prototype.toString.call(e) +
              ', string expected'
          )
        );
      if (
        ((r = n),
        (t = u) &&
          !t.silent &&
          (r &&
            console.warn(
              'marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async'
            ),
          (t.sanitize || t.sanitizer) &&
            console.warn(
              'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options'
            ),
          (!t.highlight && 'language-' === t.langPrefix) ||
            console.warn(
              'marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight.'
            ),
          t.mangle &&
            console.warn(
              'marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`.'
            ),
          t.baseUrl &&
            console.warn(
              'marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url.'
            ),
          t.smartypants &&
            console.warn(
              'marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants.'
            ),
          t.xhtml &&
            console.warn(
              'marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml.'
            ),
          t.headerIds || t.headerPrefix) &&
          console.warn(
            'marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`.'
          ),
        u.hooks && (u.hooks.options = u),
        n)
      ) {
        var s,
          a = u.highlight;
        try {
          u.hooks && (e = u.hooks.preprocess(e)), (s = p(e, u));
        } catch (e) {
          return i(e);
        }
        var o,
          l = function (t) {
            var e;
            if (!t)
              try {
                u.walkTokens && f.walkTokens(s, u.walkTokens),
                  (e = h(s, u)),
                  u.hooks && (e = u.hooks.postprocess(e));
              } catch (e) {
                t = e;
              }
            return (u.highlight = a), t ? i(t) : n(null, e);
          };
        return !a || a.length < 3
          ? l()
          : (delete u.highlight,
            s.length
              ? ((o = 0),
                f.walkTokens(s, function (u) {
                  'code' === u.type &&
                    (o++,
                    setTimeout(function () {
                      a(u.text, u.lang, function (e, t) {
                        if (e) return l(e);
                        null != t &&
                          t !== u.text &&
                          ((u.text = t), (u.escaped = !0)),
                          0 === --o && l();
                      });
                    }, 0));
                }),
                void (0 === o && l()))
              : l());
      }
      if (u.async)
        return Promise.resolve(u.hooks ? u.hooks.preprocess(e) : e)
          .then(function (e) {
            return p(e, u);
          })
          .then(function (e) {
            return u.walkTokens
              ? Promise.all(f.walkTokens(e, u.walkTokens)).then(function () {
                  return e;
                })
              : e;
          })
          .then(function (e) {
            return h(e, u);
          })
          .then(function (e) {
            return u.hooks ? u.hooks.postprocess(e) : e;
          })
          .catch(i);
      try {
        u.hooks && (e = u.hooks.preprocess(e));
        var D = p(e, u),
          c = (u.walkTokens && f.walkTokens(D, u.walkTokens), h(D, u));
        return (c = u.hooks ? u.hooks.postprocess(c) : c);
      } catch (e) {
        return i(e);
      }
    };
  }
  function G(u, n, r) {
    return function (e) {
      var t;
      if (
        ((e.message +=
          '\nPlease report this to https://github.com/markedjs/marked.'),
        u)
      )
        return (
          (t =
            '<p>An error occurred:</p><pre>' +
            D(e.message + '', !0) +
            '</pre>'),
          n ? Promise.resolve(t) : r ? void r(null, t) : t
        );
      if (n) return Promise.reject(e);
      if (!r) throw e;
      r(e);
    };
  }
  var R = new d(r.defaults);
  function I(e, t, u) {
    return R.parse(e, t, u);
  }
  (I.options = I.setOptions =
    function (e) {
      return R.setOptions(e), n((I.defaults = R.defaults)), I;
    }),
    (I.getDefaults = u),
    (I.defaults = r.defaults),
    (I.use = function () {
      return R.use.apply(R, arguments), n((I.defaults = R.defaults)), I;
    }),
    (I.walkTokens = function (e, t) {
      return R.walkTokens(e, t);
    }),
    (I.parseInline = R.parseInline),
    (I.Parser = z),
    (I.parser = z.parse),
    (I.Renderer = y),
    (I.TextRenderer = v),
    (I.Lexer = B),
    (I.lexer = B.lex),
    (I.Tokenizer = E),
    (I.Slugger = _),
    (I.Hooks = $);
  var V = (I.parse = I).options,
    J = I.setOptions,
    K = I.use,
    W = I.walkTokens,
    Y = I.parseInline,
    ee = I,
    te = z.parse,
    ue = B.lex;
  (r.Hooks = $),
    (r.Lexer = B),
    (r.Marked = d),
    (r.Parser = z),
    (r.Renderer = y),
    (r.Slugger = _),
    (r.TextRenderer = v),
    (r.Tokenizer = E),
    (r.getDefaults = u),
    (r.lexer = ue),
    (r.marked = I),
    (r.options = V),
    (r.parse = ee),
    (r.parseInline = Y),
    (r.parser = te),
    (r.setOptions = J),
    (r.use = K),
    (r.walkTokens = W);
});
