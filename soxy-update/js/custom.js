(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initAccountWishlist", {
  enumerable: true,
  get: function get() {
    return _wishlist["default"];
  }
});
exports["default"] = void 0;

var _wishlist = _interopRequireDefault(require("./wishlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  initAccountWishlist: _wishlist["default"]
};
exports["default"] = _default;

},{"./wishlist":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAccountWishlist = initAccountWishlist;
exports["default"] = void 0;

function deleteProductFromView(id) {
  if (!id) return;
  var wishlistProducts = document.getElementById('account-wishlist-list');

  if (wishlistProducts) {
    var elements = wishlistProducts.children;
    if (!elements || !elements.length) return;

    for (var i = 0; i < elements.length; i++) {
      if (elements[i] && elements[i].dataset && elements[i].dataset.id + '' === id + '') {
        wishlistProducts.removeChild(elements[i]);
        break;
      }
    }
  }
}

function deleteWishlistProduct(id) {
  if (!id) return Promise.resolve();
  var baseUrl = '/wishlist';
  return $.ajax({
    url: baseUrl,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: {
      product_id: id
    }
  }).then(function (response, textStatus, jqXHR) {
    if (response && response.status === 'success') {
      deleteProductFromView(id);
    }

    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('deleteWishlistProduct failed', error || jqXHR);
    return null;
  }).then(function (result) {
    return result;
  });
}

function onWishlistProductsClick(event) {
  var target = event.target;

  if (target.nodeName.toLowerCase() !== 'button') {
    target = target.closest('BUTTON');
  }

  if (!target) return;
  var wishlistProducts = this;

  if (target.nodeName.toLowerCase() === 'button') {
    if (target.dataset && target.dataset["delete"]) {
      var id = +target.dataset["delete"] || target.dataset["delete"];
      target.disabled = true;
      deleteWishlistProduct(id).then(function (response) {})["catch"](function (err) {
        if (target) {
          target.disabled = false;
        }

        console.log(err);
      });
    }
  }
}

function initAccountWishlist() {
  var wishlistProducts = document.getElementById('account-wishlist-list');

  if (wishlistProducts) {
    wishlistProducts.addEventListener('click', onWishlistProductsClick);
  }
}

var _default = initAccountWishlist;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLogin = showLogin;
exports.showRegister = showRegister;
exports.showResult = showResult;
exports.initAuth = initAuth;
exports["default"] = void 0;

function changeView(view, status, message) {
  var login = document.getElementById('login-form');
  var register = document.getElementById('register-form');
  var result = document.getElementById('auth-result');
  var resultSuccess = document.getElementById('auth-success');
  var resultConfirm = document.getElementById('auth-confirm');
  var resultError = document.getElementById('auth-error');

  if (login) {
    if (view === 'login') {
      login.hidden = false;
      login.classList ? login.classList.remove('hidden') : login.className.replace(/\bhidden\b/gi, '');
    } else {
      login.hidden = true;
      login.classList ? login.classList.add('hidden') : login.className += ' hidden';
    }
  }

  if (register) {
    if (view === 'register') {
      register.hidden = false;
      register.classList ? register.classList.remove('hidden') : register.className.replace(/\bhidden\b/gi, '');
    } else {
      register.hidden = true;
      register.classList ? register.classList.add('hidden') : register.className += ' hidden';
    }
  }

  if (result) {
    if (status === 'success' && resultSuccess) {
      resultSuccess.hidden = false;
      resultSuccess.classList ? resultSuccess.classList.remove('hidden') : resultSuccess.className.replace(/\bhidden\b/gi, '');
    } else {
      resultSuccess.hidden = true;
      resultSuccess.classList ? resultSuccess.classList.add('hidden') : resultSuccess.className += ' hidden';
    }

    if (status === 'confirm' && resultConfirm) {
      resultConfirm.hidden = false;
      resultConfirm.classList ? resultConfirm.classList.remove('hidden') : resultConfirm.className.replace(/\bhidden\b/gi, '');
    } else {
      resultConfirm.hidden = true;
      resultConfirm.classList ? resultConfirm.classList.add('hidden') : resultConfirm.className += ' hidden';
    }

    if (status === 'error' && resultError) {
      resultError.hidden = false;
      resultError.classList ? resultError.classList.remove('hidden') : resultError.className.replace(/\bhidden\b/gi, '');
      resultError.innerHTML = message || 'Oops! Something went wrong.';
    } else {
      resultError.hidden = true;
      resultError.classList ? resultError.classList.add('hidden') : resultError.className += ' hidden';
    }

    if (view === 'result') {
      result.hidden = false;
      result.classList ? result.classList.remove('hidden') : result.className.replace(/\bhidden\b/gi, '');
    } else {
      result.hidden = true;
      result.classList ? result.classList.add('hidden') : result.className += ' hidden';
    }
  }
}

function onAuthClick(event) {
  var target = event.target;

  if (target.nodeName.toLowerCase() !== 'button' && target.nodeName.toLowerCase() !== 'a') {
    target = target.closest('BUTTON') || target.closest('A');
  }

  if (!target) return;

  if (target.nodeName.toLowerCase() === 'button' || target.nodeName.toLowerCase() === 'a') {
    if (target.dataset && target.dataset.view) {
      event.preventDefault();
      var view = target.dataset.view;
      target.blur();
      changeView(view);
    }
  }
}

function showLogin() {
  changeView('login');
}

function showRegister() {
  changeView('register');
}

function showResult(status, message) {
  changeView('result', status, message);
}

function initAuth() {
  var auth = document.getElementById('auth-container');

  if (auth) {
    auth.addEventListener('click', onAuthClick);
  }

  var wishModal = document.getElementById('add-to-wishlist-modal');

  if (wishModal) {
    $(wishModal).on('hidden.bs.modal', function (e) {
      showRegister();
    });
  }
}

var _default = initAuth;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initAuth", {
  enumerable: true,
  get: function get() {
    return _auth["default"];
  }
});
Object.defineProperty(exports, "initLoginForm", {
  enumerable: true,
  get: function get() {
    return _login["default"];
  }
});
Object.defineProperty(exports, "initRegisterForm", {
  enumerable: true,
  get: function get() {
    return _register["default"];
  }
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _login = _interopRequireDefault(require("./login"));

var _register = _interopRequireDefault(require("./register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  initAuth: _auth["default"],
  initLoginForm: _login["default"],
  initRegisterForm: _register["default"]
};
exports["default"] = _default;

},{"./auth":3,"./login":5,"./register":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLoginForm = initLoginForm;
exports["default"] = void 0;

var _auth = require("./auth");

var loading = false;
var formElements = {};

function sendLogin(data) {
  if (loading) return;
  loading = true;
  var baseUrl = '/login/attempt';
  var loginSubmit = document.getElementById('login-submit');

  if (loginSubmit) {
    loginSubmit.blur();
    loginSubmit.disabled = true;
  }

  return $.ajax({
    url: baseUrl,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: data
  }).then(function (response, textStatus, jqXHR) {
    loading = false;

    if (loginSubmit) {
      loginSubmit.disabled = false;
    }

    (0, _auth.showResult)('confirm');
    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('sendLogin failed', error || jqXHR);
    loading = false;

    if (loginSubmit) {
      loginSubmit.disabled = false;
    }

    (0, _auth.showResult)('error', jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.message);
    return null;
  });
}

function validateFormElement(element) {
  if (!element || !element.validity) {
    return false;
  }

  var patternEmpty = /[^\s]+/; // string full of spaces

  if (element.required && (element.value === '' || !patternEmpty.test(element.value))) {
    return false;
  }

  if (!element.validity.valid) {
    return false;
  }

  return true;
}

function validateForm(formElements) {
  var valid = true;

  for (var key in formElements) {
    if (formElements.hasOwnProperty(key) && formElements[key] && formElements[key].elements) {
      var elements = formElements[key].elements;

      if (!elements || !elements.length) {
        console.log('no elements');
        return true;
      }

      var element = null;
      var checked = false;

      for (var i = 0; i < elements.length; i++) {
        element = elements[i];

        if (!element || !element.validity) {
          console.log('no validation');
          return true;
        }

        if (element.type === 'radio' || element.type === 'checkbox') {
          checked = checked || element.checked;
        } else {
          var label = element.closest('label');

          if (validateFormElement(element)) {
            element.classList.remove('invalid');

            if (label) {
              label.classList.remove('invalid');
            }
          } else {
            element.classList.add('invalid');

            if (label) {
              label.classList.add('invalid');
            }

            valid = false;
          }
        }
      }

      if (element.type === 'radio' || element.type === 'checkbox') {
        if (element.required && !checked) {
          valid = false;
        }
      }
    }
  }

  return valid;
}

function onInput(event) {
  var element = event.target;

  if (!element || !element.validity) {
    return;
  }

  element.classList ? element.classList.remove('is-invalid') : element.className.replace(/\bis-invalid\b/gi, '');
}

function onChange(event) {
  var element = event.target;

  if (!element || !element.validity) {
    return;
  }

  var group = element.closest('.form-group');

  if (group) {
    group.classList ? group.classList.add('was-validated') : group.className += ' was-validated';
  }
}

function prepareForm() {
  var data = {};

  for (var key in formElements) {
    if (formElements.hasOwnProperty(key) && formElements[key]) {
      var elements = formElements[key].elements;

      if (!elements || !elements.length) {
        continue;
      }

      var element = null;

      for (var i = 0; i < elements.length; i++) {
        element = elements[i];

        if (!element) {
          continue;
        }

        if (element.type === 'radio' || element.type === 'checkbox') {
          if (element.checked) {
            data[formElements[key].name] = element.value || element.checked;
          }
        } else {
          data[formElements[key].name] = element.value;
        }
      }
    }
  }

  return data;
}

function onSubmit(event) {
  event && event.preventDefault();
  var form = event && (event.currentTarget || event.target) || document.getElementById('login-form');
  if (!form) return;
  var id;

  if (form.dataset) {
    id = +form.dataset.id || '';
  }

  form.classList ? form.classList.add('was-validated') : form.className += ' was-validated';

  if (validateForm(formElements)) {
    sendLogin(prepareForm());
  } else {
    var submitBtn = document.getElementById('login-submit');
    submitBtn && submitBtn.blur();
  }
}

function initLoginForm() {
  var loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.setAttribute('novalidate', 'novalidate');
    var inputs = loginForm.getElementsByTagName('INPUT');

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        if (formElements.hasOwnProperty(inputs[i].name) && formElements[inputs[i].name]) {
          formElements[inputs[i].name].elements.push(inputs[i]);
        } else {
          formElements[inputs[i].name] = {
            elements: [inputs[i]],
            type: inputs[i].type,
            name: inputs[i].name,
            required: inputs[i].required,
            pattern: inputs[i].pattern,
            minLength: inputs[i].minLength,
            maxLength: inputs[i].maxLength
          };
        }
      }
    }

    loginForm.addEventListener('input', onInput);
    loginForm.addEventListener('change', onChange);
    loginForm.addEventListener('submit', onSubmit);
  }
}

var _default = initLoginForm;
exports["default"] = _default;

},{"./auth":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRegisterForm = initRegisterForm;
exports["default"] = void 0;

var _auth = require("./auth");

var loading = false;
var formElements = {};

function sendRegister(data) {
  if (loading) return;
  loading = true;
  var baseUrl = '/register';
  var registerSubmit = document.getElementById('register-submit');

  if (registerSubmit) {
    registerSubmit.blur();
    registerSubmit.disabled = true;
  }

  return $.ajax({
    url: baseUrl,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: data
  }).then(function (response, textStatus, jqXHR) {
    loading = false;

    if (registerSubmit) {
      registerSubmit.disabled = false;
    }

    (0, _auth.showResult)('success');
    setHeaderAuth(data.product_id);
    setProductsAuth(data.product_id);
    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('sendRegister failed', error || jqXHR);
    loading = false;

    if (registerSubmit) {
      registerSubmit.disabled = false;
    }

    (0, _auth.showResult)('error', jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.message);
    return null;
  });
}

function setProductsAuth(id) {
  var list = document.getElementById('collection-list');

  if (list && list.dataset) {
    list.dataset.auth = true;
  }

  var products = document.getElementsByClassName('js-product-wish');

  if (products && products.length) {
    for (var i = 0; i < products.length; i++) {
      if (products[i] && products[i].dataset) {
        products[i].dataset.auth = true;
        products[i].dataset.toggle = null;
        products[i].dataset.target = null;

        if (id && '' + id === '' + products[i].dataset.wish) {
          if (products[i].className.split(/\s+/g).indexOf('active') > -1) {
            products[i].classList ? products[i].classList.remove('active') : products[i].className.replace(/\bactive\b/gi, '');
          } else {
            products[i].classList ? products[i].classList.add('active') : products[i].className += ' active';
          }
        }
      }
    }
  }
}

function setHeaderAuth(id) {
  var headerWishLink = document.getElementById('header-wish-link');

  if (headerWishLink) {
    if (headerWishLink.className.split(/\s+/g).indexOf('hidden') > -1) {
      headerWishLink.classList ? headerWishLink.classList.remove('hidden') : headerWishLink.className.replace(/\bhidden\b/gi, '');
    } else {
      headerWishLink.classList ? headerWishLink.classList.add('hidden') : headerWishLink.className += ' hidden';
    }
  }
}

function validateFormElement(element) {
  if (!element || !element.validity) {
    return false;
  }

  var patternEmpty = /[^\s]+/; // string full of spaces

  if (element.required && (element.value === '' || !patternEmpty.test(element.value))) {
    return false;
  }

  if (!element.validity.valid) {
    return false;
  }

  return true;
}

function validateForm(formElements) {
  var valid = true;

  for (var key in formElements) {
    if (formElements.hasOwnProperty(key) && formElements[key] && formElements[key].elements) {
      var elements = formElements[key].elements;

      if (!elements || !elements.length) {
        console.log('no elements');
        return true;
      }

      var element = null;
      var checked = false;

      for (var i = 0; i < elements.length; i++) {
        element = elements[i];

        if (!element || !element.validity) {
          console.log('no validation');
          return true;
        }

        if (element.type === 'radio' || element.type === 'checkbox') {
          checked = checked || element.checked;
        } else {
          var label = element.closest('label');

          if (validateFormElement(element)) {
            element.classList.remove('invalid');

            if (label) {
              label.classList.remove('invalid');
            }
          } else {
            element.classList.add('invalid');

            if (label) {
              label.classList.add('invalid');
            }

            valid = false;
          }
        }
      }

      if (element.type === 'radio' || element.type === 'checkbox') {
        if (element.required && !checked) {
          valid = false;
        }
      }
    }
  }

  return valid;
}

function onInput(event) {
  var element = event.target;

  if (!element || !element.validity) {
    return;
  }

  element.classList ? element.classList.remove('is-invalid') : element.className.replace(/\bis-invalid\b/gi, '');
}

function onChange(event) {
  var element = event.target;

  if (!element || !element.validity) {
    return;
  }

  var group = element.closest('.form-group');

  if (group) {
    group.classList ? group.classList.add('was-validated') : group.className += ' was-validated';
  }
}

function prepareForm() {
  var data = {};

  for (var key in formElements) {
    if (formElements.hasOwnProperty(key) && formElements[key]) {
      var elements = formElements[key].elements;

      if (!elements || !elements.length) {
        continue;
      }

      var element = null;

      for (var i = 0; i < elements.length; i++) {
        element = elements[i];

        if (!element) {
          continue;
        }

        if (element.type === 'radio' || element.type === 'checkbox') {
          if (element.checked) {
            data[formElements[key].name] = element.value || element.checked;
          }
        } else {
          data[formElements[key].name] = element.value;
        }
      }
    }
  }

  return data;
}

function onSubmit(event) {
  event && event.preventDefault();
  var form = event && (event.currentTarget || event.target) || document.getElementById('register-form');
  if (!form) return;
  var id;

  if (form.dataset) {
    id = +form.dataset.id || '';
  }

  form.classList ? form.classList.add('was-validated') : form.className += ' was-validated';

  if (validateForm(formElements)) {
    sendRegister(prepareForm());
  } else {
    var submitBtn = document.getElementById('register-submit');
    submitBtn && submitBtn.blur();
  }
}

function initRegisterForm() {
  var registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.setAttribute('novalidate', 'novalidate');
    var inputs = registerForm.getElementsByTagName('INPUT');

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        if (formElements.hasOwnProperty(inputs[i].name) && formElements[inputs[i].name]) {
          formElements[inputs[i].name].elements.push(inputs[i]);
        } else {
          formElements[inputs[i].name] = {
            elements: [inputs[i]],
            type: inputs[i].type,
            name: inputs[i].name,
            required: inputs[i].required,
            pattern: inputs[i].pattern,
            minLength: inputs[i].minLength,
            maxLength: inputs[i].maxLength
          };
        }
      }
    }

    registerForm.addEventListener('input', onInput);
    registerForm.addEventListener('change', onChange);
    registerForm.addEventListener('submit', onSubmit);
  }
}

var _default = initRegisterForm;
exports["default"] = _default;

},{"./auth":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPageCart = initPageCart;
exports["default"] = void 0;

function deleteProduct(id) {
  var baseUrl = '/cart';
  return $.ajax({
    url: baseUrl + '/delete/' + id,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  }).then(function (response, textStatus, jqXHR) {
    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('deleteProduct failed', id);
    return null;
  }).then(function (result) {
    return result;
  });
}

function updateProductQty(id, diff, qty) {
  var baseUrl = '/cart';
  var data = {
    productId: id
  };
  var url = baseUrl;

  if (qty) {
    url += '/edit-quantity';
    data.quantity = qty;
  } else {
    if (diff > 0) {
      url += '/increase';
    } else {
      url += '/decrease';
    }
  }

  return $.ajax({
    url: url,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: data
  }).then(function (response, textStatus, jqXHR) {
    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('updateProductQty failed', id);
    return null;
  }).then(function (result) {
    return result;
  });
}

function deleteHeaderCartProduct(id) {
  var cartList = document.getElementById('header-cart-list');

  if (cartList) {
    var nodes = cartList.children;

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] && nodes[i].dataset) {
        var node = nodes[i];
        var nodeId = parseFloat(node.dataset && +node.dataset.id || '');

        if (nodeId === id) {
          cartList.removeChild(node);
        }
      }
    }
  }
}

function getCartData(node, index) {
  if (!node || !node.dataset || index < 0) return;
  var id = parseFloat(node.dataset && +node.dataset.id || '');
  var qty = parseFloat(node.dataset && node.dataset.qty || 0);
  var price = parseFloat(node.dataset && node.dataset.price || 0);
  var cost = qty * price;
  var elementCostList = node.getElementsByClassName('cart-page__cost');
  var elementCost;

  if (elementCostList && elementCostList.length) {
    elementCost = elementCostList[0];
  }

  var totalQty = 0;
  var totalCost = 0;
  var shippingThreshold = 0;
  var shippingMin = 0;
  var shippingMax = 0;
  var elementTotalQty = document.getElementById('cart-page-qty');
  var elementTotalCost = document.getElementById('summary-cost');
  var elementSubTotal = document.getElementById('summary-subtotal');
  var elementShipping = document.getElementById('summary-shipping');

  if (elementTotalQty && elementTotalQty.dataset) {
    totalQty = parseInt(elementTotalQty.dataset.qty || 0);
  }

  if (elementTotalCost && elementTotalCost.dataset) {
    totalCost = parseFloat(elementTotalCost.dataset.cost || 0);
  }

  if (elementShipping && elementShipping.dataset) {
    shippingThreshold = parseInt(elementShipping.dataset.shippingThreshold || 0);
    shippingMin = parseInt(elementShipping.dataset.shippingMin || 0);
    shippingMax = parseInt(elementShipping.dataset.shippingMax || 0);
  }

  return {
    id: id,
    qty: qty,
    price: price,
    cost: cost,
    elementCost: elementCost,
    totalQty: totalQty,
    totalCost: totalCost,
    shippingThreshold: shippingThreshold,
    shippingMin: shippingMin,
    shippingMax: shippingMax,
    elementTotalQty: elementTotalQty,
    elementTotalCost: elementTotalCost,
    elementSubTotal: elementSubTotal,
    elementShipping: elementShipping
  };
}

function setCartData(node, index, data) {
  if (!node || !node.dataset || index < 0 || !data) return;
  node.dataset.qty = data.qty || 1;
  node.dataset.cost = data.cost || 0;
  var shipping = 0;

  if (data.elementCost) {
    data.elementCost.innerHTML = '$' + (data.cost || 0).toFixed(0);
  }

  if (data.elementTotalQty) {
    data.elementTotalQty.dataset.qty = data.totalQty || 0;
    data.elementTotalQty.innerHTML = (data.totalQty || 0).toFixed(0);
  }

  if (data.elementShipping) {
    shipping = data.totalCost > data.shippingThreshold ? data.shippingMin : data.shippingMax;
    data.elementShipping.innerHTML = '$' + (shipping || 0).toFixed(0);
  }

  if (data.elementTotalCost) {
    data.elementTotalCost.dataset.cost = data.totalCost || 0;
    data.elementTotalCost.innerHTML = '$' + ((data.totalCost || 0) + shipping).toFixed(0);
  }

  if (data.elementSubTotal) {
    data.elementSubTotal.innerHTML = '$' + (data.totalCost || 0).toFixed(0);
  }
}

function onCartClick(event) {
  var target = event.target;

  if (target.nodeName.toLowerCase() !== 'button') {
    target = target.closest('BUTTON');
  }

  if (!target) return;
  var cartList = this;

  if (target.nodeName.toLowerCase() === 'button') {
    var action = null;

    if (target.className.indexOf('cart-remove') !== -1) {
      action = 'DELETE';
    }

    if (target.className.indexOf('btn-items-increase') !== -1) {
      action = 'INC';
    }

    if (target.className.indexOf('btn-items-decrease') !== -1) {
      action = 'DEC';
    }

    if (!action) {
      return;
    }

    var node = target.closest('.cart-page__product');
    var index = Array.prototype.indexOf.call(cartList.children, node);

    if (node && index !== -1) {
      var diff = 0;
      var cartData = getCartData(node, index);
      if (!cartData) return;

      if (action === 'INC' || action === 'DEC') {
        if (action === 'INC') {
          cartData.qty++;
          diff = 1;
        }

        if (action === 'DEC') {
          cartData.qty--;
          diff = -1;
        }

        if (cartData.qty <= 0) {
          cartData.qty = 1;
          diff = 0;
        }
      }

      if (action === 'DELETE') {
        diff = -cartData.qty;
      }

      var costDiff = diff * cartData.price;
      cartData.cost = cartData.cost + costDiff;
      cartData.totalQty += diff;

      if (cartData.totalQty < 0) {
        cartData.totalQty = 0;
      }

      cartData.totalCost += costDiff;

      if (cartData.totalCost < 0) {
        cartData.totalCost = 0;
      }

      setCartData(node, index, cartData);

      if (action === 'DELETE') {
        cartList.removeChild(node);
        node = null;
        deleteHeaderCartProduct(cartData.id);
        deleteProduct(cartData.id).then(function () {
          if (cartData.totalQty === 0) {
            window.location.href = '/';
          }
        });
      }

      if (action === 'INC' || action === 'DEC') {
        updateProductQty(cartData.id, diff);
      }
    }
  }
}

function onCartChange(event) {
  var target = event && event.target;
  if (!target) return;
  var cartList = this;
  var value = +target.value || 0;

  if (target.nodeName.toLowerCase() === 'select') {
    var action = null;

    if (target.className.indexOf('select-qty') !== -1) {
      action = 'UPD';
    }

    if (!action) {
      return;
    }

    var node = target.closest('.cart-page__product');
    var index = Array.prototype.indexOf.call(cartList.children, node);

    if (node && index !== -1) {
      var diff = 0;
      var cartData = getCartData(node, index);
      if (!cartData) return;

      if (action === 'UPD') {
        if (!value || value < 0) {
          value = 1;
        }

        diff = value - cartData.qty;
        cartData.qty = value;
      }

      var costDiff = diff * cartData.price;
      cartData.cost = cartData.cost + costDiff;
      cartData.totalQty += diff;

      if (cartData.totalQty < 0) {
        cartData.totalQty = 0;
      }

      cartData.totalCost += costDiff;

      if (cartData.totalCost < 0) {
        cartData.totalCost = 0;
      }

      setCartData(node, index, cartData);

      if (action === 'UPD') {
        updateProductQty(cartData.id, diff, cartData.qty);
      }
    }
  }
}

function initPageCart() {
  var cartPageList = document.getElementById('cart-page-list');

  if (cartPageList) {
    cartPageList.addEventListener('click', onCartClick);
    cartPageList.addEventListener('change', onCartChange);
  }
}

var _default = initPageCart;
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCheckout = initCheckout;
exports["default"] = void 0;

/* global Stripe, fbq */
var loading = false;
var formElements = {};
var cardValidity = {
  cardNumber: false,
  cardExpiry: false,
  cardCvc: false
};
var cardFields = {
  cardNumber: null,
  cardExpiry: null,
  cardCvc: null
};
var cardElements = {
  cardNumber: null,
  cardExpiry: null,
  cardCvc: null
};
var stripe;
var order = [];

function submitPayment(data, clientSecret) {
  if (!data || !cardElements.cardNumber) {
    window.location.href = '/checkout';
  }

  loading = true;
  return stripe.confirmCardSetup(clientSecret, {
    payment_method: {
      card: cardElements.cardNumber,
      billing_details: {
        name: data.cardholder_name || data.first_name + ' ' + data.last_name,
        email: data.email || null,
        phone: data.billing_phone || null,
        address: {
          city: data.billing_city || null,
          // country: data.billing_country || null,
          line1: data.billing_line || null,
          line2: data.billing_line2 || null,
          postal_code: data.billing_postal_code || null,
          state: data.billing_state || null
        }
      },
      metadata: {
        billing_country: data.billing_country || null,
        shipping_different: data.shipping_different || null,
        shipping_city: data.shipping_city || null,
        shipping_country: data.shipping_country || null,
        shipping_line: data.shipping_line || null,
        shipping_line2: data.shipping_line2 || null,
        shipping_postal_code: data.shipping_postal_code || null,
        shipping_state: data.shipping_state || null,
        shipping_phone: data.shipping_phone || null,
        order: JSON.stringify(order, null, 2)
      }
    }
  }).then(function (result) {
    loading = false;

    if (result.error) {
      alert(result.error && result.error.message || result.error); // window.location.href = '/checkout';
    } else {
      var setupIntent = result.setupIntent;

      if (setupIntent) {
        // TODO: send payment_method to backend
        var payment_method = setupIntent.payment_method;
      } // FB analytics


      var purchaseValue = 0.00;
      var sumCost = document.getElementById('summary-cost');

      if (sumCost && sumCost.dataset && sumCost.dataset.cost) {
        purchaseValue = +sumCost.dataset.cost || 0;
      } // window.fbq && fbq('track', 'Purchase', {value: purchaseValue, currency: 'USD'});


      window.location.href = '/success';
    }
  })["catch"](function (error) {
    return console.log(error);
  });
}

function submitOrder(url, method, data) {
  if (loading) return;
  loading = true;
  return $.ajax({
    url: url,
    type: method,
    method: method,
    dataType: 'json',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: data
  }).then(function (response, textStatus, jqXHR) {
    var clientSecret = response.client_secret;
    return submitPayment(data, clientSecret);
  })["catch"](function (jqXHR, textStatus, error) {
    loading = false;
    console.log('submitOrder failed', method, url, error || jqXHR);
    return null;
  });
}

function validateFormElement(element) {
  if (!element || !element.validity) {
    return false;
  }

  var patternEmpty = /[^\s]+/; // string full of spaces

  if (element.required && (element.value === '' || !patternEmpty.test(element.value))) {
    return false;
  }

  if (!element.validity.valid) {
    return false;
  }

  return true;
}

function validatePaymentForm() {
  var valid = true;

  for (var field in cardValidity) {
    if (cardValidity.hasOwnProperty(field)) {
      if (!cardValidity[field]) {
        valid = false;

        if (cardFields.hasOwnProperty(field) && cardFields[field]) {
          cardFields[field].classList ? cardFields[field].classList.add('invalid') : cardFields[field].className + ' invalid';
        }
      } else {
        if (cardFields.hasOwnProperty(field) && cardFields[field]) {
          cardFields[field].classList ? cardFields[field].classList.remove('invalid') : cardFields[field].className.replace(/\binvalid\b/gi, '');
        }
      }
    }
  }

  return valid;
}

function validateForm(formElements) {
  var valid = true;

  for (var key in formElements) {
    if (formElements.hasOwnProperty(key) && formElements[key] && formElements[key].elements) {
      var elements = formElements[key].elements;

      if (!elements || !elements.length) {
        console.log('no elements');
        return true;
      }

      var element = null;
      var checked = false;

      for (var i = 0; i < elements.length; i++) {
        element = elements[i];

        if (!element || !element.validity) {
          console.log('no validation');
          return true;
        }

        if (element.type === 'radio' || element.type === 'checkbox') {
          checked = checked || element.checked;
        } else {
          var label = element.closest('label');

          if (validateFormElement(element)) {
            element.classList.remove('invalid');

            if (label) {
              label.classList.remove('invalid');
            }
          } else {
            element.classList.add('invalid');

            if (label) {
              label.classList.add('invalid');
            }

            valid = false;
          }
        }
      }

      if (element.type === 'radio' || element.type === 'checkbox') {
        if (element.required && !checked) {
          valid = false;
        }
      }
    }
  }

  if (!validatePaymentForm()) {
    valid = false;
  }

  return valid;
}

function onInput(event) {
  var element = event.target;

  if (!element || !element.validity) {
    return;
  }

  var valid = validateFormElement(element);
  var form = element.form;

  if (valid) {
    element.classList.remove('invalid');
    var label = element.closest('label');

    if (label) {
      label.classList.remove('invalid');
    }
  }
}

function onChange(event) {
  var element = event.target;

  if (!element || !element.validity) {
    return;
  }

  var valid = validateFormElement(element);
  var form = element.form;
  var label = element.closest('label');

  if (valid) {
    element.classList.remove('invalid');

    if (label) {
      label.classList.remove('invalid');
    }
  } else {
    element.classList.add('invalid');

    if (label) {
      label.classList.add('invalid');
    }
  }
}

function prepareForm() {
  var data = {};

  for (var key in formElements) {
    if (formElements.hasOwnProperty(key) && formElements[key]) {
      var elements = formElements[key].elements;

      if (!elements || !elements.length) {
        continue;
      }

      var element = null;

      for (var i = 0; i < elements.length; i++) {
        element = elements[i];

        if (!element) {
          continue;
        }

        if (element.type === 'radio' || element.type === 'checkbox') {
          if (element.checked) {
            data[formElements[key].name] = element.value || element.checked;
          }
        } else {
          data[formElements[key].name] = element.value;
        }
      }
    }
  }

  return data;
}

function toggleShipping(event) {
  var target = event && (event.currentTarget || event.target);
  if (!target) return;
  var checked = target.checked;
  var shippingFields = ['shipping_line', 'shipping_city', 'shipping_country', 'shipping_postal_code', 'shipping_state' // 'shipping_phone'
  ];

  for (var key in formElements) {
    if (formElements.hasOwnProperty(key) && formElements[key]) {
      var elements = formElements[key].elements;

      if (!elements || !elements.length) {
        continue;
      }

      if (shippingFields.indexOf(key) !== -1) {
        formElements[key].required = checked;
        var element = null;

        for (var i = 0; i < elements.length; i++) {
          element = elements[i];

          if (!element) {
            continue;
          }

          element.required = checked;
        }
      }
    }
  }
}

function initPayment(publishableKey) {
  if (!publishableKey) return;
  stripe = Stripe(publishableKey);
  var elements = stripe.elements({
    fonts: [// {cssSrc: '/fonts/jost/stylesheet.css'},
    // {cssSrc: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap'}
    {
      cssSrc: 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400&display=swap'
    }],
    locale: 'auto'
  });
  var elementStyles = {
    base: {
      fontFamily: 'Jost, Lato, sans-serif',
      fontSize: '15px',
      fontWeight: 400,
      fontSmoothing: 'antialiased',
      color: '#111',
      ':focus': {
        color: '#111'
      },
      '::placeholder': {
        color: '#767676'
      },
      ':disabled': {
        backgroundColor: '#e9ecef'
      }
    },
    invalid: {
      color: '#dc3545',
      '::placeholder': {
        color: '#dc3545'
      }
    }
  };
  var elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
    complete: 'complete'
  };
  var cardNumber = elements.create('cardNumber', {
    placeholder: 'Card Number *',
    style: elementStyles,
    classes: elementClasses
  });
  cardNumber.mount('#card-number');
  cardFields.cardNumber = document.getElementById('card-number');
  cardElements.cardNumber = cardNumber;
  var cardExpiry = elements.create('cardExpiry', {
    placeholder: 'MM/YY',
    style: elementStyles,
    classes: elementClasses
  });
  cardExpiry.mount('#expiry-date');
  cardFields.cardExpiry = document.getElementById('expiry-date');
  cardElements.cardExpiry = cardExpiry;
  var cardCvc = elements.create('cardCvc', {
    placeholder: 'CVV *',
    style: elementStyles,
    classes: elementClasses
  });
  cardCvc.mount('#cvv');
  cardFields.cardCvc = document.getElementById('cvv');
  cardElements.cardCvc = cardCvc;
  cardNumber.addEventListener('change', function (event) {
    cardValidity.cardNumber = !event.error && !event.empty && event.complete;
  });
  cardExpiry.addEventListener('change', function (event) {
    cardValidity.cardExpiry = !event.error && !event.empty && event.complete;
  });
  cardCvc.addEventListener('change', function (event) {
    cardValidity.cardCvc = !event.error && !event.empty && event.complete;
  });
}

function initOrder() {
  order = [];
  var orderList = document.getElementById('order-list');

  if (orderList) {
    var nodes = orderList.children;

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] && nodes[i].dataset) {
        var product = {};
        var node = nodes[i];
        product.id = parseFloat(node.dataset && +node.dataset.id || '');
        product.title = node.dataset && node.dataset.title || '';
        product.quantity = parseFloat(node.dataset && node.dataset.qty || 0);
        product.price = parseFloat(node.dataset && node.dataset.price || 0);
        order.push(product);
      }
    }
  }
}

function initCheckout() {
  var form = document.getElementById('checkout-form');
  if (!form) return;
  form.setAttribute('novalidate', 'novalidate');
  var inputs = form.getElementsByTagName('INPUT');

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].name) {
      if (formElements.hasOwnProperty(inputs[i].name) && formElements[inputs[i].name]) {
        formElements[inputs[i].name].elements.push(inputs[i]);
      } else {
        formElements[inputs[i].name] = {
          elements: [inputs[i]],
          type: inputs[i].type,
          name: inputs[i].name,
          required: inputs[i].required,
          pattern: inputs[i].pattern,
          minLength: inputs[i].minLength,
          maxLength: inputs[i].maxLength
        };
      }
    }
  }

  var textareas = form.getElementsByTagName('TEXTAREA');

  for (var _i = 0; _i < textareas.length; _i++) {
    if (textareas[_i].name) {
      if (formElements.hasOwnProperty(textareas[_i].name) && formElements[textareas[_i].name]) {
        formElements[textareas[_i].name].elements.push(textareas[_i]);
      } else {
        formElements[textareas[_i].name] = {
          elements: [textareas[_i]],
          name: textareas[_i].name,
          required: textareas[_i].required,
          pattern: textareas[_i].pattern,
          minLength: textareas[_i].minLength,
          maxLength: textareas[_i].maxLength
        };
      }
    }
  }

  form.addEventListener('input', onInput);
  form.addEventListener('change', onChange);
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validateForm(formElements)) {
      submitOrder(form.getAttribute('action') || '/payment', 'POST', prepareForm());
    } else {
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn && submitBtn.blur();
    }
  });
  initPayment(form.dataset && form.dataset.key);
  initOrder();
  var shippingSwitch = document.getElementById('show-shipping-address');

  if (shippingSwitch) {
    shippingSwitch.addEventListener('change', toggleShipping);
  } // window.fbq && fbq('track', 'InitiateCheckout'); // FB analytics

}

var _default = initCheckout;
exports["default"] = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initPageCart", {
  enumerable: true,
  get: function get() {
    return _cart["default"];
  }
});
Object.defineProperty(exports, "initCheckout", {
  enumerable: true,
  get: function get() {
    return _checkout["default"];
  }
});
exports["default"] = void 0;

var _cart = _interopRequireDefault(require("./cart"));

var _checkout = _interopRequireDefault(require("./checkout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  initPageCart: _cart["default"],
  initCheckout: _checkout["default"]
};
exports["default"] = _default;

},{"./cart":7,"./checkout":8}],10:[function(require,module,exports){
/* global objectFitImages */
'use strict'; // import 'core-js/stable';
// import 'regenerator-runtime/runtime';

var _header = require("./header");

var _products = require("./products");

var _checkout = require("./checkout");

var _auth = require("./auth");

var _account = require("./account");

function initPolyfills() {
  var targetTime = 0;

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
      var currentTime = +new Date();
      var nextTime = Math.max(targetTime + 16, currentTime);

      var timeoutCb = function timeoutCb() {
        callback(targetTime = nextTime);
      };

      return setTimeout(timeoutCb, nextTime - currentTime);
    };
  }

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);

      return null;
    };
  }
}

(function ($) {
  $(document).ready(function () {
    initPolyfills();
    objectFitImages();
    (0, _header.initHeaderCart)();
    (0, _header.initHeaderSticky)();
    (0, _products.initLoadCollectionProducts)();
    (0, _products.initProductFilters)();
    (0, _products.initCollectionObserver)(true); // initSuggestionsObserver();

    (0, _products.initBuyForm)();
    (0, _products.initWishForm)();
    (0, _checkout.initPageCart)();
    (0, _checkout.initCheckout)();
    (0, _auth.initAuth)();
    (0, _auth.initLoginForm)();
    (0, _auth.initRegisterForm)();
    (0, _account.initAccountWishlist)();
    (0, _products.initProductTrack)();
  });

})(jQuery);

},{"./account":1,"./auth":4,"./checkout":9,"./header":13,"./products":18}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHeaderCart = initHeaderCart;
exports["default"] = void 0;

function pause(duration) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, duration);
  });
}

function loadCartContent(cartList) {
  var retries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var baseUrl = '/cart';
  return $.ajax({
    url: baseUrl + '/get',
    type: 'GET',
    method: 'GET',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  }).then(function (response, textStatus, jqXHR) {
    if (response && response.products && response.products.length) {
      response.products.forEach(function (product) {
        var qty = +product.quantity || 0;
        var qtyOptions = [];
        var qtyMaxOpt = Math.max(5, qty);

        for (var qtyOpt = 1; qtyOpt <= qtyMaxOpt; qtyOpt++) {
          qtyOptions.push(qtyOpt);
        }

        var node = document.createElement('li');
        node.className = 'list-group-item navbar-cart-product';

        if (node.dataset) {
          node.dataset.id = product.id;
          node.dataset.productUrl = product.url_to_detail || '#';
          node.dataset.qty = qty;
          node.dataset.price = product.price;
          node.dataset.cost = qty * product.price;
        }

        node.innerHTML = "\n                    <div class=\"row align-items-center\">\n                        <div class=\"col-4\">\n                            <a target=\"_blank\" href=\"".concat(product.url_to_detail || '#', "\">\n                                <img class=\"img-fluid\" src=\"").concat(product.image || '', "\" alt=\"").concat(product.title, "\" title=\"").concat(product.title, "\">\n                            </a>\n                        </div>\n                        <div class=\"col-8\">\n                            <p class=\"font-size-sm font-weight-bold mb-6\">\n                                <a  target=\"_blank\" class=\"text-body\" href=\"").concat(product.url_to_detail || '#', "\">").concat(product.title, "</a> <br>\n                                <span class=\"text-muted\">$").concat(product.price, "</span>\n                            </p>\n                            <div class=\"d-flex align-items-center\">\n                                <select class=\"custom-select custom-select-xxs w-auto select-qty\">\n                                    ").concat(qtyOptions.map(function (opt) {
          return "<option value=\"".concat(opt, "\" ").concat(opt === qty ? 'selected' : '', ">").concat(opt, "</option>");
        }).join('\n'), "\n                                </select>\n                                <button class=\"font-size-xs text-gray-400 ml-auto navbar-cart-del header-cart__remove\" type=\"button\">\n                                    <i class=\"fe fe-x\"></i> Remove\n                                </button>\n                            </div>\n                        </div>\n                    </div>");
        cartList.appendChild(node);
      });
      var totalQty = response.total_count || 0;
      var totalCost = parseFloat(response.total_sum || 0);
      var cartQtyBadge = document.getElementById('header-cart-qty-badge');
      var cartQtyBadgeMobile = document.getElementById('header-cart-qty-badge-mobile');
      var cartQty = document.getElementById('header-cart-qty');
      var cartCost = document.getElementById('header-cart-cost');
      var cartControls = document.getElementById('header-cart-controls');
      console.log(totalQty);
      if (cartQtyBadge && cartQtyBadge.dataset) {
        cartQtyBadge.dataset.qty = totalQty;
        cartQtyBadge.dataset.cartItems = totalQty;
      }

      if (cartQtyBadgeMobile && cartQtyBadgeMobile.dataset) {
        cartQtyBadgeMobile.dataset.qty = totalQty;
        cartQtyBadgeMobile.dataset.cartItems = totalQty;
      }

      if (cartQty && cartQty.dataset) {
        cartQty.dataset.qty = totalQty;
        cartQty.innerHTML = totalQty.toFixed();
      }

      if (cartCost && cartCost.dataset) {
        cartCost.dataset.cost = totalCost;
        cartCost.innerHTML = '$' + totalCost.toFixed(2);
      }

      if (cartControls && totalQty > 0) {
        cartControls.style.display = '';
      }
    }

    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    if (retries > 1) {
      return pause(200).then(function () {
        return loadCartContent(cartList, retries - 1);
      });
    }

    console.log('loadCartContant failed', error || jqXHR);
    return null;
  }).then(function (result) {
    return result;
  });
}

function deleteProduct(id) {
  var baseUrl = '/cart';
  return $.ajax({
    url: baseUrl + '/delete/' + id,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  }).then(function (response, textStatus, jqXHR) {
    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('deleteProduct failed', id);
    return null;
  }).then(function (result) {
    return result;
  });
}

function updateProductQty(id, diff, qty) {
  var baseUrl = '/cart';
  var data = {
    productId: id
  };
  var url = baseUrl;

  if (qty) {
    url += '/edit-quantity';
    data.quantity = qty;
  } else {
    if (diff > 0) {
      url += '/increase';
    } else {
      url += '/decrease';
    }
  }

  return $.ajax({
    url: url,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: data
  }).then(function (response, textStatus, jqXHR) {
    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('updateProductQty failed', id);
    return null;
  }).then(function (result) {
    return result;
  });
}

function getHeaderCartData(node, index) {
  if (!node || !node.dataset || index < 0) return;
  var id = parseFloat(node.dataset && +node.dataset.id || '');
  var qty = parseFloat(node.dataset && node.dataset.qty || 0);
  var price = parseFloat(node.dataset && node.dataset.price || 0);
  var cost = qty * price;
  var elementCostList = node.getElementsByClassName('header-cart-product-cost');
  var elementCost;

  if (elementCostList && elementCostList.length) {
    elementCost = elementCostList[0];
  }

  var totalQty = 0;
  var totalCost = 0;
  var elementTotalQty = document.getElementById('header-cart-qty');
  var elementBadge = document.getElementById('header-cart-qty-badge');
  var elementBadgeMobile = document.getElementById('header-cart-qty-badge-mobile');
  var elementTotalCost = document.getElementById('header-cart-cost');
  var elementSubTotal = document.getElementById('header-cart-subtotal');
  var elementControls = document.getElementById('header-cart-controls');

  if (elementTotalQty && elementTotalQty.dataset) {
    totalQty = parseInt(elementTotalQty.dataset.qty || 0);
  }

  if (elementTotalCost && elementTotalCost.dataset) {
    totalCost = parseFloat(elementTotalCost.dataset.cost || 0);
  }

  return {
    id: id,
    qty: qty,
    price: price,
    cost: cost,
    elementCost: elementCost,
    totalQty: totalQty,
    totalCost: totalCost,
    elementTotalQty: elementTotalQty,
    elementBadge: elementBadge,
    elementBadgeMobile: elementBadgeMobile,
    elementTotalCost: elementTotalCost,
    elementSubTotal: elementSubTotal,
    elementControls: elementControls
  };
}

function setHeaderCartData(node, index, data) {
  if (!node || !node.dataset || index < 0 || !data) return;
  node.dataset.qty = data.qty || 1;
  node.dataset.cost = data.cost || 0;

  if (data.elementCost) {
    data.elementCost.innerHTML = '$' + (data.cost || 0).toFixed(0);
  }

  if (data.elementTotalQty) {
    data.elementTotalQty.dataset.qty = data.totalQty || 0;
    data.elementTotalQty.innerHTML = (data.totalQty || 0).toFixed(0);
  }

  if (data.elementBadge) {
    data.elementBadge.dataset.qty = data.totalQty;
    data.elementBadge.dataset.cartItems = data.totalQty;
  }

  if (data.elementBadgeMobile) {
    data.elementBadgeMobile.dataset.qty = data.totalQty;
    data.elementBadgeMobile.dataset.cartItems = data.totalQty;
  }

  if (data.elementTotalCost) {
    data.elementTotalCost.dataset.cost = data.totalCost || 0;
    data.elementTotalCost.innerHTML = '$' + (data.totalCost || 0).toFixed(0);
  }

  if (data.elementSubTotal) {
    data.elementSubTotal.innerHTML = '$' + (data.totalCost || 0).toFixed(0);
  }
}

function onCartClick(event) {
  var target = event.target;

  if (target.nodeName.toLowerCase() !== 'button') {
    target = target.closest('BUTTON');
  }

  if (!target) return;
  var cartList = this;

  if (target.nodeName.toLowerCase() === 'button') {
    var node = target.closest('.navbar-cart-product');
    var index = Array.prototype.indexOf.call(cartList.children, node);

    if (node && index !== -1) {
      var cartData = getHeaderCartData(node, index);
      if (!cartData) return;
      cartData.totalQty -= cartData.qty;

      if (cartData.totalQty < 0) {
        cartData.totalQty = 0;
      }

      cartData.totalCost -= cartData.cost;

      if (cartData.totalCost < 0) {
        cartData.totalCost = 0;
      }

      setHeaderCartData(node, index, cartData);

      if (cartData.elementControls && cartData.totalQty === 0) {
        cartData.elementControls.style.display = 'none';
      } else {
        event.stopPropagation();
      }

      cartList.removeChild(node);
      node = null;
      deleteProduct(cartData.id);
    }
  }
}

function onCartChange(event) {
  var target = event && event.target;
  if (!target) return;
  var cartList = this;
  var value = +target.value || 0;

  if (target.nodeName.toLowerCase() === 'select') {
    var action = null;

    if (target.className.indexOf('select-qty') !== -1) {
      action = 'UPD';
    }

    if (!action) {
      return;
    }

    var node = target.closest('.navbar-cart-product');
    var index = Array.prototype.indexOf.call(cartList.children, node);

    if (node && index !== -1) {
      var diff = 0;
      var cartData = getHeaderCartData(node, index);
      if (!cartData) return;

      if (action === 'UPD') {
        if (!value || value < 0) {
          value = 1;
        }

        diff = value - cartData.qty;
        cartData.qty = value;
      }

      var costDiff = diff * cartData.price;
      cartData.cost = cartData.cost + costDiff;
      cartData.totalQty += diff;

      if (cartData.totalQty < 0) {
        cartData.totalQty = 0;
      }

      cartData.totalCost += costDiff;

      if (cartData.totalCost < 0) {
        cartData.totalCost = 0;
      }

      setHeaderCartData(node, index, cartData);

      if (action === 'UPD') {
        updateProductQty(cartData.id, diff, cartData.qty);
      }
    }
  }
}

function initHeaderCart() {
  var cartList = document.getElementById('header-cart-list');

  if (cartList) {
    cartList.addEventListener('click', onCartClick);
    cartList.addEventListener('change', onCartChange);
    loadCartContent(cartList);
  }
}

var _default = initHeaderCart;
exports["default"] = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHeaderSticky = initHeaderSticky;
exports["default"] = void 0;

function handleScroll(entries) {
  if (entries && entries[0]) {
    var sentinelIsVisible = entries[0].isIntersecting;
    var navbar = document.getElementById('header-navbar');
    var spacer = document.getElementById('header-spacer');

    if (navbar && spacer) {
      if (sentinelIsVisible) {
        navbar.classList ? navbar.classList.remove('sticky') : navbar.className.replace(/\bsticky\b/gi, '');
        spacer.classList ? spacer.classList.remove('sticky') : spacer.className.replace(/\bsticky\b/gi, '');
      } else {
        navbar.classList ? navbar.classList.add('sticky') : navbar.className += ' sticky';
        spacer.classList ? spacer.classList.add('sticky') : spacer.className += ' sticky';
      }
    }

    var toggler = document.getElementById('search-toggler');
    var searchForm = document.getElementById('search-form');

    if (toggler && searchForm) {
      if (sentinelIsVisible) {
        searchForm.classList ? searchForm.classList.add('show') : searchForm.className += ' show';
        toggler.classList ? toggler.classList.remove('collapsed') : toggler.className.replace(/\bcollapsed\b/gi, '');
        toggler.setAttribute('aria-expanded', true);
      } else {
        searchForm.classList ? searchForm.classList.remove('show') : searchForm.className.replace(/\bshow\b/gi, '');
        toggler.classList ? toggler.classList.add('collapsed') : toggler.className += ' collapsed';
        toggler.setAttribute('aria-expanded', false);
      }
    }
  }
}

function initHeaderSticky() {
  var sentinel = document.getElementById('header-sentinel');
  var spacer = document.getElementById('header-spacer');
  var navbar = document.getElementById('header-navbar');
  var toggler = document.getElementById('search-toggler');
  var searchForm = document.getElementById('search-form');

  if (sentinel && spacer && navbar) {
    var options = {
      root: null,
      rootMargin: '0px',
      threshhold: 0
    };
    var observer = new IntersectionObserver(handleScroll, options);
    observer.observe(sentinel);
  }
}

var _default = initHeaderSticky;
exports["default"] = _default;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initHeaderCart", {
  enumerable: true,
  get: function get() {
    return _headerCart["default"];
  }
});
Object.defineProperty(exports, "initHeaderSticky", {
  enumerable: true,
  get: function get() {
    return _headerSticky["default"];
  }
});
exports["default"] = void 0;

var _headerCart = _interopRequireDefault(require("./header-cart"));

var _headerSticky = _interopRequireDefault(require("./header-sticky"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  initHeaderCart: _headerCart["default"],
  initHeaderSticky: _headerSticky["default"]
};
exports["default"] = _default;

},{"./header-cart":11,"./header-sticky":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWishForm = initWishForm;
exports["default"] = void 0;
var loading = false;

function sendWishProduct(id, target) {
  if (loading) return;
  loading = true;
  var baseUrl = '/wishlist';
  return $.ajax({
    url: baseUrl,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: {
      product_id: id
    }
  }).then(function (response, textStatus, jqXHR) {
    loading = false;
    var wasActive = target.className.split(/\s+/g).indexOf('active') > -1;

    if (wasActive) {
      target.classList ? target.classList.remove('active') : target.className.replace(/\bactive\b/gi, '');
    } else {
      target.classList ? target.classList.add('active') : target.className += ' active';
    }

    target.blur();
    var toast = document.getElementById('add-to-wishlist-success');
    var toastText = document.getElementById('add-to-wishlist-success-text');

    if (toastText) {
      toastText.innerHTML = wasActive ? 'Product has been removed from wishlist' : 'Product has been added to wishlist';
    }

    if (toast) {
      $(toast).toast('show');
    }

    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('sendWishProduct failed', error || jqXHR);
    var toast = document.getElementById('add-to-wishlist-error');

    if (toast) {
      $(toast).toast('show');
    }

    loading = false;
    return null;
  });
}

function setWishProduct(id) {
  var loginForm = document.getElementById('login-form');
  var registerForm = document.getElementById('register-form');
  [loginForm, registerForm].forEach(function (form) {
    if (form && form.dataset) {
      form.dataset.id = id;
      var wishIdInput;
      var inputs = form.elements || form.getElementsByTagName('input');

      if (inputs && inputs.length) {
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i] && inputs[i].name === 'product_id') {
            wishIdInput = inputs[i];
            break;
          }
        }
      }

      if (!wishIdInput) {
        wishIdInput = document.createElement('input');
        wishIdInput.type = 'hidden';
        wishIdInput.name = 'product_id';
        wishIdInput.className = '';
        wishIdInput.style.display = 'none';
        wishIdInput.hidden = true;
        form.appendChild(wishIdInput);
      }

      wishIdInput.value = id;
    }
  });
}

function onWishClick(event) {
  var target = event.target;

  if (target.nodeName.toLowerCase() !== 'button' && target.nodeName.toLowerCase() !== 'a') {
    target = target.closest('BUTTON') || target.closest('A');
  }

  if (!target) return;

  if (target.nodeName.toLowerCase() === 'button' || target.nodeName.toLowerCase() === 'a') {
    if (target.dataset && target.dataset.wish) {
      var id = +target.dataset.wish || target.dataset.wish;
      var auth = target.dataset.auth;

      if (auth) {
        sendWishProduct(id, target);
      }

      setWishProduct(id);
    }
  }
}

function initWishForm() {
  var auth = document.getElementById('auth-container');

  if (auth) {
    document.addEventListener('click', onWishClick);
  }
}

var _default = initWishForm;
exports["default"] = _default;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initBuyForm = initBuyForm;
exports["default"] = void 0;
var totalQty = 0;
var totalCost = 0;

function addProduct(id, data) {
  var baseUrl = '/cart';
  return $.ajax({
    url: baseUrl + '/add/' + id,
    type: 'POST',
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: data
  }).then(function (response, textStatus, jqXHR) {
    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('addProduct failed', id);
    return null;
  }).then(function (result) {
    return result;
  });
}

function onSubmit(event) {
  event && event.preventDefault();
  var target = event && (event.currentTarget || event.target);
  if (!target) return;
  var productData = {};

  if (target.dataset) {
    productData.id = +target.dataset.id || '';
    productData.productUrl = target.dataset.productUrl;
    productData.image = target.dataset.image;
    productData.title = target.dataset.title;
    productData.price = parseFloat(target.dataset.price || 0);
  }

  var productSize = document.getElementById('product-size');

  if (productSize && productSize.value) {
    productData.size = productSize.value;
  }

  var productQty = document.getElementById('product-qty');

  if (productQty && productQty.value) {
    productData.qty = +productQty.value || 1;
  }

  var cartDetails = document.getElementById('cartdetails');
  var cartList = document.getElementById('header-cart-list');
  var cartQtyBadge = document.getElementById('header-cart-qty-badge');
  var cartQtyBadgeMobile = document.getElementById('header-cart-qty-badge-mobile');
  var cartQty = document.getElementById('header-cart-qty');
  var cartCost = document.getElementById('header-cart-cost');
  var cartControls = document.getElementById('header-cart-controls');

  if (cartDetails) {
    cartDetails.click();
  }

  if (cartQty && cartQty.dataset) {
    totalQty = parseInt(cartQty.dataset.qty || 0);
  }

  if (cartCost && cartCost.dataset) {
    totalCost = parseFloat(cartCost.dataset.cost || 0);
  }

  if (cartControls) {
    cartControls.style.display = '';
  }

  if (cartList) {
    var nodes = cartList.children;
    var node;
    var itemExist = false;
    var qty = productData.qty || 1;
    var diff = qty;

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] && nodes[i].dataset && nodes[i].dataset.id) {
        if (+nodes[i].dataset.id === productData.id) {
          node = nodes[i];
          itemExist = true;
        }
      }
    }

    if (!node) {
      node = document.createElement('li');
    }

    node.className = 'list-group-item navbar-cart-product';
    node.dataset.id = productData.id;
    node.dataset.productUrl = productData.productUrl;

    if (itemExist && node.dataset) {
      qty = parseInt(node.dataset.qty || 0) + qty;
    }

    var qtyOptions = [];
    var qtyMaxOpt = Math.max(5, qty);

    for (var qtyOpt = 1; qtyOpt <= qtyMaxOpt; qtyOpt++) {
      qtyOptions.push(qtyOpt);
    }

    node.dataset.qty = qty;
    node.dataset.price = productData.price;
    node.dataset.cost = qty * productData.price;
    node.innerHTML = "\n            <div class=\"row align-items-center\">\n                <div class=\"col-4\">\n                    <a target=\"_blank\" href=\"".concat(productData.productUrl.url_to_detail || '#', "\">\n                        <img class=\"img-fluid\" src=\"").concat(productData.image, "\" alt=\"").concat(productData.title, "\" title=\"").concat(productData.title, "\">\n                    </a>\n                </div>\n                <div class=\"col-8\">\n                    <p class=\"font-size-sm font-weight-bold mb-6\">\n                        <a class=\"text-body\" href=\"").concat(productData.productUrl || '#', "\">").concat(productData.title, "</a> <br>\n                        <span class=\"text-muted\">$").concat(productData.price.toFixed(), "</span>\n                    </p>\n                    <div class=\"d-flex align-items-center\">\n                        <select class=\"custom-select custom-select-xxs w-auto select-qty\">\n                            ").concat(qtyOptions.map(function (opt) {
      return "<option value=\"".concat(opt, "\" ").concat(opt === qty ? 'selected' : '', ">").concat(opt, "</option>");
    }).join('\n'), "\n                        </select>\n                        <button class=\"font-size-xs text-gray-400 ml-auto navbar-cart-del header-cart__remove\" type=\"button\">\n                            <i class=\"fe fe-x\"></i> Remove\n                        </button>\n                    </div>\n                </div>\n            </div>");

    if (!itemExist) {
      cartList.appendChild(node);
    }

    totalQty += diff;

    if (cartQtyBadge && cartQtyBadge.dataset) {
      cartQtyBadge.dataset.qty = totalQty;
      cartQtyBadge.dataset.cartItems = totalQty.toFixed();
    }

    if (cartQtyBadgeMobile && cartQtyBadgeMobile.dataset) {
      cartQtyBadgeMobile.dataset.qty = totalQty;
      cartQtyBadgeMobile.dataset.cartItems = totalQty.toFixed();
    }

    if (cartQty && cartQty.dataset) {
      cartQty.dataset.qty = totalQty;
      cartQty.innerHTML = totalQty.toFixed();
    }

    totalCost += productData.price * diff;

    if (cartCost && cartCost.dataset) {
      cartCost.dataset.cost = totalCost;
      cartCost.innerHTML = '$' + totalCost.toFixed(2);
    }

    addProduct(productData.id, {
      size: productData.size,
      quantity: productData.qty
    });
    window.scrollTo(0, 0);
  }
}

function initBuyForm() {
  var buyForm = document.getElementById('buy-form');

  if (buyForm) {
    buyForm.addEventListener('submit', onSubmit);
  }
}

var _default = initBuyForm;
exports["default"] = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetCollection = resetCollection;
exports.initCollectionObserver = initCollectionObserver;
exports["default"] = void 0;

var _loadCollectionProducts = require("./load-collection-products");

var options = {
  root: null,
  rootMargin: '300px',
  threshold: 0
};
var canLoadMore = false;
var isLoading = false;
var collectionFilter = {};
var observer;

function onIntersect(entries, observer) {
  var firstEntry = entries[0];

  if (firstEntry && firstEntry.isIntersecting) {
    isLoading = true;
    var target = firstEntry.target;
    observer.unobserve(target);
    var search = target.dataset.search;

    if (search) {
      collectionFilter.q = search;
    } else {
      delete collectionFilter.q;
    }

    var page = +target.dataset.page || 1;
    var baseUrl = target.dataset.baseUrl;
    (0, _loadCollectionProducts.loadCollectionProducts)(baseUrl, collectionFilter, page + 1).then(function (result) {
      if (!result) return; // trigger analytics

      if (result.data) {
        window.dataLayer && window.dataLayer.push({
          'event': 'LoadNewProds'
        });
      } // check and reset loader and observer


      isLoading = false;

      if (result.current_page && result.last_page) {
        page = result.current_page;
        target.dataset.page = page;
        canLoadMore = result.current_page < result.last_page;
      } else {
        canLoadMore = false;
      }

      if (canLoadMore) {
        observer.observe(target);
      } else {
        target.classList ? target.classList.add('hidden') : target.className += ' hidden';
      }
    })["catch"](function (error) {
      return console.log('intersect load error', error);
    });
  }
}

function resetCollection(filter) {
  if (!filter) return;

  if (observer) {
    observer.disconnect();
  }

  var elements = document.getElementsByClassName('collection__more');

  if (elements && elements.length) {
    isLoading = true;
    elements[0].classList ? elements[0].classList.remove('hidden') : elements[0].className.replace(/\bhidden\b/gi, '');
    collectionFilter = filter;
    var search = elements[0].dataset.search;

    if (search) {
      collectionFilter.q = search;
    }

    var baseUrl = elements[0].dataset.baseUrl;
    (0, _loadCollectionProducts.loadCollectionProducts)(baseUrl, collectionFilter).then(function (result) {
      if (!result) return; // check and reset loader and observer

      isLoading = false;

      if (result.current_page && result.last_page) {
        var page = result.current_page;
        elements[0].dataset.page = page;
        canLoadMore = result.current_page < result.last_page;
      } else {
        canLoadMore = false;
      }

      if (canLoadMore) {
        observer && observer.observe(elements[0]);
      } else {
        elements[0].classList ? elements[0].classList.add('hidden') : elements[0].className += ' hidden';
      }
    })["catch"](function (error) {
      return console.log('reset load error', error);
    });
  }
}

function initCollectionObserver(isReloadFilter) {


    if(isReloadFilter){
        loadFiltersPanel();
    }


    var elements = document.getElementsByClassName('collection__more');
  var loadMoreBtn = document.getElementById('load-more-products');

  if (!loadMoreBtn && elements && elements.length) {
    if (elements[0].dataset && elements[0].dataset.page && elements[0].dataset.lastPage) {
      canLoadMore = parseInt(elements[0].dataset.lastPage || 0) > parseInt(elements[0].dataset.page || 0);
    }

    if (canLoadMore) {
      elements[0].classList ? elements[0].classList.remove('hidden') : elements[0].className.replace(/\bhidden\b/gi, '');
      observer = observer || new IntersectionObserver(onIntersect, options);
      observer.observe(elements[0]);
    } else {
      elements[0].classList ? elements[0].classList.add('hidden') : elements[0].className += ' hidden';
    }
  }
}

function reloadProductsByFilter(){
    var url = currentUrl + getFiltersUrl();
    $.post(url, {}, function(data){
        $('#products').html(data);
        initCollectionObserver(false);

      $('#filters-sort').on('change', function(){
       document.location.href = buildFiltersUrl();
      });

    });
}

function filtersClick(){
    var url = getFiltersUrl();
    window.history.pushState({page: document.title}, document.title, currentUrl + url);
    reloadProductsByFilter();
}

function loadFiltersPanel() {
    if($('#brandsNav').length > 0) {
        $.post(
            "/ajax/filters/load",
            {
                filters: filters,
                brands_filter: brands_filter,
                url_prefix: url_prefix,
                url_suffix: url_suffix,
                filters: filters
            },
            function (data) {
                $('#brandsNav').html('');
                $('#colorsList').html('');
                $('#storesList').html('');
                $.each(data['brands'], function(i, val){
                    $('#brandsNav').append('<li class="list-styled-item mw-100"><a class="list-styled-link d-flex mw-100 collection__navlink" href="' + val.url + '"><span class="name">' + val.name + '</span><span class="ml-auto pt-1 px-4 px-md-2 px-md-4 font-size-xxs text-muted">' + val.count + '</span></a></li>');
                });

                $.each(data['colors'], function(i, val){
                    let checked = val.checked ? 'checked' : '';
                    $('#colorsList').append('<div class="custom-control custom-checkbox mb-3"><input ' + checked + ' class="custom-control-input cb-filter" name="colors[]" value="' + val.id + '" id="color-' + val.id + '" type="checkbox"><label class="custom-control-label d-flex mw-100" for="color-' + val.id + '"><span class="text-body color">' + val.name + '</span></label></div>');
                });

                $.each(data['stores'], function(i, val){
                  let checked = val.checked ? 'checked' : '';
                  $('#storesList').append('<div class="custom-control custom-checkbox mb-3"><input ' + checked + ' class="custom-control-input cb-filter" name="stores[]" value="' + val.id + '" id="store-' + val.id + '" type="checkbox"><label class="custom-control-label d-flex mw-100" for="store-' + val.id + '"><span class="text-body color">' + val.name + '</span></label></div>');
              });

                $('.cb-filter').on('change', function(){
                    filtersClick();
                });

            }
        );
    }
}



var _default = initCollectionObserver;
exports["default"] = _default;

},{"./load-collection-products":19}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initProductFilters = initProductFilters;
exports["default"] = void 0;

var _utils = require("../utils");

var _collectionObserver = require("./collection-observer");

var filters = {};

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  }).replace(/%2C/g, ',');
}

function updateFilters(field, value, list) {
  // check field
  if (!field) return; // transform value

  if (list && Object.prototype.toString.call(list) === '[object Array]') {
    value = list.join(',');
  } // check field in filter


  if ((value === null || value === '') && (!filters.hasOwnProperty(field) || filters[field] === value)) return;
  if (filters.hasOwnProperty(field) && filters[field] === '' + value) return; // change field in filter

  if (value === null || value === '') {
    delete filters[field];
  } else {
    filters[field] = '' + value;
  } // change history address


  if (window.history && window.history.pushState) {
    var query = '';
    var key, val;

    for (key in filters) {
      if (filters.hasOwnProperty(key)) {
        val = filters[key];

        if (val !== null || val !== '') {
          query += (query ? '&' : '') + "".concat(fixedEncodeURIComponent(key), "=").concat(fixedEncodeURIComponent(val));
        }
      }
    }

    window.history.pushState(null, '', query ? '?' + query : query || window.location.href.replace(/\?.+/, ''));
  } // load new data


  (0, _collectionObserver.resetCollection)(filters);
}

function onSubmit(event) {
  event.preventDefault();
}

function onChange(event) {
  var inputData = (0, _utils.onChangeHandler)(event);

  if (inputData && inputData.name && inputData.valid) {
    updateFilters(inputData.name, inputData.value, inputData.list);
  }
}

function onInput(event) {
  var inputData = (0, _utils.onInputHandler)(event);

  if (inputData && inputData.name && inputData.valid) {
    updateFilters(inputData.name, inputData.value);
  }
}

function onSelect(event) {
  var target = event.target;

  if (target.nodeName.toLowerCase() !== 'button' && target.nodeName.toLowerCase() !== 'a') {
    target = target.closest('BUTTON') || target.closest('A');
  }

  if (!target) return;

  if (target.nodeName.toLowerCase() === 'button' || target.nodeName.toLowerCase() === 'a') {
    if (target.dataset && target.dataset.name && target.dataset.value) {
      event.preventDefault();
      updateFilters(target.dataset.name, target.dataset.value);
    }
  }
}

function initProductFilters() {
  // parse address query
  /*var query = (window && window.location && window.location.search || '').replace(/^\?/, '');
  var params = query.split('&').reduce(function (dict, param) {
    var ind = param.indexOf('=');

    if (ind > -1) {
      try {
        dict[decodeURIComponent(param.slice(0, ind))] = decodeURIComponent(param.slice(ind + 1));
      } catch (e) {
        console.log(e);
      }
    } else {
      dict[param] = '';
    }

    return dict;
  }, Object.create(null)); // fill filter from query

  var filterVariants = ['q', 'min-price', 'max-price'];

  for (var i = 0; i < filterVariants.length; i++) {
    if (Object.prototype.hasOwnProperty.call(params, filterVariants[i])) {
      filters[filterVariants[i]] = params[filterVariants[i]];
    }
  } // add handlers


  /*var form = document.getElementById('filters-form');
  var debouncedInputHandler = (0, _utils.debounce)(onInput, 500);
  var debouncedChangeHandler = (0, _utils.debounce)(onChange, 500);

  if (form) {
    form.addEventListener('submit', onSubmit);
    form.addEventListener('input', debouncedInputHandler);
    form.addEventListener('change', debouncedChangeHandler);
  }*/

  /*var formModal = document.getElementById('filters-form-modal');

  if (formModal) {
    formModal.addEventListener('submit', onSubmit);
    formModal.addEventListener('input', debouncedInputHandler);
    formModal.addEventListener('change', debouncedChangeHandler);
  }

  var sortSelect = document.getElementById('filters-sort');

  if (sortSelect) {
    sortSelect.addEventListener('change', onChange);
  }

  var sortMenu = document.getElementById('filters-sort-menu');

  if (sortMenu) {
    sortMenu.addEventListener('click', onSelect);
  } // show colors


  setTimeout(function () {
    var colorGroup = document.getElementById('color-group');

    if (colorGroup) {
      colorGroup.style.display = null;
    }
  }, 500);*/
  var sortSelect = document.getElementById('filters-sort');

  if (sortSelect) {
    sortSelect.addEventListener('change', onChange);
  }
}

var _default = initProductFilters;
exports["default"] = _default;

},{"../utils":26,"./collection-observer":16}],18:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initCollectionObserver", {
  enumerable: true,
  get: function get() {
    return _collectionObserver["default"];
  }
});
Object.defineProperty(exports, "loadCollectionProducts", {
  enumerable: true,
  get: function get() {
    return _loadCollectionProducts["default"];
  }
});
Object.defineProperty(exports, "initLoadCollectionProducts", {
  enumerable: true,
  get: function get() {
    return _loadCollectionProducts.initLoadCollectionProducts;
  }
});


Object.defineProperty(exports, "initSuggestionsObserver", {
  enumerable: true,
  get: function get() {
    return _suggestionsObserver["default"];
  }
});
Object.defineProperty(exports, "loadMoreSuggestions", {
  enumerable: true,
  get: function get() {
    return _loadMoreSuggestions["default"];
  }
});
Object.defineProperty(exports, "initBuyForm", {
  enumerable: true,
  get: function get() {
    return _buy["default"];
  }
});
Object.defineProperty(exports, "initWishForm", {
  enumerable: true,
  get: function get() {
    return _addToWishlist["default"];
  }
});
Object.defineProperty(exports, "initProductTrack", {
  enumerable: true,
  get: function get() {
    return _track["default"];
  }
});
Object.defineProperty(exports, "initProductFilters", {
  enumerable: true,
  get: function get() {
    return _filterProducts["default"];
  }
});
exports["default"] = void 0;

var _collectionObserver = _interopRequireDefault(require("./collection-observer"));

var _loadCollectionProducts = _interopRequireWildcard(require("./load-collection-products"));

var _suggestionsObserver = _interopRequireDefault(require("./suggestions-observer"));

var _loadMoreSuggestions = _interopRequireDefault(require("./load-more-suggestions"));

var _buy = _interopRequireDefault(require("./buy"));

var _addToWishlist = _interopRequireDefault(require("./add-to-wishlist"));

var _track = _interopRequireDefault(require("./track"));

var _filterProducts = _interopRequireDefault(require("./filter-products"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  initLoadCollectionProducts: _loadCollectionProducts.initLoadCollectionProducts,
  initCollectionObserver: _collectionObserver["default"],
  loadCollectionProducts: _loadCollectionProducts["default"],
  initSuggestionsObserver: _suggestionsObserver["default"],
  loadMoreSuggestions: _loadMoreSuggestions["default"],
  initBuyForm: _buy["default"],
  initWishForm: _addToWishlist["default"],
  initProductTrack: _track["default"],
  initProductFilters: _filterProducts["default"]
};
exports["default"] = _default;

},{"./add-to-wishlist":14,"./buy":15,"./collection-observer":16,"./filter-products":17,"./load-collection-products":19,"./load-more-suggestions":20,"./suggestions-observer":21,"./track":22}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCollectionProducts = loadCollectionProducts;
exports.initLoadCollectionProducts = initLoadCollectionProducts;
exports["default"] = void 0;

var _utils = require("../utils");

var loadCounter = 0;

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

function pause(duration) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, duration);
  });
}

function addCardCollapse(node) {
  var $toggle = $(node);
  var $collapse = $toggle.find('.card-collapse');
  $toggle.on({
    'mouseenter': function mouseenter() {
      var $this = $(this);
      var $collapse = $this.find('.card-collapse');
      $collapse.collapse('show');
    },
    'mouseleave': function mouseleave() {
      var $this = $(this);
      var $collapse = $this.find('.card-collapse');
      var isCollapsing = $collapse.hasClass('collapsing');

      if (isCollapsing) {
        setTimeout(function () {
          $collapse.collapse('hide');
        }, 350);
      } else {
        $collapse.collapse('hide');
      }
    }
  });
  $collapse.on({
    'show.bs.collapse': function showBsCollapse() {
      var $this = $(this);
      var $parent = $this.closest('.card-collapse-parent');
      var collapseHeight = $this.outerHeight(true);
      $parent.css({
        '-webkit-transform': 'translateY(-' + collapseHeight + 'px)',
        'transform': 'translateY(-' + collapseHeight + 'px)'
      });
    },
    'hide.bs.collapse': function hideBsCollapse() {
      var $this = $(this);
      var $parent = $this.closest('.card-collapse-parent');
      $parent.css({
        '-webkit-transform': '',
        'transform': ''
      });
    }
  });
}

function parseHtmlResponse(html) {
  if (!html || typeof html !== 'string') return null;
  var body = html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '');
  var fragment, tmp;

  if (document.createDocumentFragment) {
    fragment = document.createDocumentFragment();
    tmp = fragment.appendChild(document.createElement('div'));
  } else {
    tmp = document.createElement('div');
  }

  tmp.innerHTML = body;
  var collectionLists = tmp.getElementsByClassName('js-collection-list');
  if (!collectionLists || !collectionLists.length || !collectionLists[0].children) return null;
  var nodes = Array.prototype.slice.call(collectionLists[0].children);
  var to, total, page, lastPage;
  var elements = tmp.getElementsByClassName('collection__more');

  if (elements && elements.length && elements[0].dataset) {
    to = +elements[0].dataset.to || 0;
    total = elements[0].dataset.total;
    page = +elements[0].dataset.page || 1;
    lastPage = +elements[0].dataset.lastPage || 1;
  }

  tmp.remove && tmp.remove();
  tmp = null;
  return {
    nodes: nodes,
    to: to,
    total: total,
    current_page: page,
    last_page: lastPage
  };
}

function loadCollectionProducts(baseUrl, filter) {

  var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
  loadCounter++;
  var currentCounter = loadCounter;
  baseUrl = baseUrl || '/shop/' + fixedEncodeURIComponent(filter && filter.q);
  filter = filter || {};

  if (!/\/search$/i.test(baseUrl) && filter.hasOwnProperty('q')) {
    delete filter.q;
  }

  if (!page || page === 1) {
    var collectionList = document.getElementById('collection-list');

    if (collectionList) {
      collectionList.innerHTML = '';
    }

    var progressBlocks = document.getElementsByClassName('collection__progress');

    if (progressBlocks && progressBlocks.length) {
      progressBlocks[0].classList ? progressBlocks[0].classList.add('hidden') : progressBlocks[0].className += ' hidden';
    }
  }

  return $.ajax({
    url: baseUrl + '/page/' + page + getFiltersUrl(),
    type: 'GET',
    method: 'GET',
    data: filter
  }).then(function (response, textStatus, jqXHR) {
    var nodes;

    if (typeof response === 'string') {
      response = parseHtmlResponse(response);
      nodes = response && response.nodes;
    }

    var data = response && response.data; // update counts

    var counts = document.getElementsByClassName('collection__count');
    var progressBars = document.getElementsByClassName('collection__progress-bar');

    if (counts && counts.length && counts[0].dataset && progressBars && progressBars.length) {
      var productsCount = +counts[0].dataset.count || 0;
      var totalCount = +(response && response.total + '').replace(/,/gi, '') || 1;
      productsCount = response && response.to || 0;
      counts[0].dataset.count = productsCount;
      counts[0].innerHTML = productsCount;
      progressBars[0].style.width = productsCount * 100 / totalCount + '%';
    }

    var totalCounts = document.getElementsByClassName('js-collection-total');

    if (totalCounts && totalCounts.length) {
      for (var i = 0; i < totalCounts.length; i++) {
        totalCounts[i].innerHTML = response && response.total || '';
      }
    } // get and chack list container


    var collectionList = document.getElementById('collection-list');
    if (!collectionList) return {
      error: 'no list'
    };
    if (!nodes && (!data || !data.length)) return {
      error: 'no data'
    };

    if (currentCounter === loadCounter) {
      var isRedirect = collectionList.dataset && collectionList.dataset.redirect && collectionList.dataset.redirect !== 'false';
      var isImageRedirect = collectionList.dataset && collectionList.dataset.imageRedirect && collectionList.dataset.imageRedirect !== 'false';
      var isAuth = collectionList.dataset && collectionList.dataset.auth && collectionList.dataset.auth !== 'false';
      var isShowStore = collectionList.dataset && collectionList.dataset.showStore && collectionList.dataset.showStore !== 'false'; // render nodes

      nodes = nodes || data.map(function (item) {
        var id = item['id'] || Math.random().toString(36).slice(2);
        var images = item['image'] && "<a\n          target=\"_blank\"              class=\"w-100 text-center collection__img-wrapper ".concat( "\"\n                        data-track=\"").concat(item['id'], "\"\n                        href=\"").concat(item['redirect_url'], "\"\n                        target=\"").concat(isImageRedirect ? '_blank' : '_self', "\"\n              id=\"Buy_Direct_Button_Collection\"         rel=\"noopener noreferrer\"\n                    >\n                        <img  loading=\"lazy\"   class=\"card-img-top collection__img\" ").concat(item['id'] ? "id=\"".concat(item['id'], "\"") : '', " src=\"").concat(item['image'] || '', "\" alt=\"").concat(item['title'] || '', "\" />\n                    </a>") || '';

        var edit_link = item['edit_url'] != "" ? '<div><a class="float-right" href="' + item['edit_url'] + '" target="_blank">Edit product</a><input class="pcb" type="checkbox" name="cb[]" value="' + item['id'] + '" />&nbsp;</div><br />' : "";

        var sizeNumbers = [];

        for (var sizeNum = 3.5; sizeNum <= 10.5; sizeNum += 0.5) {
          sizeNumbers.push(sizeNum);
        }

        var sizes = sizeNumbers.map(function (sizeNum) {
          return "<div class=\"custom-control custom-control-inline custom-control-text font-size-xs\">\n                                <input type=\"radio\" id=\"product-".concat(id, "-size-").concat(sizeNum, "\" name=\"sizeRadio\" class=\"custom-control-input\" />\n                                <label class=\"custom-control-label\" for=\"product-").concat(id, "-size-").concat(sizeNum, "\">").concat(sizeNum, "/").concat(sizeNum + 1.5, "</label>\n                            </div>");
        }).concat(["<div class=\"custom-control custom-control-inline custom-control-text font-size-xs\">\n                        <input type=\"radio\" id=\"product-".concat(id, "-size-", 11, "\" name=\"sizeRadio\" class=\"custom-control-input\" />\n                        <label class=\"custom-control-label\" for=\"product-").concat(id, "-size-", 11, "\">", 11, "</label>\n                    </div>"), "<div class=\"custom-control custom-control-inline custom-control-text font-size-xs\">\n                        <input type=\"radio\" id=\"product-".concat(id, "-size-", 11.5, "\" name=\"sizeRadio\" class=\"custom-control-input\" />\n                        <label class=\"custom-control-label\" for=\"product-").concat(id, "-size-", 11.5, "\">", 11.5, "</label>\n                    </div>"), "<div class=\"custom-control custom-control-inline custom-control-text font-size-xs\">\n                        <input type=\"radio\" id=\"product-".concat(id, "-size-", 12, "\" name=\"sizeRadio\" class=\"custom-control-input\" />\n                        <label class=\"custom-control-label\" for=\"product-").concat(id, "-size-", 12, "\">", 12, "</label>\n                    </div>"), "<div class=\"custom-control custom-control-inline custom-control-text font-size-xs\">\n                        <input type=\"radio\" id=\"product-".concat(id, "-size-", 13, "\" name=\"sizeRadio\" class=\"custom-control-input\" />\n                        <label class=\"custom-control-label\" for=\"product-").concat(id, "-size-", 13, "\">", 13, "</label>\n                    </div>")]).join('\n') || '';
        var wishAction = '';

        if (!isRedirect) {
          if (isAuth) {
            wishAction = "\n                            <button\n                                type=\"button\"\n                                class=\"btn btn-xs btn-circle btn-white-primary collection__product-wish js-product-wish ".concat(item['liked'] ? 'active' : '', "\"\n                                title=\"Add to wishlist\"\n                                data-wish=\"").concat(item['id'] || '', "\"\n                                data-auth=\"true\"\n                            >\n                                <i class=\"fe fe-heart wishlist_button\"></i>\n                            </button>");
          } else {
            wishAction = "\n                            <button\n                                type=\"button\"\n                                class=\"btn btn-xs btn-circle btn-white-primary collection__product-wish js-product-wish\"\n                                title=\"Add to wishlist\"\n                                data-wish=\"".concat(item['id'] || '', "\"\n                                data-toggle=\"modal\"\n                                data-target=\"#add-to-wishlist-modal\"\n                            >\n                                <i class=\"fe fe-heart wishlist_button\"></i>\n                            </button>");
          }
        }
        //wishAction = "";
        var node = document.createElement('div');
        node.className = 'col-6 col-sm-6 col-md-4 col-lg-3 collection__col';
        node.id = "product-".concat(id);
        node.innerHTML = "\n                    <div class=\"card mb-1\">\n                        <div class=\"card-img\">\n                            <div class=\"collection__images\" data-flickity='{\"draggable\": false}' id=\"product-images-".concat(id, "\">\n                                ").concat(images, "\n                            </div>",edit_link,"\n                            <!-- <div class=\"card-actions\">\n                                <span class=\"card-action\">\n                                    <button class=\"btn btn-xs btn-circle btn-white-primary\" data-toggle=\"button\">\n                                        <i class=\"fe fe-shopping-cart\"></i>\n                                    </button>\n                                </span>\n                            </div> -->\n                        </div>\n                        <div class=\"card-body px-0 py-0\">\n                            <p class=\"text-muted text-sm mb-0\">\n                                <a class=\"").concat(isShowStore ? '' : 'text-muted', "\" href=\"").concat(item['url_to_brand'], "\">\n                                    ").concat(item['brand'], "\n                                </a>\n                            </p>\n                            <div class=\"font-weight-bold mb-2 collection__product-title\">\n                                <a\n                target=\"_blank\"                    class=\"text-body ").concat(isRedirect ? 'out_link' : '', "\"\n                                    title=\"").concat(item['title'], "\"\n                                    data-track=\"").concat(item['id'], "\"\n                                    href=\"").concat(isRedirect ? item['redirect_url'] : item['url_to_detail'], "\"\n                                    target=\"").concat(isRedirect ? '_blank' : '_self', "\"\n                                    rel=\"noopener noreferrer\"\n                                >\n                                    ").concat(item['title'] || '', "\n                                </a>\n                            </div>\n                            <div class=\"collection__product-details\">\n                                ").concat(isShowStore ? "<div class=\"font-weight-bold text-muted collection__product-store\">\n                                            ".concat(item['store'] || '', "\n                                        </div>") : '', "\n                                <div class=\"font-weight-bold collection__product-price\">\n                                    ").concat(item['is_sale'] ? "<span class=\"font-size-xs text-gray-350 text-decoration-line-through mr-1\">$".concat(item['old_price'] || '', "</span><span class=\"text-primary\">$").concat(item['price'], "</span>") : "<span class=\"text-dark mr-1\">$".concat(item['price'] || '', "</span>"), "\n                                </div>\n                                ").concat(wishAction, "\n                            </div>\n                        </div>\n                    </div>");
        addCardCollapse(node);
        return node;
      });
      nodes.forEach(function (node) {
        return collectionList.appendChild(node);
      });

      var _progressBlocks = document.getElementsByClassName('collection__progress');

      if (_progressBlocks && _progressBlocks.length) {
        _progressBlocks[0].classList ? _progressBlocks[0].classList.remove('hidden') : _progressBlocks[0].className.replace(/\bhidden\b/gi, '');
      }
      initAddCollectionClick();
      return response;
    } else {
      return null;
    }
  })["catch"](function (jqXHR, textStatus, error) {
    if (retries > 1) {
      return pause(200).then(function () {
        return loadCollectionProducts(baseUrl, filter, page, retries - 1);
      });
    }

    console.log('loadCollectionProducts failed', baseUrl + '/' + page, error);
    return {
      error: error || 'load error'
    };
  }).then(function (result) {
    return result;
  });
}

var canLoadMore = false;
var isLoading = false;
var collectionFilter = {};

function loadMoreHandler(event) {
  var target = this;
  if (!target || !target.dataset || isLoading) return;
  var search = target.dataset.search;

  if (search) {
    collectionFilter.q = search;
  } else {
    delete collectionFilter.q;
  }

  var page = +target.dataset.page || 1;
  var baseUrl = target.dataset.baseUrl;
  target.disabled = true;
  var loader = document.getElementById('collection-loader');

  if (loader) {
    loader.style.display = '';
    loader.classList ? loader.classList.remove('hidden') : loader.className.replace(/\bhidden\b/gi, '');
  }

  loadCollectionProducts(baseUrl, collectionFilter, page + 1).then(function (result) {
    if (!result) return;
    isLoading = false;

    if (result.current_page && result.last_page) {
      page = result.current_page;
      target.dataset.page = page;
      canLoadMore = result.current_page < result.last_page;
    } else {
      canLoadMore = false;
    }

    if (loader) {
      loader.classList ? loader.classList.add('hidden') : loader.className += ' hidden';
    }

    if (!canLoadMore) {
      target.style.display = 'none';
      target.style.opacity = 0;
      target.style.visibility = 'hidden';
    } else {
      target.disabled = false;
    }
  })["catch"](function (error) {
    return console.log('load more handler error', error);
  });
}





function initLoadCollectionProducts() {

  var loadMoreBtn = document.getElementById('load-more-products');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreHandler);
  }

}

var _default = loadCollectionProducts;
exports["default"] = _default;

},{"../utils":26}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMoreSuggestions = loadMoreSuggestions;
exports["default"] = void 0;

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

function pause(duration) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, duration);
  });
}

function loadMoreSuggestions(baseUrl, filter, page) {
  var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
  baseUrl = baseUrl || '/product/' + fixedEncodeURIComponent(filter);
  return $.ajax({
    url: baseUrl + '/' + page,
    type: 'GET',
    method: 'GET'
  }).then(function (response, textStatus, jqXHR) {
    var data = response && response.data || [];
    var counts = document.getElementsByClassName('product-alternative__count');
    var progressBars = document.getElementsByClassName('product-alternative__progress-bar');

    if (counts && counts.length && counts[0].dataset && progressBars && progressBars.length) {
      var productsCount = +counts[0].dataset.count || 0;
      productsCount = response && response.to || 0;
      counts[0].dataset.count = productsCount;
      counts[0].innerHTML = productsCount;
      progressBars[0].style.width = productsCount * 100 / (response && response.total || 1) + '%';
    }

    var suggestionsList = document.getElementById('suggestions-list');

    if (suggestionsList && data.length) {
      var nodes = data.map(function (item) {
        var id = item['id'] || Math.random().toString(36).slice(2);
        var images = item['images'] && item['images'].map(function (image) {
          return "<a class=\"w-100 text-center card-img-hover product-alternative__img-wrapper\" target=\"_blank\" href=\"".concat(item['url_to_detail'], "\">\n                                <img class=\"card-img-top product-alternative__img\" src=\"").concat(image, "\" alt=\"...\" />\n                            </a>");
        })[0] || '';
        var node = document.createElement('div');
        node.className = 'col-6 col-sm-6 col-md-4 col-lg-3 product-alternative__col';
        node.id = "product-".concat(id);
        node.innerHTML = "\n                    <div class=\"card mb-7\">\n                        <div class=\"card-img\">\n                            <div class=\"product-alternative__images\" id=\"product-images-".concat(id, "\">\n                                ").concat(images, "\n                            </div>\n                        </div>\n                        <div class=\"card-body px-0\">\n                            <div class=\"font-size-xs\">\n                                <a class=\"text-muted\" href=\"").concat(item['url_to_artist'], "\">Artist: ").concat(item['artist'] || '', "</a>\n                            </div>\n                            <div class=\"font-weight-bold\">\n                                <a class=\"text-body\" target=\"_blank\" href=\"").concat(item['url_to_detail'], "\">\n                                    ").concat(item['title'] || '', "\n                                </a>\n                            </div>\n                            <div class=\"font-weight-bold text-muted\">\n                                $").concat(item['price'] || '', "\n                            </div>\n                        </div>\n                    </div>");
        return node;
      });
      nodes.forEach(function (node) {
        return suggestionsList.appendChild(node);
      });
      return response;
    } else {
      return null;
    }
  })["catch"](function (jqXHR, textStatus, error) {
    if (retries > 1) {
      return pause(200).then(function () {
        return loadMoreSuggestions(baseUrl, filter, page, retries - 1);
      });
    }

    console.log('loadMoreSuggestions failed', baseUrl + '/' + page, error);
    return null;
  }).then(function (result) {
    return result;
  });
}

var _default = loadMoreSuggestions;
exports["default"] = _default;

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSuggestionsObserver = initSuggestionsObserver;
exports["default"] = void 0;

var _loadMoreSuggestions = require("./load-more-suggestions");

var options = {
  root: null,
  rootMargin: '300px',
  threshold: 0
};
var canLoadMore = false;
var isLoading = false;

function onIntersect(entries, observer) {
  var firstEntry = entries[0];

  if (firstEntry && firstEntry.isIntersecting) {
    isLoading = true;
    var target = firstEntry.target;
    observer.unobserve(target);
    var filter = target.dataset.filter;
    var page = +target.dataset.page || 1;
    var baseUrl = target.dataset.baseUrl;
    (0, _loadMoreSuggestions.loadMoreSuggestions)(baseUrl, filter, page + 1).then(function (result) {
      isLoading = false;

      if (result && result.current_page && result.last_page) {
        page = result.current_page;
        target.dataset.page = page;
        canLoadMore = result.current_page < result.last_page;
      } else {
        canLoadMore = false;
      }

      if (canLoadMore) {
        observer.observe(target);
      } else {
        target.style.display = 'none';
        target.style.opacity = 0;
        target.style.visibility = 'hidden';
      }
    })["catch"](function (error) {
      return console.log('intersect load error', error);
    });
  }
}

function initSuggestionsObserver() {

  var elements = document.getElementsByClassName('product-alternative__more');

  if (elements && elements.length) {
    if (elements[0].dataset && elements[0].dataset.page && elements[0].dataset.lastPage) {
      canLoadMore = parseInt(elements[0].dataset.lastPage || 0) > parseInt(elements[0].dataset.page || 0);
    }

    if (canLoadMore) {
      elements[0].style.opacity = 1;
      new IntersectionObserver(onIntersect, options).observe(elements[0]);
    } else {
      elements[0].style.display = 'none';
    }
  }
}

var _default = initSuggestionsObserver;
exports["default"] = _default;

},{"./load-more-suggestions":20}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initProductTrack = initProductTrack;
exports["default"] = void 0;

function sendProductTrack(productId) {
  if (!productId) return Promise.resolve();
  var baseUrl = '/product';
  return $.ajax({
    url: baseUrl,
    type: 'PATCH',
    method: 'PATCH',
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    data: JSON.stringify({
      product_id: productId
    }),
    processData: false,
    contentType: 'application/json'
  }).then(function (response, textStatus, jqXHR) {
    if (response && response.status === 'success') {// ok
    }

    return response;
  })["catch"](function (jqXHR, textStatus, error) {
    console.log('sendProductTrack failed', error || jqXHR);
    return null;
  }).then(function (result) {
    return result;
  });
}

function initProductTrack() {
  document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.nodeName.toLowerCase() !== 'button' && target.nodeName.toLowerCase() !== 'a') {
      target = target.closest('BUTTON') || target.closest('A');
    }

    if (!target) return;

    if (target.nodeName.toLowerCase() === 'button' || target.nodeName.toLowerCase() === 'a') {
      if (target.dataset && target.dataset.track) {
        sendProductTrack(+target.dataset.track || target.dataset.track);
      }
    }
  });
}

var _default = initProductTrack;
exports["default"] = _default;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onChangeHandler = onChangeHandler;
exports["default"] = void 0;

var _validateFormElement = require("./validate-form-element");

function changeRadioInputs(element) {
  if (element && element.type === 'radio') {
    var list = [];
    var name = element.getAttribute('name');
    var value = element.getAttribute('value');
    var form = element.form;
    if (!form || !name) return;
    var inputs = form.getElementsByTagName('INPUT');
    if (!inputs || !inputs.length) return;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] && inputs[i].type === 'radio' && inputs[i].name === name) {
        if (inputs[i].checked) {
          list.push(inputs[i].value);
          var label = inputs[i].closest('label');

          if (label) {
            label.classList ? label.classList.add('active') : label.className += ' active';
          }
        } else {
          var _label = inputs[i].closest('label');

          if (_label) {
            _label.classList ? _label.classList.remove('active') : _label.className.replace(/\bactive\b/gi, '');
          }
        }
      }
    }

    return list;
  }
}

function changeCheckboxInputs(element) {
  if (element && element.type === 'checkbox') {
    var list = [];
    var name = element.getAttribute('name');
    var value = element.getAttribute('value');
    var form = element.form;
    if (!form || !name) return;
    var inputs = form.getElementsByTagName('INPUT');
    if (!inputs || !inputs.length) return;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] && inputs[i].type === 'checkbox' && inputs[i].name === name) {
        if (inputs[i].checked) {
          list.push(inputs[i].value);
          var label = inputs[i].closest('label');

          if (label) {
            label.classList ? label.classList.add('active') : label.className += ' active';
          }
        } else {
          var _label2 = inputs[i].closest('label');

          if (_label2) {
            _label2.classList ? _label2.classList.remove('active') : _label2.className.replace(/\bactive\b/gi, '');
          }
        }
      }
    }

    return list;
  }
} // input "change" event handler


function onChangeHandler(event) {
  var element = event && event.target;

  if (!element || !element.validity) {
    return;
  }

  var valid = (0, _validateFormElement.validateFormElement)(element);
  var value = element.value;
  var checked = element.checked;
  var name = element.name;
  var label = element.closest('label');
  var error;

  if (label) {
    var errors = label.getElementsByClassName('js-input-error');
    error = errors && errors[0];
  }

  if (valid) {
    element.classList ? element.classList.remove('invalid') : element.className.replace(/\binvalid\b/gi, '');

    if (value) {
      element.classList ? element.classList.add('complete') : element.className += ' complete';
    } else {
      element.classList ? element.classList.remove('complete') : element.className.replace(/\bcomplete\b/gi, '');
    }

    if (label) {
      label.classList ? label.classList.remove('invalid') : label.className.replace(/\binvalid\b/gi, '');

      if (value) {
        label.classList ? label.classList.add('complete') : label.className += ' complete';
      } else {
        label.classList ? label.classList.remove('complete') : label.className.replace(/\bcomplete\b/gi, '');
      }
    }

    if (error) {
      error.innerHTML = '';
    }
  } else {
    element.classList ? element.classList.add('invalid') : element.className += ' invalid';
    element.classList ? element.classList.remove('complete') : element.className.replace(/\bcomplete\b/gi, '');

    if (label) {
      label.classList ? label.classList.add('invalid') : label.className += ' invalid';
      label.classList ? label.classList.remove('complete') : label.className.replace(/\bcomplete\b/gi, '');
    }
  }

  var list;

  if (element.type === 'radio') {
    list = changeRadioInputs(element);
  }

  if (element.type === 'checkbox') {
    list = changeCheckboxInputs(element);
  }

  return {
    element: element,
    valid: valid,
    name: name,
    value: value,
    checked: checked,
    list: list,
    type: element.type
  };
}

var _default = onChangeHandler;
exports["default"] = _default;

},{"./validate-form-element":28}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports["default"] = void 0;

/**
 * Creates a debounced function that delays invoking `func` until after `wait` ms
 * since the last function call
 * @param {Function} fn - the function to debounce
 * @param {number} ms - number of milliseconds to delay
 * @return {Function} returns the new debounced function
 */
function debounce(fn, ms) {
  var timeoutID;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      fn.apply(context, args);
      timeoutID = null;
    }, ms);
  };
}

var _default = debounce;
exports["default"] = _default;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatNumber = formatNumber;
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Format the number with separators
 * @param {number|string} num - source number
 * @param {string} [thousandsSeparator='\u00A0'] - thousands separator, &nbsp is default
 * @param {string} [decimalSeparator='.'] - decimal separator
 * @return {string} formatted number
 */
function formatNumber() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var thousandsSeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
  var decimalSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  if (typeof num !== 'number' && typeof num !== 'string') return '' + num;

  var _String$split = String(num).split('.'),
      _String$split2 = _slicedToArray(_String$split, 2),
      _String$split2$ = _String$split2[0],
      integer = _String$split2$ === void 0 ? '' : _String$split2$,
      _String$split2$2 = _String$split2[1],
      fractional = _String$split2$2 === void 0 ? '' : _String$split2$2;

  var re = new RegExp('(\\d)(?=(\\d\\d\\d)+(?!\\d))', 'gi');
  return integer.replace(re, '$1' + thousandsSeparator) + (fractional ? decimalSeparator + fractional : '');
}

var _default = formatNumber;
exports["default"] = _default;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounce = require("./debounce");

Object.keys(_debounce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _debounce[key];
    }
  });
});

var _formatNumber = require("./format-number");

Object.keys(_formatNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formatNumber[key];
    }
  });
});

var _validateFormElement = require("./validate-form-element");

Object.keys(_validateFormElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validateFormElement[key];
    }
  });
});

var _changeHandler = require("./change-handler");

Object.keys(_changeHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _changeHandler[key];
    }
  });
});

var _inputHandler = require("./input-handler");

Object.keys(_inputHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _inputHandler[key];
    }
  });
});

},{"./change-handler":23,"./debounce":24,"./format-number":25,"./input-handler":27,"./validate-form-element":28}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onInputHandler = onInputHandler;
exports["default"] = void 0;

var _validateFormElement = require("./validate-form-element");

// "input" event handler
function onInputHandler(event) {
  var element = event && event.target;

  if (!element || !element.validity) {
    return;
  }

  if (element.type === 'checkbox' || element.type === 'radio') {
    return;
  } // transform data


  if (element.maxLength && element.value && element.value.length > element.maxLength) {
    element.value = element.value.slice(0, element.maxLength);
  } // extract data


  var valid = (0, _validateFormElement.validateFormElement)(element);
  var value = element.value;
  var name = element.name;
  var label = element.closest('label'); // show error message

  var error;

  if (label) {
    var errors = label.getElementsByClassName('js-input-error');
    error = errors && errors[0];
  } // toggle input and label classes


  if (valid) {
    element.classList ? element.classList.remove('invalid') : element.className.replace(/\binvalid\b/gi, '');

    if (value) {
      element.classList ? element.classList.add('complete') : element.className += ' complete';
    } else {
      element.classList ? element.classList.remove('complete') : element.className.replace(/\bcomplete\b/gi, '');
    }

    if (label) {
      label.classList ? label.classList.remove('invalid') : label.className.replace(/\binvalid\b/gi, '');

      if (value) {
        label.classList ? label.classList.add('complete') : label.className += ' complete';
      } else {
        label.classList ? label.classList.remove('complete') : label.className.replace(/\bcomplete\b/gi, '');
      }
    }

    if (error) {
      error.innerHTML = '';
    }
  } else {
    element.classList ? element.classList.remove('complete') : element.className.replace(/\bcomplete\b/gi, '');

    if (label) {
      label.classList ? label.classList.remove('complete') : label.className.replace(/\bcomplete\b/gi, '');
    }
  }

  return {
    element: element,
    valid: valid,
    name: name,
    value: value,
    type: element.type
  };
}

var _default = onInputHandler;
exports["default"] = _default;

},{"./validate-form-element":28}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFormElement = validateFormElement;
exports["default"] = void 0;

// Check input validity
function validateFormElement(element) {
  if (!element || !element.validity) {
    return false;
  }

  var patternEmpty = /[^\s]+/; // string full of spaces

  if (element.required) {
    if (element.type === 'radio' || element.type === 'checkbox') {// check all inputs in array
    } else if (element.value === '' || !patternEmpty.test(element.value)) {
      return false;
    }
  }

  if (!element.validity.valid) {
    return false;
  }

  return true;
}

var _default = validateFormElement;
exports["default"] = _default;

},{}]},{},[10]);
