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

    dom.removeClass = function (name) {
      var cls = dom.getAttribute('class');
      var clsArr = cls.split(' ').filter(function (item) {
        return item !== name;
      });

      if (!(clsArr.indexOf(name) !== -1)) {
        dom.setAttribute('class', cls);
      }
    };

    return dom;
  }
  /**
   * 判断是否为移动设备
   * @return {Boolean}
   * */

  function isMobile() {
    return !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|webOS|Windows Phone)/i);
  }
  /**
   * 获取ICON图标
   * @param {String} type 图标类型
   * @param {String} color 图标颜色
   * @return {String} SVG图片
   * */

  function getIcon() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'info';
    var color = arguments.length > 1 ? arguments[1] : undefined;
    var icons = {
      info: "<svg class=\"svg-icon\" viewBox=\"0 0 1024 1024\" width=\"128\" height=\"128\">\n    <path d=\"M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666zM469.333333 298.666667h85.333334v85.333333h-85.333334V298.666667z m0 170.666666h85.333334v256h-85.333334v-256z\"\n    fill=\"".concat(color || '#333', "\"></path>\n</svg>"),
      error: "<svg class=\"svg-icon\" viewBox=\"0 0 1024 1024\" width=\"128\" height=\"128\">\n    <path d=\"M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m0-401.664l120.661333-120.704 60.373334 60.373334L572.330667 512l120.704 120.661333-60.373334 60.373334L512 572.330667l-120.661333 120.704-60.373334-60.373334L451.669333 512 330.965333 391.338667l60.373334-60.373334L512 451.669333z\"\n\tfill=\"".concat(color || '#f56c6c', "\"></path>\n</svg>"),
      success: "<svg class=\"svg-icon\" viewBox=\"0 0 1024 1024\" width=\"128\" height=\"128\">\n    <path d=\"M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m-42.538667-170.666666L288.426667 501.632l60.330666-60.330667 120.704 120.704 241.322667-241.365333 60.373333 60.330667L469.461333 682.666667z\"\n\tfill=\"".concat(color || '#67C23A', "\"></path>\n</svg>"),
      warning: "<svg class=\"svg-icon\" viewBox=\"0 0 1024 1024\" width=\"128\" height=\"128\">\n    <path d=\"M170.666667 853.333333v-256a341.333333 341.333333 0 1 1 682.666666 0v256h42.666667v85.333334H128v-85.333334h42.666667z m85.333333 0h512v-256a256 256 0 1 0-512 0v256z m213.333333-768h85.333334v128h-85.333334V85.333333z m374.528 119.808l60.330667 60.330667-90.453333 90.496-60.373334-60.330667 90.496-90.496zM119.808 265.472l60.330667-60.330667 90.496 90.453334L210.346667 356.010667 119.808 265.472zM298.666667 597.333333a213.333333 213.333333 0 0 1 213.333333-213.333333v85.333333a128 128 0 0 0-128 128H298.666667z\"\n\tfill=\"".concat(color || '#E6A23C', "\"></path>\n</svg>"),
      loading: "<svg class=\"svg-icon\" viewBox=\"0 0 1024 1024\" width=\"128\" height=\"128\">\n    <path d=\"M512 85.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v128a42.666667 42.666667 0 0 1-85.333334 0V128a42.666667 42.666667 0 0 1 42.666667-42.666667z m0 640a42.666667 42.666667 0 0 1 42.666667 42.666667v128a42.666667 42.666667 0 0 1-85.333334 0v-128a42.666667 42.666667 0 0 1 42.666667-42.666667z m426.666667-213.333333a42.666667 42.666667 0 0 1-42.666667 42.666667h-128a42.666667 42.666667 0 0 1 0-85.333334h128a42.666667 42.666667 0 0 1 42.666667 42.666667zM298.666667 512a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1 0-85.333334h128a42.666667 42.666667 0 0 1 42.666667 42.666667z m515.029333 301.696a42.666667 42.666667 0 0 1-60.330667 0l-90.496-90.496a42.666667 42.666667 0 0 1 60.330667-60.330667l90.496 90.453334a42.666667 42.666667 0 0 1 0 60.373333zM361.130667 361.130667a42.666667 42.666667 0 0 1-60.330667 0l-90.453333-90.453334a42.666667 42.666667 0 0 1 60.330666-60.373333l90.453334 90.496a42.666667 42.666667 0 0 1 0 60.330667zM210.346667 813.696a42.666667 42.666667 0 0 1 0-60.330667l90.496-90.496a42.666667 42.666667 0 1 1 60.330666 60.330667l-90.453333 90.496a42.666667 42.666667 0 0 1-60.373333 0zM662.869333 361.130667a42.666667 42.666667 0 0 1 0-60.330667l90.453334-90.496a42.666667 42.666667 0 0 1 60.373333 60.330667L723.2 361.130667a42.666667 42.666667 0 0 1-60.330667 0z\"\n\tfill=\"".concat(color || '#333', "\"></path>\n</svg>")
    };

    if (isMobile()) {
      icons.success = "<svg class=\"svg-icon\" viewBox=\"0 0 1024 1024\" width=\"128\" height=\"128\">\n\t\t<path d=\"M96.29969067 538.26464427c-10.6037248-10.5873408-12.31858347-27.05107627-2.97096534-38.83444907l21.8529792-27.55024213c8.95767893-11.29403733 25.71523413-14.1295616 37.5586816-6.22482774l189.15328 126.24964267c9.97676373 6.65954987 27.14938027 5.79229013 36.4642304-1.76510293l499.82122667-405.504c11.23505493-9.11496533 28.8325632-8.33836373 38.6793472 1.4942208l12.31202987 12.29346133c10.715136 10.698752 9.9352576 27.68131413-1.29652054 38.89670827l-536.45585066 535.66286506c-16.68983467 16.6658048-44.09371307 15.93617067-61.27506774-1.2189696l-233.84337066-233.49930666z\"\n\t\tfill=\"".concat(color || '#67C23A', "\"></path></svg>");
      icons.error = "<svg class=\"svg-icon\" viewBox=\"0 0 1024 1024\" width=\"128\" height=\"128\">\n\t\t<path d=\"M512 815.40740693c-18.2044448 0-30.34074027 6.06814827-42.4770368 18.2044448s-18.2044448 24.27259307-18.2044448 42.4770368 6.06814827 30.34074027 18.2044448 42.47703787 24.27259307 18.2044448 42.4770368 18.20444373 30.34074027-6.06814827 42.4770368-18.20444373 18.2044448-24.27259307 18.2044448-42.47703787-6.06814827-30.34074027-18.2044448-42.4770368-24.27259307-18.2044448-42.4770368-18.2044448zM457.38666667 87.22962987l18.2044448 618.9511104h66.7496288L566.61333333 87.22962987H457.38666667z\"\n\t\tfill=\"".concat(color || '#f56c6c', "\"></path></svg>");
    }

    return icons[type];
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
    function Message() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Message);

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
        this.target.show();
      }
    }, {
      key: "hide",
      value: function hide() {
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
      value: function setType(name, color) {
        if (name) {
          this.target.addClass(name);
        }

        this.icon.innerHTML = getIcon(name, color);
      }
    }]);

    return Message;
  }();
  var message = {
    install: function install(aBox) {
      var messageList;
      var example;
      var loadingExample;
      var exampleTimer;

      if (isMobile()) {
        example = new Message();
        loadingExample = new Message();
        example.hide();
        loadingExample.hide();
        aBox.rootDom.appendChild(loadingExample.target);
        aBox.rootDom.appendChild(example.target);
      } else {
        messageList = createDom({
          className: "a-box-message-list",
          style: {
            display: 'none'
          }
        });

        messageList.close = function () {
          if (messageList.childNodes.length === 0) {
            messageList.hide();
          }
        };

        aBox.rootDom.appendChild(messageList);
      } // PC端展示形式


      function pcMessage() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$content = _ref.content,
            content = _ref$content === void 0 ? '' : _ref$content,
            _ref$timer = _ref.timer,
            timer = _ref$timer === void 0 ? 2000 : _ref$timer,
            _ref$type = _ref.type,
            type = _ref$type === void 0 ? 'info' : _ref$type,
            _ref$close = _ref.close;

        var example = new Message({
          content: content,
          type: type
        });

        function hide() {
          example.target.addClass('hide');
          setTimeout(function () {
            messageList.removeChild(example.target);
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
      } // 移动端展示形式


      function mobileMessage() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$content = _ref2.content,
            content = _ref2$content === void 0 ? '' : _ref2$content,
            _ref2$timer = _ref2.timer,
            timer = _ref2$timer === void 0 ? 2000 : _ref2$timer,
            _ref2$type = _ref2.type,
            type = _ref2$type === void 0 ? 'success' : _ref2$type,
            _ref2$close = _ref2.close;

        example.setBody(content);
        example.target.setAttribute('class', 'a-box-container mobile');
        example.setType(type, '#fff');

        function hide() {
          example.hide();
        }

        clearTimeout(exampleTimer);
        exampleTimer = setTimeout(function () {
          hide();
        }, timer);
        example.show();
        return {
          example: example,
          hide: hide
        };
      }

      aBox.message = function () {
        if (isMobile()) {
          return mobileMessage.apply(void 0, arguments);
        } else {
          return pcMessage.apply(void 0, arguments);
        }
      };

      function selectorLoading() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            selector = _ref3.selector,
            content = _ref3.content;

        var dom = selector;
        var example = new Message({
          content: content,
          type: 'loading'
        });

        function setContent(content) {
          example.setBody(content);
        }

        function hide() {
          example.target.addClass('hide');
          setTimeout(function () {
            example.hide();
            dom.removeChild(example.target);
          }, 300);
        }

        if (typeof selector === 'string') {
          dom = document.querySelector(selector);
        }

        example.target.addClass('local-loading');
        dom.appendChild(example.target);
        example.show();
        return {
          example: example,
          setContent: setContent,
          hide: hide
        };
      }

      function pcLoading() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            content = _ref4.content,
            mask = _ref4.mask;

        var example = new Message({
          content: content,
          type: 'loading'
        });
        var cover = aBox.createCover({
          opacity: 0
        });

        if (mask) {
          cover.show();
        }

        function setContent(content) {
          example.setBody(content);
        }

        function hide() {
          example.target.addClass('hide');

          if (mask) {
            cover.hide();
          }

          setTimeout(function () {
            messageList.removeChild(example.target);
            messageList.close();
          }, 300);
        }

        messageList.appendChild(example.target);
        messageList.show();
        example.show();
        return {
          example: example,
          setContent: setContent,
          hide: hide
        };
      }

      function mobileLoading() {
        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            content = _ref5.content,
            mask = _ref5.mask;

        loadingExample.setBody(content);
        loadingExample.target.setAttribute('class', 'a-box-container mobile');
        loadingExample.setType('loading', '#fff');
        var cover = aBox.createCover({
          opacity: 0
        });

        if (mask) {
          cover.show();
        }

        function setContent(content) {
          loadingExample.setBody(content);
        }

        function hide() {
          loadingExample.target.addClass('hide');

          if (mask) {
            cover.hide();
          }

          setTimeout(function () {
            loadingExample.hide();
          }, 300);
        }

        loadingExample.show();
        return {
          example: loadingExample,
          setContent: setContent,
          hide: hide
        };
      }

      aBox.loading = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (args[0].selector) {
          return selectorLoading.apply(void 0, args);
        } else if (isMobile()) {
          return mobileLoading.apply(void 0, args);
        } else {
          return pcLoading.apply(void 0, args);
        }
      };
    }
  };

  var cName = 'notice';

  var Notice = /*#__PURE__*/function (_Message) {
    _inherits(Notice, _Message);

    var _super = _createSuper(Notice);

    function Notice() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Notice);

      _this = _super.call(this, options);

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
        if (noticeList.childNodes.length === 0) {
          noticeList.hide();
        }
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

        var example = new Notice({
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

        var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var cover = createDom({
          className: 'a-box-cover'
        });

        for (var i in style) {
          if (style.hasOwnProperty(i)) {
            cover.style[i] = style[i];
          }
        }

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
