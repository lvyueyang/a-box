/**
原生js开发的自适应的提示框插件
内置 alert prompt confirm message loading notice 
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ABox = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  /**
   * 创建dom节点
   * @param {String} className 节点Class
   * @param {String} tagName 节点标签名
   * @param {String} style 节点内联style
   * @return Node
   * */
  function createDom() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$className = _ref.className,
        className = _ref$className === void 0 ? '' : _ref$className,
        _ref$tagName = _ref.tagName,
        tagName = _ref$tagName === void 0 ? 'div' : _ref$tagName,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? {} : _ref$style;

    var dom = document.createElement(tagName);
    dom.setAttribute('class', className);

    for (var i in style) {
      if (style.hasOwnProperty(i)) {
        dom.style[i] = style[i];
      }
    }

    dom.show = function () {
      dom.style.display = '';
    };

    dom.hide = function () {
      dom.style.display = 'none';
    };

    dom.addClass = function (name) {
      var cls = dom.getAttribute('class');
      var clsArr = cls.split(' ');

      if (!(clsArr.indexOf(name) !== -1)) {
        dom.setAttribute('class', cls + ' ' + name);
      }
    };

    return dom;
  }

  var htmlStr = "\n<div class=\"a-box-header\"></div>\n<div class=\"a-box-body\"></div>\n<div class=\"a-box-footer\"></div>\n";

  var Modal = /*#__PURE__*/function () {
    function Modal(aBox) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Modal);

      this.aBox = aBox;
      this.options = options;
      this.createTarget();
    }

    _createClass(Modal, [{
      key: "createTarget",
      value: function createTarget() {
        var target = createDom({
          className: 'a-box-modal-container',
          style: {
            display: 'none'
          }
        });
        target.innerHTML = htmlStr;
        this.target = target;
        this.header = target.querySelector('.a-box-header');
        this.body = target.querySelector('.a-box-body');
        this.footer = target.querySelector('.a-box-footer');
        var _this$options = this.options,
            title = _this$options.title,
            content = _this$options.content;
        this.setTitle(title);
        this.setBody(content);
      }
    }, {
      key: "createBtn",
      value: function createBtn(name, htmlStr) {
        var btn = createDom({
          className: "a-box-btn ".concat(name),
          tagName: 'button'
        });
        btn.innerHTML = htmlStr;
        this.footer.appendChild(btn);
        return btn;
      }
    }, {
      key: "show",
      value: function show() {
        this.aBox.rootDom.appendChild(this.target);
        this.target.show();
      }
    }, {
      key: "hide",
      value: function hide() {
        this.aBox.rootDom.removeChild(this.target);
        this.target.hide();
      }
    }, {
      key: "setTitle",
      value: function setTitle(htmlStr) {
        if (htmlStr) {
          this.header.innerHTML = htmlStr;
        } else {
          this.target.removeChild(this.header);
        }
      }
    }, {
      key: "setBody",
      value: function setBody() {
        var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (typeof html === 'string') {
          this.body.innerHTML = html;
        }

        if (_typeof(html) === 'object') {
          this.body.appendChild(html);
        }
      }
    }]);

    return Modal;
  }();

  var noneFn = function noneFn() {};

  var alert = {
    install: function install(aBox) {
      aBox.alert = function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$title = _ref.title,
            title = _ref$title === void 0 ? '' : _ref$title,
            _ref$content = _ref.content,
            content = _ref$content === void 0 ? '' : _ref$content,
            _ref$confirmText = _ref.confirmText,
            confirmText = _ref$confirmText === void 0 ? '确定' : _ref$confirmText,
            _ref$confirm = _ref.confirm,
            confirm = _ref$confirm === void 0 ? noneFn : _ref$confirm;

        var cover = aBox.createCover();
        cover.show();
        var example = new Modal(aBox, {
          title: title,
          content: content
        });
        example.target.addClass('a-box-alert');

        function hide() {
          cover.hide();
          example.hide();
        }

        var confirmBtn = example.createBtn('a-box-confirm-btn', confirmText);
        confirmBtn.addEventListener('click', function () {
          confirm();
          hide();
        });
        example.show();
        return {
          example: example,
          hide: hide
        };
      };
    }
  };

  var noneFn$1 = function noneFn() {};

  var confirm = {
    install: function install(aBox) {
      aBox.confirm = function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$title = _ref.title,
            title = _ref$title === void 0 ? '' : _ref$title,
            _ref$content = _ref.content,
            content = _ref$content === void 0 ? '' : _ref$content,
            _ref$confirmText = _ref.confirmText,
            confirmText = _ref$confirmText === void 0 ? '确定' : _ref$confirmText,
            _ref$confirm = _ref.confirm,
            confirm = _ref$confirm === void 0 ? noneFn$1 : _ref$confirm,
            _ref$cancelText = _ref.cancelText,
            cancelText = _ref$cancelText === void 0 ? '取消' : _ref$cancelText,
            _ref$cancel = _ref.cancel,
            cancel = _ref$cancel === void 0 ? noneFn$1 : _ref$cancel;

        var cover = aBox.createCover();
        cover.show();
        var example = new Modal(aBox, {
          title: title,
          content: content
        });
        example.target.addClass('a-box-confirm');

        function hide() {
          cover.hide();
          example.hide();
        }

        var cancelBtn = example.createBtn('a-box-cancel-btn', cancelText);
        var confirmBtn = example.createBtn('a-box-confirm-btn', confirmText);
        confirmBtn.addEventListener('click', function () {
          confirm();
          hide();
        });
        cancelBtn.addEventListener('click', function () {
          cancel();
          hide();
        });
        example.show();
        return {
          example: example,
          hide: hide
        };
      };
    }
  };

  var noneFn$2 = function noneFn() {};

  var prompt = {
    install: function install(aBox) {
      aBox.prompt = function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$title = _ref.title,
            title = _ref$title === void 0 ? '' : _ref$title,
            _ref$type = _ref.type,
            type = _ref$type === void 0 ? 'text' : _ref$type,
            _ref$placeholder = _ref.placeholder,
            placeholder = _ref$placeholder === void 0 ? '请输入' : _ref$placeholder,
            _ref$confirmText = _ref.confirmText,
            confirmText = _ref$confirmText === void 0 ? '确定' : _ref$confirmText,
            _ref$confirm = _ref.confirm,
            confirm = _ref$confirm === void 0 ? noneFn$2 : _ref$confirm,
            _ref$cancelText = _ref.cancelText,
            cancelText = _ref$cancelText === void 0 ? '取消' : _ref$cancelText,
            _ref$cancel = _ref.cancel,
            cancel = _ref$cancel === void 0 ? noneFn$2 : _ref$cancel;

        var cover = aBox.createCover();
        cover.show();
        var example = new Modal(aBox, {
          title: title
        });
        example.target.addClass('a-box-prompt');

        function hide() {
          cover.hide();
          example.hide();
        }

        var input;

        if (type === 'textarea') {
          input = createDom({
            className: 'a-box-input',
            tagName: 'textarea'
          });
        } else {
          input = createDom({
            className: 'a-box-input',
            tagName: 'input'
          });
          input.type = type;
        }

        input.placeholder = placeholder;
        example.setBody(input);
        var cancelBtn = example.createBtn('a-box-cancel-btn', cancelText);
        var confirmBtn = example.createBtn('a-box-confirm-btn', confirmText);
        confirmBtn.addEventListener('click', function () {
          confirm(input.value);
          hide();
        });
        cancelBtn.addEventListener('click', function () {
          cancel();
          hide();
        });
        example.show();
        return {
          example: example,
          hide: hide
        };
      };
    }
  };

  var Message = /*#__PURE__*/function () {
    function Message(rootDom) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Message);

      this.rootDom = rootDom;
      this.options = options;
      this.createTarget();
    }

    _createClass(Message, [{
      key: "createTarget",
      value: function createTarget() {
        var target = createDom({
          className: "a-box-container"
        });
        var wrap = createDom({
          className: "a-box-wrap"
        });
        var icon = createDom({
          className: "a-box-icon"
        });
        var body = createDom({
          className: "a-box-body"
        });
        var close = createDom({
          className: "a-box-close"
        });
        wrap.appendChild(icon);
        wrap.appendChild(body);
        wrap.appendChild(close);
        target.appendChild(wrap);
        this.wrap = wrap;
        this.body = body;
        this.icon = icon;
        this.close = close;
        this.target = target;
        var _this$options = this.options,
            content = _this$options.content,
            type = _this$options.type;
        this.setType(type);
        this.setBody(content);
      }
    }, {
      key: "show",
      value: function show() {
        this.rootDom.appendChild(this.target);
        this.target.show();
      }
    }, {
      key: "hide",
      value: function hide() {
        this.rootDom.removeChild(this.target);
        this.target.hide();
      }
    }, {
      key: "setBody",
      value: function setBody() {
        var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        this.body.innerHTML = html;
      }
    }, {
      key: "setType",
      value: function setType(name) {
        this.target.addClass("a-box-item " + name);
      }
    }]);

    return Message;
  }();
  var message = {
    install: function install(aBox) {
      var messageList = createDom({
        className: "a-box-message-list",
        style: {
          display: 'none'
        }
      });

      messageList.close = function () {
        console.dir(messageList);
      };

      aBox.rootDom.appendChild(messageList);

      aBox.message = function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$content = _ref.content,
            content = _ref$content === void 0 ? '' : _ref$content,
            _ref$timer = _ref.timer,
            timer = _ref$timer === void 0 ? 2000 : _ref$timer,
            _ref$type = _ref.type,
            type = _ref$type === void 0 ? 'info' : _ref$type,
            _ref$close = _ref.close;

        var example = new Message(messageList, {
          content: content,
          type: type
        });

        function hide() {
          example.target.addClass('hide');
          setTimeout(function () {
            example.hide();
            messageList.close();
          }, 300);
        }

        setTimeout(function () {
          hide();
        }, timer);
        messageList.appendChild(example.target);
        messageList.show();
        example.show();
        return {
          example: example,
          hide: hide
        };
      };
    }
  };

  var cName = 'notice';

  var Notice = /*#__PURE__*/function (_Message) {
    _inherits(Notice, _Message);

    var _super = _createSuper(Notice);

    function Notice(rootDom) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Notice);

      _this = _super.call(this, rootDom, options);

      _this.createTarget();

      var title = createDom({
        className: "a-box-title"
      });
      _this.title = title;

      _this.wrap.appendChild(title);

      _this.wrap.insertBefore(title, _this.icon);

      _this.setTitle(options.title);

      return _this;
    }

    _createClass(Notice, [{
      key: "setTitle",
      value: function setTitle(text) {
        if (text) {
          this.title.innerHTML = text;
        } else {
          this.target.removeChild(this.title);
        }
      }
    }]);

    return Notice;
  }(Message);

  var notice = {
    install: function install(aBox) {
      var noticeList = createDom({
        className: "a-box-".concat(cName, "-list"),
        style: {
          display: 'none'
        }
      });

      noticeList.close = function () {
        console.dir(noticeList);
      };

      aBox.rootDom.appendChild(noticeList);

      aBox.notice = function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$title = _ref.title,
            title = _ref$title === void 0 ? '' : _ref$title,
            _ref$content = _ref.content,
            content = _ref$content === void 0 ? '' : _ref$content,
            _ref$timer = _ref.timer,
            timer = _ref$timer === void 0 ? 2000 : _ref$timer,
            _ref$type = _ref.type,
            type = _ref$type === void 0 ? 'info' : _ref$type,
            _ref$close = _ref.close;

        var example = new Notice(noticeList, {
          content: content,
          title: title,
          type: type
        });

        function hide() {
          example.target.addClass('hide');
          setTimeout(function () {
            example.hide();
            noticeList.close();
          }, 300);
        }

        setTimeout(function () {
          hide();
        }, timer);
        noticeList.appendChild(example.target);
        noticeList.show();
        example.show();
        return {
          example: example,
          hide: hide
        };
      };
    }
  };

  var ABox = /*#__PURE__*/function () {
    function ABox() {
      _classCallCheck(this, ABox);

      this.init();
      this.use(alert);
      this.use(confirm);
      this.use(prompt);
      this.use(message);
      this.use(notice);
    }

    _createClass(ABox, [{
      key: "init",
      value: function init() {
        this.createRootContainer();
      } // 创建根容器

    }, {
      key: "createRootContainer",
      value: function createRootContainer() {
        var rootDom = createDom({
          className: 'a-box-root-container'
        });
        document.body.appendChild(rootDom);
        this.rootDom = rootDom;
      } // 创建浮层

    }, {
      key: "createCover",
      value: function createCover() {
        var _this = this;

        var cover = createDom({
          className: 'a-box-cover'
        });

        cover.show = function () {
          return _this.rootDom.appendChild(cover);
        };

        cover.hide = function () {
          return _this.rootDom.removeChild(cover);
        };

        return cover;
      }
    }, {
      key: "use",
      value: function use(c) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        c.install.apply(c, [this].concat(args));
      }
    }]);

    return ABox;
  }();

  return ABox;

})));
//# sourceMappingURL=a-box.js.map
