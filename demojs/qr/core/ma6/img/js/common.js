(function ($) {
  'use strict';

  // デバイス判定
  var deviceFlag;

  // pagetop
  var $pageTop = $('#pagetop');
  var timer = false;

  $pageTop.hide();

  // スクロールイベント
  $(window).on('scroll touchmove', function () {

    // スクロール中か判定
    if (timer !== false) clearTimeout(timer);

    // 200ms後にフェードイン
    timer = setTimeout(function () {
      100 < $(this).scrollTop() ? $pageTop.fadeIn(200) : $pageTop.fadeOut(200);
      100 < $(this).scrollTop() ? $('.header').addClass('is-color') : $('.header').removeClass('is-color');
    },
    200);

    $pageTop.css({
      'position': 'fixed',
      'bottom': '20px',
      'top': 'auto'
    });

    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    var footHeight = parseInt($('.footer').innerHeight());

    if (scrollHeight - scrollPosition <= footHeight) {
      // 現在の下から位置が、フッターの高さの位置にはいったら
      if (deviceFlag) {
        $pageTop.css({
          'position': 'absolute',
          'bottom': '30px',
        })
      } else {
        $pageTop.css({
          'position': 'absolute',
          'bottom': 'auto',
          'top': '-20px',
        });
      }
    }

  });


  // アンカーリンク
  (function () {
    var $anchor = $('a.js-anchor');

    $anchor.on('click', function (e) {
      e.preventDefault();
      var href = $(this).attr('href');
      var $t = $(href).length ? $(href) : $('html');

      // スクロール
      anchorScroll($t.offset().top);
    });

    function anchorScroll(oft) {
      anime({
        targets: 'html, body',
        scrollTop: oft,
        duration: 1000,
        easing: 'easeInOutCubic'
      });
      return;
    }
  })();


  // scroll
  (function () {
    var obj = {
      init: function () {
        this.$wrap = $('.js-scroll');
        if (this.$wrap.length) {
          this._enabled();
          this._scroll();
        }
      },
      _enabled: function () {
        var _this = this;
        $(window).on('scroll', function () {
          _this._scroll();
        });
      },
      _scroll: function () {
        this.$wrap.each(this._decision);
      },
      _decision: function () {
        var $this = $(this);
        var innH = $(window).innerHeight() * 0.6;
        var oft = parseInt($(window).scrollTop() + innH);
        var pos = $this.offset().top;
        if (pos <= oft) $this.addClass('is-active');
      }
    }.init();
  })();



})(jQuery);

